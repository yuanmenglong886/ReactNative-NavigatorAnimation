/**
 * Created by a58 on 16/11/26.
 */
'use strict'

import React, { Component } from 'react';

import  {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Image,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';


import Dimensions from 'Dimensions';
// 屏幕宽度
var screenWidth = Dimensions.get('window').width;

class Two extends Component {
    render(){
        return(
            <View style={{marginTop:100}}>
                <Text style={{fontSize:20}}>Hello From second component</Text>
                <Text>id: {this.props.id}</Text>
                <Text>name: {this.props.name}</Text>
                <Text>name: {this.props.myVar}</Text>
            </View>
        )
    }
}


class Main extends Component {
    gotoNext(myVar) {
        this.props.navigator.push({
            component: Two,
            passProps: {
                id: 'page_user_infos',
                name: 'page_user_infos',
                myVar: myVar,
            }
        })
    }


    render() {
        return(
            <View style={{flex: 1, flexDirection: 'column', marginTop:100}}>
                <TouchableHighlight style={{ height:40, borderWidth:1, marginBottom:10, backgroundColor: '#ddd'}} name='Pole' onPress={ () => this.gotoNext('This is a property that is being passed') }>
                    <Text style={{textAlign:'center'}}>Go to next page</Text>
                </TouchableHighlight>
            </View>
        )
    }
}


class MyReactiveNativeProject extends React.Component {
    render() {


        return (
            <Navigator
                style={{flex:1}}
                initialRoute={{name: 'Main', component: Main, index: 0}}
                renderScene={(route, navigator) =>    {
            if (route.component) {
                          return React.createElement(route.component, { ...this.props, ...route.passProps, navigator, route } );
                      }
                }}
                navigationBar={
            <Navigator.NavigationBar routeMapper={NavigationBarRouteMapper} />
      } />
        );
    }
}






var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        if(index > 0) {
            return (
                <TouchableHighlight  style={{marginTop: 10}} onPress={() => {
            if (index > 0) {
              navigator.pop();
            }
        }}>
                    <Text>Back</Text>
                </TouchableHighlight>
            )} else {
            return null}
    },
    RightButton(route, navigator, index, navState) {
        return null;
    },
    Title(route, navigator, index, navState) {
        return null
    }
};

module.exports  = MyReactiveNativeProject;