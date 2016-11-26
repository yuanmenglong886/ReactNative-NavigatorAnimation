/**
 * Created by a58 on 16/11/25.
//  */

'use strict'

import React, { Component } from 'react';

import  {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';


import Dimensions from 'Dimensions';
// 屏幕宽度
var screenWidth = Dimensions.get('window').width;
// export  default class RNRefDetail extends  Component{
 class RNRefDetail extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            textInputValue: '',
            bottomTextInputValue:'',
        };
        //  对this.buttonPressed 在构造函数中绑定this
         this.buttonPressed = this.buttonPressed.bind(this);
        this._changeTextValue = this._changeTextValue.bind(this);
    }

    buttonPressed() { //当按钮按下的时候执行此函数
        let textInputValue = 'yuanmenglong';

        this.setState({textInputValue});
        let bottomTextInputValue = 'yuanmenglongBottom';
        this.setState({bottomTextInputValue});

        //修改文本输入框的属性值
        this.refs.textInputRefer.setNativeProps({
            editable:false
        });

        this.refs.text2.setNativeProps({
            style:{
                color:'blue',
                fontSize:30
            }
        });
        //使文本输入框变为不可编辑
    }
     _changeTextValue(){
        let textInputValue = this.state.bottomTextInputValue;
         this.setState({textInputValue});
         this.refs.bottomTextInput.setNativeProps({
             style:{
                 width:400,
                 height:400,
             }
         });

     }

    render() {
        return (
            //ref={'text2'}>   //指定本组件的引用名
            <View style={styles.container}>
                <Text style={styles.buttonStyle} onPress={this.buttonPressed}>
                    按我
                </Text>
                <Text style={styles.textPromptStyle} ref="text2">
                    文字提示
                </Text>
                <View>
                    <TextInput style={styles.textInputStyle}
                               ref="textInputRefer"
                               value={this.state.textInputValue}
                               onChangeText={(textInputValue)=>this.setState({textInputValue})}
                    />
                </View>
                <View>
                    <TextInput style={styles.bottomTextInputStyle}
                               ref = "bottomTextInput"
                               value = {this.state.bottomTextInputValue}
                               onChangeText = {(bottomTextInputValue) => this.setState({bottomTextInputValue})}
                               onEndEditing = {this._changeTextValue}
                     ></TextInput>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: { //文本组件样式,定义简单的按钮
        fontSize: 20,
        backgroundColor: 'grey'
    },
    textPromptStyle: { //文本组件样式
        fontSize: 20
    },
    textInputStyle: { //文本输入组件样式
        width: 150,
        height: 50,
        fontSize: 20,
        backgroundColor: 'grey'
    },
        bottomTextInputStyle:{
         width:screenWidth-20,
        marginLeft:10,
        height:50,
        fontSize:30,
        borderWidth:2,
        borderColor:'red',
    }

});

module.exports = RNRefDetail;