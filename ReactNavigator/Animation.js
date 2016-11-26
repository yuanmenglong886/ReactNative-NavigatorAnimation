/**
 * Created by a58 on 16/11/20.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Easing,
} from 'react-native';
class  FadeInView extends Component{
    constructor(props){
        super(props)
        this.state = {
            fadeAnim: new Animated.Value(0),
        };
    }
    componentDidMount(){
        Animated.timing(
            this.state.fadeAnim,
            {toValue:1,  /* 目标值 */
             duration:2500,   /*  动画 时间 */
             easing:Easing.linear   /*缓动函数*/
            }
        ).start();
    }
    render(){
        return (
            <Animated.View style={[styles.demo,{opacity:this.state.fadeAnim}]}>
                 <Text style={styles.text}>悄悄的,我出现了</Text>
            </Animated.View>
        );
    }

}
 let styles = StyleSheet.create({
    demo:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
    },
    text:{
    fontSize:30,
    }
    });


module.exports = FadeInView;