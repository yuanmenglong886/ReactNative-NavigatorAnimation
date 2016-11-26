/**
 * Created by a58 on 16/11/25.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    NavigatorIOS,
    ScrollView,
    ListView,
    WebView,
    AsyncStorage,
} from 'react-native';
var  Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var STORAGE_KEY = 'STORE_KEY';
class CustomButton extends  Component{
    render(){
         return (
             <TouchableHighlight style={styles.button} underlayColor='#a5a5a5' onPress={this.props.onPress}>
                 <Text style={styles.buttonText}>{this.props.text}</Text>
             </TouchableHighlight>
         );
    }
}

class AsyncStorageDemo extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            stringValue:'',
            inputValues:'',
        };
      }
    //获取数据
    async _get(){
        console.log('Demo_get()');
        try{
            var value = await AsyncStorage.getItem(STORAGE_KEY);
            if(value !== null)
            {
                console.log('_get() success',value);
            }else
            {
                console.log('_get() no data');
            }
        }catch(error){
            console.log('_get() error',error.message);
        }
    }
    //  保存数据
    async _save(value) {
    console.log('保存数据');
    try
    {
        await AsyncStorage.setItem(STORAGE_KEY,value);
        console.log('保存数据成功',value);
    }
        catch(error){
            console.log('保存数据失败',error.message);
        }
    }
    //删除数据
    async _remove(){
        console.log('删除数据成功');
        try{
            await  AsyncStorage.removeItem(STORAGE_KEY);
            console.log('删除数据成功');
        }catch ( error){
            console.log('删除数据失败',error.message);
        }
    }
    myOnChangeText(newText){
        this.state.stringValue=newText;

    }
    endEdting(){

         this.setState({
             inputValues:this.state.stringValue,
         });

        // this.state.inputValues = this.state.stringValue;

    }
    render(){
        return (
            <View style = {styles.rootView}>
                {console.log('2')}
                <CustomButton text={this.state.inputValues} onPress={() => this._save(this.state.inputValues).then(() => console.log(' 正在保存中,做后续')). done(() => console.log('数据终于保存成功啦'))}></CustomButton>
                <CustomButton text="获取数据" onPress={() => this._get().done()}></CustomButton>
                <CustomButton text="删除数据" onPress={() => this._remove()}></CustomButton>
                <TextInput style={styles.textInput}   autoCapitalize='none'  defaultString="默认的字符串" keyboardType="default" placeholder="请输入要存储的内容" clearTextOnFocus={true} onChangeText={this.myOnChangeText.bind(this)} onEndEditing={this.endEdting.bind(this)}></TextInput>
            </View>
        );

    }
}
/*
 ES6中promise提供了几个回调方法then，done，finally，如下所示：

 then()方法会在setItem开始执行后执行
 done()方法会在setItem执行完成后调用，done
 都会捕捉到任何可能出现的错误，并向全局抛出
 finally则是回调链执行的最后一个方法


 */
const  styles = StyleSheet.create({
         rootView:{
             flex:1,
             flexDirection:'column',
             marginTop:64,
         },
         button:{
             margin:5,
             backgroundColor:'white',
             padding:10,
             borderWidth:1,
             borderColor:'#cdcdcd',
         },
         buttonText:{
             fontSize:20,
             textAlign:'center',
             margin:10,
         },
         textInput:{
             fontSize:20,
             margin:10,
             width:width-20,
             height:50,
             borderColor:'red',
             borderWidth:2,
         }
});

module.exports = AsyncStorageDemo;