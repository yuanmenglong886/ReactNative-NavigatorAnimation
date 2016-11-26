//
//  RNBridgeModule.m
//  ReactNavigator
//
//  Created by 58 on 16/11/21.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RNBridgeModule.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
@implementation RNBridgeModule

@synthesize bridge = _bridge;

////http://facebook.github.io/react-native/docs/native-modules-ios.html   react-Native 官网
/**
 *  1. RN 调用iOS 原生的方法  使用回调进行通信
 */
RCT_EXPORT_MODULE()
RCT_EXPORT_METHOD(RNInvokeOCCallBack:(NSDictionary *)dictionary callback:(RCTResponseSenderBlock)callback){
  NSLog(@"接收到RN传过来的数据为:%@",dictionary);
  NSArray *events = [[NSArray alloc] initWithObjects:@"张三",@"李四", nil];
  callback(@[[NSNull null], events]);
}
/**
 *  2. 使用 promist  进行回调
 
 
 js  端必须使用
 var { NativeModules } = require('react-native');
 var RNBridgeModule=NativeModules.RNBridgeModule;
 
 //获取Promise对象处理
 async _updateEvents(){
 try{
 var events=await RNBridgeModule.RNInvokeOCPromise({'name':'jiangqqlmj'});
 this.setState({events});
 }catch(e){
 this.setState({events:e.message});
 }
 }
 */
//RN传参数调用原生OC,并且返回数据给RN  通过Promise
RCT_REMAP_METHOD(RNInvokeOCPromise, dict:(NSDictionary *)dictionary  resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
   NSLog(@"接收到RN传过来的数据为:%@",dictionary);
 
  NSLog(@"回调成功");
  NSString *values = [dictionary objectForKey:@"age"];
  if([values isEqualToString:@"26"])
  {
     resolve(@"年龄符合要求");
  }else
  {
    NSError *error = [NSError errorWithDomain:@"传入的age 不符合要求,请重新传入数据" code:101 userInfo:@{@"descrption":@"传入信息错误"}];
    reject(@"100",@"传入的错误",error);
  }
//  NSString *value=[dictionary objectForKey:@"name"];
//  if([value isEqualToString:@"jiangqq"]){
//    resolve(@"回调成功啦,Promise...");
//  }else{
//    NSError *error=[NSError errorWithDomain:@"传入的name不符合要求,回调失败啦,Promise..." code:100 userInfo:nil];
//    reject(@"100",@"传入的name不符合要求,回调失败啦,Promise...",error);
//  }
}


/**
 *   3. 使用eventDispatcher 来调用  RNCalliOS
 */
//
RCT_EXPORT_METHOD(RNCalliOS:(NSDictionary *)jsonObject){
    NSLog(@"注册通知 开始");
  if([[jsonObject objectForKey:@"name"] isEqualToString:@"yuanmenglong"])
  {
    [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder" body:@{@"name":[NSString stringWithFormat:@"%@",[jsonObject objectForKey:@"name"]],@"errorCode":@"0",@"msg":@"成功"}];
    
  }
  else
  {
    [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder" body:@{@"name":[NSString stringWithFormat:@"%@",[jsonObject objectForKey:@"name"]],@"errorCode":@"0",@"msg":@"输入的name不是yuanmenglong"}];
  }
//  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(calendarEventReminderReceived:) name:nil object:nil];
  NSLog(@"注册通知结束");
}

//进行触发发送通知事件
//RCT_EXPORT_METHOD(sendNotification:(NSString *)name){
//  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(calendarEventReminderReceived:) name:nil object:nil];
//  NSLog(@"sss");
//}
//进行设置发送事件通知给JavaScript端
//- (void)calendarEventReminderReceived:(NSNotification *)notification
//{
//  [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder"
//                                               body:@{@"name": @"张三"}];
//}
/**
 *    4.  使用通知来调用
 */
//进行触发发送通知事件
RCT_EXPORT_METHOD(sendNotification:(NSString *)name){
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(calendarEventReminderReceived:) name:nil object:nil];
  NSLog(@"注册通知事件");
}
//进行设置发送事件通知给JavaScript端
- (void)calendarEventReminderReceived:(NSNotification *)notification
{
  [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder"
                                               body:@{@"name": @"张三"}];
}
/////////////////////
/**
 *      5. 发送事件到javascript  而不是去调用函数
 */
- (void)nativeSendEventToJavascript:(NSNotification *)notification
{
  NSString *eventName = notification.userInfo[@"name"];
  if(eventName != nil)
  {
  [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder"
                                               body:@{@"name": eventName}];
  }else
  {
    NSLog(@"传入的数据有错误");
  }
}
RCT_EXPORT_METHOD(mountSucess:(NSDictionary*)dictionary){
  NSNotification *noti = [[NSNotification alloc]initWithName:@"yuanmenglong" object:[[NSObject alloc]init] userInfo:dictionary];
  [self nativeSendEventToJavascript:noti];
}

@end
