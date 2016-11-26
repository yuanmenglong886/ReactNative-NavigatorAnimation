/**
 * Created by a58 on 16/11/20.
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
} from 'react-native';

var DemoAnimation = React.createClass({
    getInitialState() {
        return ({
            fadeInOpacity: new Animated.Value(0),
            rotation: new Animated.Value(0),
            fontSize: new Animated.Value(0)});
    },
    componentDidMount() {
        var timing = Animated.timing;
        Animated.parallel(['fadeInOpacity', 'rotation', 'fontSize'].map(property => {
            return timing(this.state[property], {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            });
        })).start();
    },
render() {
    return (<Animated.View style={[styles.demo, {
            opacity: this.state.fadeInOpacity,
                transform: [{
                    rotateZ: this.state.rotation.interpolate({
                        inputRange: [0,1],
                        outputRange: ['0deg', '360deg']
                    })
                }]
            }]}><Animated.Text style={{
                fontSize: this.state.fontSize.interpolate({
                    inputRange: [0,1],
                    outputRange: [12,26]
                })
            }}>我骑着七彩祥云出现了😈💨</Animated.Text>
        </Animated.View>
    );
}
});
class Demo extends Component{
     constructor(props) {
         super(props);
         this.state = {
             fadeInOpacity: new Animated.Value(0),
             rotation: new Animated.Value(0),
             fontSize: new Animated.Value(0)
         }
     }
         componentDidMount(){
        var timing = Animated.timing;
        Animated.parallel(['fadeInOpacity', 'rotation', 'fontSize'].map(property => {
            return timing(this.state[property], {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            });
        })).start();
    }
render() {
    return (<Animated.View style={[styles.demo, {
            opacity: this.state.fadeInOpacity,
                transform: [{
                    rotateZ: this.state.rotation.interpolate({
                        inputRange: [0,1],
                        outputRange: ['0deg', '360deg']
                    })
                }]
            }]}><Animated.Text style={{
                fontSize: this.state.fontSize.interpolate({
                    inputRange: [0,1],
                    outputRange: [12,26]
                })
            }}>我骑着七彩祥云出现了😈💨</Animated.Text>
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
class Playground extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(0),
        };
    }
    render(): ReactElement {
        return (
            <Animated.Image                         // 基础组件: Image, Text, View
                source={require('./images/ic_renren_login_normal.png')}
                style={{
          flex: 1,
          width:200,
          height:200,
          transform: [                        // `transform`   有顺序的数组
            {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
          ]
        }}
            />
        );
    }
    componentDidMount() {
        this.state.bounceValue.setValue(0.5);     // 动画开始的时候 设置一个比较大的值
        Animated.spring(                          // 动画可选类型: spring, decay, timing
            this.state.bounceValue,                 // Animate `bounceValue`
            {
                toValue: 0.8,                         // Animate to smaller size
                friction: 0,                          // Bouncier spring
            }
        ).start();                                // 开始执行动画
    }
}

module.exports = DemoAnimation;