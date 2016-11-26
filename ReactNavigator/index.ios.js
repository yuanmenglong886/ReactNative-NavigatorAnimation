/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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
} from 'react-native';
var LoginView = require('./test');
var AnimatedView = require('./layoutAnimation')
var AnimationTop= require('./Animation1')
var CustomModule = require('./nativeModules')
var CustonModule2 = require('./nativeModules2')
var NasendEventJS = require('./nativeModulesReceiveEvent5')
var AsyncStorageDatabase = require('./Database/AsyncStorage')
var RNScrollBanner = require('./ReactNative_ref')
var NAVPassProps = require('./NavPassprops')
var RNNavigator = require('./NavigatorComponent')
var NavigatorAnimation = require('./NavigatorAnimation')
//导航栏
class ReactNavigator extends Component {
  render() {
    return (
        <NavigatorIOS style={{flex:1}} initialRoute={{ component:ListPage,title:'首页'}}/>
    );
  }
}


//列表页面
class ListPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      sex:'1',
    }
  }
  render(){
    return (
        <ScrollView style={styles.flex}>
          <Text style={styles.list_item} onPress={this._goToDetailPage.bind(this)}>订单1详情</Text>
          <Text style={styles.list_item} onPress={this._goToDetailPage.bind(this)}>订单2详情</Text>
          <Text style={styles.list_item} onPress={this._goToDetailPage.bind(this)}>订单3详情</Text>
          <Text style={styles.list_item} onPress={this._goToImagePage.bind(this)}>Image 页面</Text>
            <Text  style={styles.list_item} onPress={this._goToListPage.bind(this)}>ListView 页面</Text>
            <Text  style={styles.list_item} onPress={this._gotoNetWorkList.bind(this)}>Network 页面</Text>
            <Text  style={styles.list_item} onPress={this._gotoTouchable.bind(this)}>Touchable 页面</Text>
            <Text  style={styles.list_item} onPress={this._gotoWebView.bind(this)}>WebView 页面</Text>
            <Text  style={styles.list_item} onPress={this._gotoWebView2.bind(this)}>WebView  静态页面 页面</Text>
            <Text  style={styles.list_item} onPress={this._gotoAnimated.bind(this)}> 动画页面 页面</Text>
            <Text  style={styles.list_item} onPress={this._gotoAnimatedTop.bind(this)}> 动画Top页面 页面</Text>
            <Text  style={styles.list_item} onPress={this._gotoCustomModule.bind(this)}>React-native和native 的通信</Text>
             <Text style={styles.list_item} onPress={this._gotoHunheDemo.bind(this)}>RN-N 混合调用</Text>
            <Text style={styles.list_item} onPress={this._gotoNaToJSDemo.bind(this)}>iOS native 发送消息到JS</Text>
            <Text style={styles.list_item} onPress={this._gotoDataAsyncStore.bind(this)}>RN  的Asyctore  数据存储</Text>
            <Text style={styles.list_item} onPress={this._gotoRNScrollBanner.bind(this)}>RN 中的ref属相详解</Text>
            <Text style={styles.list_item} onPress={this._togoNavPassProps.bind(this)}>RN 中的nav PassProps</Text>
            <Text style={styles.list_item} onPress={this._togoNavigator.bind(this)}>RN 中的navigator 详解</Text>
            <Text style={styles.list_item} onPress={this._togoNavigationAnimation.bind(this)}>Reactnative 中动画的跳转</Text>
        </ScrollView>
    );
  }

  _back(){
    this.props.navigator.pop();
  }
      /*
          跳到图片页面
       */
  _goToImagePage(){
      this.props.navigator.push({
        component:ImagePage,
        title:'image study',
        leftButtonTitle:'返回',
        rightButtonTitle:' next',
        leftButtonIcon:require('image!mm_icon_navigation_back'),
        onLeftButtonPress:() => this._back(),
          /*
          TODO
              重点
           */
        onRightButtonPress:() => this._goToImagePage(),

  });
  }
      /*
         跳到listView 页面
       */
_goToListPage(){
    this.props.navigator.push({
     component:ListShow,
     title:'List view',
     leftButtonTitle:'返回',
     rightButtonTitle:'next',
      leftButtonIcon:require('image!mm_icon_navigation_back'),
      onLeftButtonPress:() => this._back(),
        onRightButtonPress:() => this._goToImagePage(),
    });
}

    _gotoNetWorkList(){
        this.props.navigator.push({
            component:NetWorkList,
            title:'NetWorkList',
            leftButtonTitle:'返回',
            rightButtonTitle:'next',
            leftButtonIcon:require('image!mm_icon_navigation_back'),
            onLeftButtonPress:() => this._back(),
            onRightButtonPress:() => this._goToImagePage(),
        });
    }
    _gotoTouchable(){
    this.props.navigator.push({
        component:TouchAble,
        title:'Touchable',
        leftButtonTitle:'返回',
        rightButtonTitle:'next',
        leftButtonIcon:require('image!mm_icon_navigation_back'),
        onLeftButtonPress:() => this._back(),
        onRightButtonPress:() => this._goToImagePage(),
    });
}
    _gotoWebView(){
        this.props.navigator.push({
            component:ReactWebview,
            title:'webView',
            leftButtonTitle:'返回',
            rightButtonTitle:'next',
            leftButtonIcon:require('image!mm_icon_navigation_back'),
            onLeftButtonPress:() => this._back(),
            onRightButtonPress:() => this._goToImagePage(),

        });
    }
    _gotoWebView2(){
        this.props.navigator.push({
            component:ReactWebView2,
            title:'ReactWebView2',
            leftButtonTitle:'返回',
            rightButtonTitle:'next',
            leftButtonIcon:require('image!mm_icon_navigation_back'),
            onLeftButtonPress:() => this._back(),
            onRightButtonPress:() => this._goToImagePage(),
        });
    }
    _personCenter(){
        alert('个人中心')
    }
    _gotoLoginView(){
        this.props.navigator.push({
            component:LoginView,
            title:'登录',
            rightButtonTitle:'next',
            leftButtonTitle:'个人中心',
            onLeftButtonPress:() => this._personCenter(),
            onRightButtonPress:() => this._goToImagePage(),
        });
    }


    _gotoAnimated(){
        this.props.navigator.push({
            component:AnimatedView,
            title:'动画',
            rightButtonTitle:'next',
            leftButtonIcon:require('image!mm_icon_navigation_back'),
            onLeftButtonPress:() => this._back(),
            onRightButtonPress:() => this._goToImagePage(),
        });
    }
    _gotoAnimatedTop(){
        this.props.navigator.push({
            component:AnimationTop,
            title:'Top 动画',
            leftButtonIcon:require('image!mm_icon_navigation_back'),
            onLeftButtonPress:() => this._back(),
        });
    }
    _gotoCustomModule(){
        this.props.navigator.push({
            component:CustomModule,
            title:'自定义模块',
            leftButtonIcon:require('image!mm_icon_navigation_back'),
            onLeftButtonPress:() => this._back(),
        });
    }
    _gotoHunheDemo(){
        this.props.navigator.push({
            component:CustonModule2,
            title:'混合模块',
            leftButtonIcon:require('image!mm_icon_navigation_back'),
            onLeftButtonPress:() => this._back(),
        });
    }
    _gotoNaToJSDemo(){
         this.props.navigator.push({
             component:NasendEventJS,
             title:'native 发送消息到JS',
             leftButtonIcon:require('image!mm_icon_navigation_back'),
             onLeftButtonPress:()=> this._back(),
         });
    }
    _gotoDataAsyncStore(){
        this.props.navigator.push({
            component:AsyncStorageDatabase,
            title:'数据存储',
            leftButtonIcon:require('image!mm_icon_navigation_back'),
            onLeftButtonPress:() => this._back(),
        });
    }
    _gotoRNScrollBanner(){
        this.props.navigator.push({
            component:RNScrollBanner,
            title:'轮播图',
            leftButtonIcon:require('image!mm_icon_navigation_back'),
            onLeftButtonPress:() => this._back(),
        });
    }
    _togoNavPassProps(){
        this.props.navigator.push({
            component:NAVPassProps,
            title:'nav 传值',
            leftButtonIcon:require('image!mm_icon_navigation_back'),
            onLeftButtonPress:() => this._back(),
        });
    }
    _togoNavigator(){
        this.props.navigator.push({
            component:RNNavigator,
            title:'navigator  使用',
            leftButtonIcon:require('image!mm_icon_navigation_back'),
            onLeftButtonPress:() => this._back(),
        });
    }
    _togoNavigationAnimation(){
        this.props.navigator.push({
            component:NavigatorAnimation,
            title:'navigator  各种动画展示',
            leftButtonIcon:require('image!mm_icon_navigation_back'),
            onLeftButtonPress:() => this._back(),
        });
    }
  _goToDetailPage(){
    this.props.navigator.push({
      component:DetailPage,
      title: '订单详情',
      rightButtonTitle: '购物车',
      onRightButtonPress: function(){

      }
    });
  }

}



/*
    image  页面
 */
    class ImagePage extends Component{
      constructor(props){
        super(props);

      }
      _handleBackButtonPress() {
        this.props.navigator.pop();
      }
      onLeftButtonPress () {
        this.props.navigator.pop();
      }

      render(){
       return  (
       <View style= {{backgroundColor:'white',flex:1}}>
         <View style={{flex:1,marginTop:64}}>
             <Text>加载iOS项目里的图片</Text>
             <Image source={require('image!ic_qq_login_normal')}/>
             <Image source={require('image!mm_icon_navigation_back')}/>
             <Text>加载本地文件的图片</Text>
             <Image source={require('./images/ic_tencent_login_normal.png')}/>
           <Text>加载网路图片</Text>
           <View style={{flex:1,flexDirection:'row'}}>
            <Image  style={{flex:1,width:200,height:200}} source={{uri:"http://avatar.csdn.net/5/D/3/1_yuanmengong886.jpg"}}/>
           <Image  style={{flex:1,width:200,height:200}} source={{uri:"http://f1.diyitui.com/18/ac/88/89/c4/1b/ed/86/be/1c/46/62/79/1e/85/f1.jpg"}}/>
          </View>
         </View>
       </View>
    );
  }
  }
/*
     list Page 页面
 */



  class ListShow extends Component{
      constructor(props){
          super(props);
          var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
          this.state = {
              dataSource:dataSource.cloneWithRows(['第一行内容','第二行内容','disan','Ddise']),
          };
      }
      render(){
          return (<ListView style={{marginTop:64,backgroundColor:'#ff0000'}}
                            dataSource={this.state.dataSource}
                            renderRow = {(rowData) => <Text>{rowData} </Text>}
          />);
      }
  }
/*

   网络请求回来数据的listview
 */
var THUMB_URLS = [
    {uri:"http://www.qq745.com/uploads/allimg/150408/1-15040PJ142-50.jpg"},
    {uri:"http://ww2.sinaimg.cn/large/8989048bjw1dutawvaz66j.jpg"},
    {uri:"http://img.lenovomm.com/s3/img/app/app-img-lestore/1993-2015-07-14062642-1436869602788.jpg?isCompress=true&width=342&height=513&quantity=0.8&rotate=true&dk=2"},
    {uri:"http://c.hiphotos.baidu.com/exp/whcrop=160,120/sign=57e0ac939058d109c4b6fff0be28f18e/b8389b504fc2d5620f811f00e51190ef77c66c56.jpg"},
    {uri:"http://f.hiphotos.baidu.com/exp/whcrop=160,120/sign=c3918fdeba014a90816b10ffc6070423/34fae6cd7b899e51d2350a7841a7d933c8950d26.jpg"},
    {uri:"http://f.hiphotos.baidu.com/exp/whcrop=160,120/sign=2aba0e6674c6a7efb973fe64928a9260/902397dda144ad3494292c3ed2a20cf430ad85f1.jpg"},
    {uri:"http://v1.qzone.cc/avatar/201503/04/17/44/54f6d3f8ae76c662.jpg%21200x200.jpg"},
    {uri:"http://awb.img.xmtbang.com/img/uploadnew/201510/22/8d822cf398d1482fbe3d0ac6208050c4.jpg"},
    {uri:"http://awb.img1.xmtbang.com/wechatmsg2015/article201506/20150601/thumb/6abcaf1a9c69496b8d51ec13eabfb5dd.jpg"},
    {uri:"http://photo.jokeji.cn/uppic/15-06/27/17424334047046.jpg"},
    {uri:"http://imgsrc.baidu.com/forum/w%3D580/sign=7eb05e9eddf9d72a17641015e428282a/3e87194c510fd9f9b3d66fc8212dd42a2a34a4c9.jpg"},
    {uri:"http://img3.redocn.com/tupian/20120703/pazaimeinvdatuishangdeheibaichangmaochongwugou_664529_small.jpg"},
];

class NetWorkList extends Component {

    constructor(props) {
        super(props);

     this._renderRow = this._renderRow.bind(this);

     this._changeView = this._changeView.bind(this);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2','row 3','row 4','row 5','row 6','row 7','row 8','row 9','row 10','row 11','row 12']),
        };
    }

       _back(){
    this.props.navigator.pop();
    }
      _changeView(text){
        this.props.navigator.push({
            component:TouchAble,
            title:' small Touchable',
            leftButtonTitle:'返回',
            rightButtonTitle:'next',
            leftButtonIcon:require('image!mm_icon_navigation_back'),
            /*
             这个时候的函数调用有两种方案   1. () => this._back(), () => 执行了绑定this的操作
                                         2. this._back.bind(this)    继续调用传统的函数,但是执行绑定this 的操作
            */
            onLeftButtonPress:this._back.bind(this),
        });
    }
    _renderRow(rowData: string, sectionID: number, rowID: number) {
        var imgSource = THUMB_URLS[rowID];
        return (
            <TouchableOpacity  onPress={() => this._changeView(rowData)}>
                <View>
                    <View style={netstyles.row} >
                        <Image style={netstyles.thumb} source={imgSource} />
                        <Text style={{flex:1,fontSize:16,color:'blue'}}>
                            {rowData + '我是测试行号哦~'}
                        </Text>
                    </View>
                </View>
                
            </TouchableOpacity>
        );
    }


    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}


                /*
                  TODO
                  重点  listview 绑定时间的时候必须绑定this
                  {this._renderRow.bind(this)} 和{() => this._renderRow()}的区别
                 */
                renderRow={this._renderRow.bind(this)}
            />
        );
    }
}

const netstyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        width: 100,
        height: 100,
    },
});

/*
   跳转到 Touable 的页面
 */
class  TouchAble  extends  Component{
    _show(text) {
        alert(text);
    }

    render() {
        return (
            <View style={{flex:1,marginTop:64}}>
                <TouchableHighlight
                    onPress={this._show.bind(this,'高亮触摸')}
                    underlayColor='#E1F6FF'
                >
                    <Text style={{fontSize:18,margin:10,color:'black'}}>高亮触摸</Text>
                </TouchableHighlight>

                <TouchableOpacity
                    onPress={this._show.bind(this,'透明触摸')}
                    underlayColor='#E1F6FF'>
                    <Text style={{fontSize:18,margin:10,color:'blue'}}>透明触摸</Text>
                </TouchableOpacity>
                <TouchableWithoutFeedback
                    onPress={this._show.bind(this,'无反馈性触摸')}
                    underlayColor='#E1F6FF'>
                    <Text style={{fontSize:18,margin:10,color:'blue'}}>无反馈性触摸</Text>
                </TouchableWithoutFeedback>
            </View>
        );
    }

}
/*
   WebView 1 的加载
 */
const url = 'http://www.baidu.com';
class ReactWebview extends Component{
    _webviewStartLoad(){
        alert('开始加载webview')
    }
    _webviewLoadEnd(){
        alert('webView end')
    }
    _webViewLoading(){
        alert('loading');
        return (
            <View style={{flex:1,backgroundColor:'red',width:300,height:300}}>loading ...</View>
        );
    }
    render(){
        return (
            <WebView style={{flex:1,marginTop:64}} source={{uri:url}}
                   /*  onLoad={() => alert('加载成功')}*/
                     onLoadEnd = {this._webviewLoadEnd.bind(this)}
                     renderLoading= {this._webViewLoading.bind(this)}
                     iosallowsInlineMediaPlayback = {false}

                   /*  injectedJavaScript = {alert(window.title)}*/
                     /*
                        在这种情况下 {this._webviewStartload.bind(this)}  和{() => this._webviewStartLoad()} 是等价的
                      */
                   /*  onLoadStart={() => this._webviewStartLoad()}*/
            />
        );
    }
}
/*
   webView 2 的加载
 */
const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Hello Static World</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: 'red';
      }
      h1 {
        padding: 45px;
        margin: 0;
        text-align: center;
        color: #33f;
      }
    </style>
  </head>
  <body>
    <h1>Hello Static World</h1>
    <div onclick=tip()>webView </div>
    <script type='text/javaScript'>
       function tip(){
          prompt('pmr');
          alert('alert');
        }
    </script>
  </body>
    
</html>
`;
class  ReactWebView2 extends  Component{
    render(){
        return (
            <WebView
                style={{backgroundColor:'red',height:100}}
                source={{html:HTML}}
                scalesPageToFit={true}
            />
        );
    }
}

//  登录页面
class LoginPage extends Component {
    render() {
        return (
            <LoginView></LoginView>
        );
    }
}
//详情页
class DetailPage extends Component {
  _show(text) {
    alert(text);
  }

  _handleBackButtonPress() {
    this.props.navigator.pop();
  }

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity
              onPress={this._show.bind(this,'React Native')}
              activeOpacity={0.5}>
            <Text style={styles.item}>透明触摸</Text>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={this._handleBackButtonPress.bind(this)}>
            <Text style={styles.item}>返回上一级页面</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:64
  },
  item:
  {
    fontSize:18,
    marginLeft:5,
    color:'#434343'
  },
  flex:{
    flex: 1,
  },
  list_item:{
    lineHeight:25,
    fontSize:16,
    marginLeft:10,
    marginRight:10
  }
 });

AppRegistry.registerComponent('ReactNavigator', () => ReactNavigator);
