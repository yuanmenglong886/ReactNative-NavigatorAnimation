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
    LayoutAnimation,
    Platform,
} from 'react-native';
 import  {NativeModules} from 'react-native';
var CalendatManager = NativeModules.CalendarManager;



//  注释分为两种   1. 实在js 中加入注释和正常的加入注释方式一样 ,使用/**/  和// 都可以啦
//                2. 第二种方式加入注释 实在XML标签中加入注释 需要加入 {/*  */}   在使用多行注释告诉系统这是要使用多行注释
//  使用View 组件来改变其 frame 实现简单的粗暴的动画
var animationTop = React.createClass({
    getInitialState(){
        // Enable LayoutAnimation under Android
        if (Platform.OS === 'android') {

            UIManager.setLayoutAnimationEnabledExperimental(true)
        }else {
            alert(Platform.OS)
        }
        return {w: 200, h: 20}

    },
    _onPress(){
        var count = 0;
        while(++count < 10){
            requestAnimationFrame(
                () => this.setState({w:this.state.w+1,h:this.state.h+1})
            )
        }
    },
    render(){
        return (
            <View style={styles.container}>
                <View style={[styles.content,{width:this.state.w,height:this.state.h}]}>
                    <Text style={[styles.textcontainer,{textAlign:'center',width:this.state.w,height:this.state.h}]}>this is Anamation</Text>
                </View>
                {/*   注释放在{}  中this._onPress.bind(this)*/ }
                <TouchableOpacity onPress={() => this._onPress()}>
                    <View style={styles.button}>
                        <Text>touch me!</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text>touch me!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

});


//    使用setNativeProps  去实现懂动画,性能消耗比使用改变 View的frame 要好多
/*
 Component.setNativeProps({
 style: {transform: [{rotate:'50deg'}]}
 });
 */
//    TODO
var _s = {
    w:200,
    h:10,
};
var animationNativeProps = React.createClass({
    _onPress(){
        var count = 0;
        while(++count < 10){
            requestAnimationFrame();
                // () => this.refs.setNativeProps({
                //     style:{
                //         width:++_s.w,
                //         height:++_s.h,
                //     }
                // })
        }
    },
    render(){
        return (
            <View style={styles.container}>
                <View style={[styles.content,{width:_s.w,height:_s.h}]}>
                    <Text style={[styles.textcontainer,{textAlign:'center',width:_s.w,height:_s.h}]}>this is Anamation</Text>
                </View>
                {/*   注释放在{}  中this._onPress.bind(this)*/ }
                <TouchableOpacity onPress={() => this._onPress()}>
                    <View style={styles.button}>
                        <Text>touch me!</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text>touch me!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

});

/*
   使用系统提供的动画库去实现 动画, 比较快和性能消耗比较少
 */



//  第二种实现动画的方式,使用LayoutAnimation
var LayoutAn = React.createClass({
    getInitialState(){
        var platform;
        if (Platform.OS === 'android') {
             platform = 'android';
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }else {
            platform = 'iOS';
        }
        return {w: 200, h: 20,platform:platform}
    },
    _onPress() {
        LayoutAnimation.configureNext({
            duration: 700,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'spring',
                springDamping: 0.4
            }
        });
        this.setState({w: this.state.w + 30, h: this.state.h + 30})
    },
    //  动画的type 类型有   spring 弹跳, linear 线性,   easeInEaseOut easeOut, keyboard
    _onPressReduce(){
        LayoutAnimation.configureNext({
            duration:1000,
            create:{
                type:'linear',
                property:'opacity',
            },
            update:{
                type:'linear',
                springDamping:0.4,  // 阻尼系数
            },
        });
        if(this.state.w>30) {
            this.setState({w: this.state.w - 30});
        }
        if(this.state.h > 30){
            this.setState({h:this.state.h-30});
        }
    },
    render(){
        return (
            <View style={styles.container}>
                <View style={[styles.content,{width:this.state.w,height:this.state.h}]}>
                    <Text style={[styles.textcontainer,{textAlign:'center',width:this.state.w,height:this.state.h}]}>{this.state.platform}this is Anamation</Text>
                </View>
                {/*   注释放在{}  中this._onPress.bind(this)*/ }
                <TouchableOpacity onPress={() => this._onPress()}>
                    <View style={styles.button}>
                        <Text>touch me!</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._onPressReduce()}>
                    <View style={styles.button}>
                        <Text>touch me!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    },
});

// 布局别创建的时候动画
var creatLayoutAn = React.createClass({
    getInitialState(){
        var platform;
        if (Platform.OS === 'android') {
            platform = 'android';
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }else {
            platform = 'iOS';
        }
        return {w: 200, h: 20,platform:platform,showNewOne:false}
    },
    _onPress() {
        LayoutAnimation.configureNext({
            duration: 700,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'spring',
                springDamping: 0.4
            }
        });
        this.setState({w: this.state.w + 30, h: this.state.h + 30,showNewOne:true})
    },
    //  动画的type 类型有   spring 弹跳, linear 线性,   easeInEaseOut easeOut, keyboard
    _onPressReduce(){
        LayoutAnimation.configureNext({
            duration:1000,
            create:{
                type:'linear',
                property:'opacity',
            },
            update:{
                type:'linear',
                springDamping:0.4,  // 阻尼系数
            },
        });
        if(this.state.w>30) {
            this.setState({w: this.state.w - 30});
        }
        if(this.state.h > 30){
            this.setState({h:this.state.h-30});
        }
        this.setState({showNewOne:false})
    },
    render(){
        var newOne = this.state.showNewOne?(
            <View style={[styles.content,{width:this.state.w,height:this.state.h}]}>
                <Text style={[styles.textcontainer,{textAlign:'center',width:this.state.w,height:this.state.h,backgroundColor:'green'}]}>{this.state.platform}this is Anamation</Text>
            </View>
        ):null
        return (
            <View style={styles.container}>
                <View style={[styles.content,{width:this.state.w,height:this.state.h}]}>
                    <Text style={[styles.textcontainer,{textAlign:'center',width:this.state.w,height:this.state.h}]}>{this.state.platform}this is Anamation</Text>
                </View>
                {newOne}
                {/*   注释放在{}  中this._onPress.bind(this)*/ }
                <TouchableOpacity onPress={() => this._onPress()}>
                    <View style={styles.button}>
                        <Text>touch me!</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._onPressReduce()}>
                    <View style={styles.button}>
                        <Text>touch me!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    },
});
const styles= StyleSheet.create({
                container:{
                    flex:1,
                },
                 content:{
                     marginTop:80,
                     backgroundColor:'blue',
                 },
                textcontainer:{
                    textAlign:'center',
                    borderColor:'red',
                    borderWidth:5,
                },
                button:{
                    margin:10,
                    backgroundColor:'red',
                    height:50,
                    width:100,
                }

            });


//
module.exports = animationNativeProps;
