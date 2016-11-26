/**
 * Created by a58 on 16/11/21.
 */
"use strict";
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Easing,
    TouchableOpacity,
    TouchableHighlight,
    LayoutAnimation,
    Platform,
} from 'react-native';
import  {NativeModules} from 'react-native';
import { NativeAppEventEmitter } from 'react-native';

// 订阅  发布模式
var subscription;

var RNBridgeModule = NativeModules.RNBridgeModule;
class CustomButton extends  Component{
    render(){
        return (
            <TouchableHighlight style={styles.button}
                                underlayColor="#a5a5a5"
                                onPress = {this.props.onPress}
            >
                <Text style={{width:400,height:50,backgroundColor:'green'}}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}
class  ModulesDemo extends  Component{
    constructor(props)
    {
        super(props);
        this.state ={
            event:'',
            msg:'',
        }
    }
    componentDidMount(){
        console.log('开始订阅通知...');
        subscription = NativeAppEventEmitter.addListener(
            'EventReminder',
            (reminder) => console.log('通知信息:'+reminder.name)
            // (reminder) => {
            //     let errorCode=reminder.errorCode;
            //     if(errorCode==0){
            //         console.log('cucess');
            //         this.setState({msg:reminder.name});
            //     }else{
            //         console.log('fail');
            //         alert('f');
            //         this.setState({msg:reminder.msg});
            //     }
            //     console.log(reminder.name);
            //
            // }
        );

    }

    componentWillUnmount(){
        subscription.remove();
    }
    // 使用承诺来进行数据的传递
    //   在使用 await  关键字的时候,必须配套使用   async 的关键字
    _callback(){
        console.log(arguments);
        alert(arguments);
    }
    async _updateEvents(){
        try{
            var events = await RNBridgeModule.RNInvokeOCPromise({'name':'yuanmenglongname','age':'27','sex':'男'});
            this.setState({events:events});
        }catch(e){
            alert(e);
            this.setState({events:e.message});

        }
    }

    render(){
        return (
            // 1.使用回调
            <View style={{marginTop:64,backgroundColor:'red'}}>
                    <CustomButton text={this.state.events}
                                  onPress = {() =>RNBridgeModule.RNInvokeOCCallBack(
                                       {'name':'yuanemnglong','description':'http://www.yuanmenglong.org'},
            (error,events)=>{
                if(error){
                  console.error(error);
                }else{
                alert(events);
                  this.setState({textTitle:events})
                  this.setState({events:events});
                }
          }
                              )}
                    />
                {/*使用promise 进行调用*/}
                <CustomButton text='使用承诺进行调用' onPress={this._updateEvents.bind(this)}>
                </CustomButton>
                <CustomButton text='iOS 调用访问React Native' onPress={() => RNBridgeModule.RNCalliOS({'name':'yuanmenglong','age':'23'})}>
                </CustomButton>
                <CustomButton text='iOS 调用通知来访问React-native' onPress={() => RNBridgeModule.sendNotification('yuanmenglong 来啦')}>
                </CustomButton>
            </View>
        );
    }

}
const  styles = StyleSheet.create({
    button:{
        margin:5,
        backgroundColor:'white',
        padding:10,
        borderWidth:1,
        borderColor:'#cdcdcd',
    },
    textStyle:{
        fontSize:20,
        textAlign:'center',
        margin:10,
    }
});
module.exports = ModulesDemo;