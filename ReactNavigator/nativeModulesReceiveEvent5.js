/**
 * Created by a58 on 16/11/22.
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

var subscription;
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
class NativeSendEventTOJavaScript extends Component{

    componentDidMount() {
        console.log(' 开始发送消息');
        subscription = NativeAppEventEmitter.addListener(
            'EventReminder',
            (reminder) => console.log(reminder.name)
        );

    }

    componentWillUnMount() {
        subscription.remove();
    }
        render(){
            return (
                <View style={{flex:1,backgroundColor:'white'}}>
                    <View style={{flex:1,marginTop:100}}>
                    <CustomButton text="发送通知到javascript" onPress={ () => NativeModules.RNBridgeModule.mountSucess({'yml':'123','name':'yuanmnglong'})}>

                    </CustomButton>
                        </View>
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

module.exports = NativeSendEventTOJavaScript;