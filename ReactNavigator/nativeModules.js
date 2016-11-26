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
var CalendatManager = NativeModules.CalendarManager;
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
         this.state = {
             events:[],
             notice:'',
             textTitle:[],
         }
     }

  //  开始进行通知
    componentDidMount(){
        
        console.log('开始订阅通知...');
        subscription = NativeAppEventEmitter.addListener(
            'EventReminder',
            (reminder) => console.log('通知信息:'+reminder.name)
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
      async _updateEvents() {
          try {
              // console.log(CalendatManager.doSomethingExpensive('hello', () => this._callback()));

              var events = await CalendatManager.findEventsPromise();
              alert(events);
              this.setState({events});
          } catch (e) {
              console.error(e);
          }

      }
    render(){
        return (
            <View style={{marginTop:64,backgroundColor:'red'}}>
                <Text style={styles.welcome}>
                     封装的iOS的原生应用
                </Text>
                <CustomButton text='点击调用原生模块的addEvent方法'
                 onPress = {() => CalendatManager.addEvent('袁梦龙','js调用自定义模块')}
                    />
                <CustomButton text="点击调用原生模块addEvent方法"
                              onPress={()=>CalendatManager.addEventMoreDate('生日聚会', '江苏南通 中天路',1463987752)}
                />
                <CustomButton text="调用原生模块addEvent方法-传入字段格式"
                              onPress={()=>CalendatManager.addEventMoreDetails('生日聚会', {
              location:'江苏 南通市 中天路',
              time:1463987752,
              description:'请一定准时来哦~'
            })}
                />
                <CustomButton text="调用原生模块addEvent方法-传入字段格式"
                              onPress={()=>CalendatManager.findEvents( (error,events) => {
                              if(error){
                              console.log(error);
                              }else
                              {
                                 this.setState({events:events,});
                              }
                              }) }
                />
                <CustomButton text="点击调用原生模块findEventsPromise方法-Callback"
                              onPress = { () =>this._updateEvents()}
                />
                <Text style={{marginLeft:5}}>
                    '发送通知信息:'+{this.state.notice}
                </Text>
                <CustomButton text="点击调用原生模块sendNotification方法"
                              onPress={()=>CalendatManager.RNCalliOS({'name':'yuanmenglong','age':'23'})}
                />
                <CustomButton text={this.state.events}
                              onPress = {() =>RNBridgeModule.RNInvokeOCCallBack(
                                       {'name':'yuanmenglong','description':'http://www.yuanmenglong.org'},
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