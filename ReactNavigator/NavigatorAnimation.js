/**
 * Created by a58 on 16/11/26.
 */
'use strict'
import  React,{Component} from 'react';
import  {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView
} from 'react-native';
class CustomButton extends  Component{
    render(){
        return (
            <TouchableHighlight style={styles.button}
                                underlayColor="#a5a5a5"
                                onPress = {this.props.onPress}><Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );}
}

class CustomTitle extends Component{
   render(){
       return (
           <View style={styles.heading}>
               <Text style={styles.headText}>{this.props.text}</Text>
           </View>
       );}
}
class  FirstPage extends  Component {
    //  在RN 中 定义的变量或者函数前面有_ 下划线 代码这个变量或者方法是私有的
    _navigate(name, type = 'Normal') {
        this.props.navigator.push({
            component: SecondPage,
            passProps: {
                name: name
            },
            type: type
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <CustomTitle text='第一页'></CustomTitle>
                <CustomButton onPress={() => this._navigate('FloatFromBottom','FloatBottom')} text="从底部Float"/>
                <CustomButton onPress={() => this._navigate('VerticalDownSwipeJump','VerticalDown')} text="从顶部跳下"/>
                <CustomButton onPress={() => this._navigate('VerticalUpSwipeJump','VerticalUp')} text="从下面跳上来"/>
                <CustomButton onPress={() => this._navigate('FloatFromLeft','FloatLeft')} text="从左边Float"/>
                <CustomButton onPress={() => this._navigate('FloatFromRight','FloatRight')} text="从右边Float"/>
                <CustomButton onPress={() => this._navigate('PushFromLeft','PushLeft')} text="从左边Push"/>
                <CustomButton onPress={() => this._navigate('PushFromRight','PushRight')} text="从右边Push"/>
                <CustomButton onPress={() => this._navigate('SwipeFromLeft','SwipeFromLeft')} text=" SwipeFromLeft"/>
                <CustomButton onPress={() => this._navigate('HorizontalSwipeJump','HorizontalSwipeJump')} text=" HorizontalSwipeJump"/>
                <CustomButton onPress={() => this._navigate('HorizontalSwipeJumpFromRight','HorizontalSwipeJumpFromRight')} text=" HorizontalSwipeJumpFromRight"/>
                <CustomButton onPress={() => this._navigate('HorizontalSwipeJumpFromLeft','HorizontalSwipeJumpFromLeft')} text=" HorizontalSwipeJumpFromLeft"/>
            </ScrollView>
        );
    }
}

 class SecondPage extends Component{
     // 构造
       constructor(props) {
         super(props);
         // 初始状态
         this.state = {};
          this._pop = this._pop.bind(this);
       }
    _pop(){
        this.props.navigator.pop()
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomTitle text={this.props.name}></CustomTitle>
                  <CustomButton onPress={this._pop} text="返回到上一页"/>
            </View>
                );
     }
 }
class  NavigatorAnimation extends  Component{

    renderScene(route,navigator){
        return <route.component navigator={navigator} {...route.passProps}/>;
    }
    /*
     *   配置转场动画
     *   @param route 路由
     *   @param routeStack  路由栈
     *   @returns {*} 动画
     */
    configureScene(route,routeStack){
        switch(route.type){
            case 'PushLeft':
                return Navigator.SceneConfigs.PushFromLeft;
            case 'PushRight':
                return Navigator.SceneConfigs.PushFromRight;
            case 'FloatBottom':
                return Navigator.SceneConfigs.FloatFromBottom;
            case 'VerticalDown':
                return Navigator.SceneConfigs.VerticalDownSwipeJump;
            case 'VerticalUp':
                return Navigator.SceneConfigs.VerticalUpSwipeJump;
            case 'FloatLeft':
                return Navigator.SceneConfigs.FloatFromLeft;
            case 'FloatRight':
                return Navigator.SceneConfigs.FloatFromRight;
            case 'SwipeFromLeft':
                return Navigator.SceneConfigs.SwipeFromLeft;
            case 'HorizontalSwipeJump':
                 return Navigator.SceneConfigs.HorizontalSwipeJump;
            case 'HorizontalSwipeJumpFromRight':
                 return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
            case 'HorizontalSwipeJumpFromLeft':
                 return Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft;
            default:
                  return Navigator.SceneConfigs.PushFromRight;
        }
    //     - Navigator.SceneConfigs.PushFromRight (default)
    // *  - Navigator.SceneConfigs.FloatFromRight
    //     *  - Navigator.SceneConfigs.FloatFromLeft
    //     *  - Navigator.SceneConfigs.FloatFromBottom
    //     *  - Navigator.SceneConfigs.FloatFromBottomAndroid
    //     *  - Navigator.SceneConfigs.FadeAndroid
    //     *  - Navigator.SceneConfigs.SwipeFromLeft
    //     *  - Navigator.SceneConfigs.HorizontalSwipeJump
    //     *  - Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
    //     *  - Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft
    //     *  - Navigator.SceneConfigs.VerticalUpSwipeJump
    //     *  - Navigator.SceneConfigs.VerticalDownSwipeJump
        // if(route.type == 'Bottom'){
        //     return Navigator.SceneConfigs.FloatFromBottom; // 底部弹出 相当于iOS的present
        // }else if(route.type == 'Top'){
        //     return Navigator.SceneConfigs.VerticalDownSwipeJump;
        // }else if(route.type == 'Left'){
        //     return Navigator.SceneConfigs.FloatFromLeft;
        // }else if(route.)
        // // return Navigator.SceneConfigs.PushFromRight;

    }
    /*
     * 渲染视图
     */
    render(){
        return (
            <Navigator
            style={{flex:1}}
            initialRoute={{component:FirstPage}}
            configureScene={this.configureScene}
            renderScene={this.renderScene}/>
        );
    }



}

const styles=StyleSheet.create({
    container:{
        flex:1,
        marginTop:64,
    },
    //  导航栏
    heading:{
        height:44,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ff1046',
        marginBottom:10,
    },
    // 导航栏文字显示
    headText:{
        color:'#ffffff',
        fontSize:20,
    },
    // 自定义按钮使用
    button:{
        height:60,
        marginTop:10,
        justifyContent:'center',
        backgroundColor:'#eeeeee',
        alignItems:'center'
    },
    buttonText:{
        fontSize:18
    }
});
module.exports = NavigatorAnimation;
