//
//  CalendarManager.m
//  ReactNavigator
//
//  Created by 58 on 16/11/21.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "CalendarManager.h"
#import "RCTConvert.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
@implementation CalendarManager
@synthesize bridge=_bridge;
/**
 *   1.  原生模块基础篇
 */
// 对外提供的模块名字
RCT_EXPORT_MODULE()

// 对外提供的调用借口
RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString*)location)
{
  NSLog(@"pretending to create an event %@ to %@",name,location);
}
//对外提供调用方法,为了演示事件时间格式化 secondsSinceUnixEpoch
RCT_EXPORT_METHOD(addEventMore:(NSString *)name location:(NSString *)location data:(NSNumber*)secondsSinceUnixEpoch){
  NSDate *date = [RCTConvert NSDate:secondsSinceUnixEpoch];
  NSLog(@"oc _%@",date);
}
//对外提供调用方法,为了演示事件时间格式化 ISO8601DateString
RCT_EXPORT_METHOD(addEventMoreTwo:(NSString *)name location:(NSString *)location date:(NSString *)ISO8601DateString)
{
   NSDate *date = [RCTConvert NSDate:ISO8601DateString];
}
//对外提供调用方法,为了演示事件时间格式化 自动类型转换
RCT_EXPORT_METHOD(addEventMoreDate:(NSString *)name location:(NSString *)location date:(NSDate *)date)
{
   NSDateFormatter *formatter = [[NSDateFormatter alloc] init] ;
   [formatter setDateFormat:@"yyyy-MM-dd"];
   NSLog(@"获取的事件信息:%@,地点:%@,时间:%@",name,location,[formatter stringFromDate:date]);
}
 
//对外提供调用方法,为了演示事件时间格式化 传入属性字段
RCT_EXPORT_METHOD(addEventMoreDetails:(NSString *)name details:(NSDictionary *) dictionary)
{
    NSString *location = [RCTConvert NSString:dictionary[@"location"]];
    NSDate *time = [RCTConvert NSDate:dictionary[@"time"]];
    NSString *description=[RCTConvert NSString:dictionary[@"description"]];
    NSLog(@"获取的事件信息:%@,地点:%@,时间:%@,备注信息:%@",name,location,time,description);
   
}

/**
 *  2. 原生模块封装特性篇详解
 */
/** 
 2.1  回调
 *  原生模块调用回调方法只会支持调用一次，但是你可以保存该回调然后在以后某个时间使用。这样的场景通常在封装那些需要代理的版本的iOS API比较常见，具体事例大家可以看一下RCTAlertManager的封装。
 
 除此之外，如果你需要封装传递一个更加类似的对象错误给JavaScript的，那我可以使用RCTUtil.h中的RCTMakeError对象现在我们暂时是发送一个错误结构一样的字典给JavaScript的，但是官方解释讲：在将来可能直接转变成JavaScript的真正的错误对象。
 */
RCT_EXPORT_METHOD(findEvents:(RCTResponseSenderBlock)callback)
{
  
  NSLog(@"特性篇详解");
  callback(@[[NSNull null],@"袁梦龙",@"xiozhang"]);
}

/**
 * 2.2 承诺 prmise
 看了上面的回调函数的使用，大家有没有发现上面的写法还有有一些繁琐的？OK当然原生模块还可以支持使用承诺，这样可以简化我们编写的代码。如果大家搭配使用ES2016标准的async /的await的语法使用会更加好。如果被桥接的原生方法的最后一个参数是RCTPromiseResolveBlock和RCTPromiseRejectBlock类型，那么该JS方法会返回一个承诺对象。下面我们使用无极对象来进行重构之前的回调函数方法。具体代码如下：
 */
RCT_REMAP_METHOD(findEventsPromise, resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSArray *events = @[@"张三",@"yuanfeng",@"jack",@"rose",@"xiaozhang"];
  NSLog(@"%@",events);
  if(events)
  {
    resolve(events);
  }else
  {
    NSError *error = [NSError errorWithDomain:@"promise 的回调错误信息" code:101 userInfo:nil];
    reject(@"no_events",@"there were no events",error);
  }
}
/**
 *   2.3  多线程调用
 */
//对外提供调用方法,演示Thread使用
RCT_EXPORT_METHOD(doSomethingExpensive:(NSString *)param callback:(RCTResponseSenderBlock)callback)
{
  NSLog(@"耗时操作执行完成...");
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    // 在后台执行耗时操作
    // You can invoke callback from any thread/queue
    callback(@[@"耗时操作执行完成...",@"xiaozhan"]);
  });
}

/*
   2.4  常量的到处和封装调用
 原生封装模块可以封装提供常量数据给JavaScript的在随时调用，这样可以通过桥接通信来传递一些静态数据使用方式：
 */
- (NSDictionary *)constantsToExport
{
  return @{@"firstConst":@"Monday"};
}

///////////////////   通知模式
//进行触发发送通知事件
//RCT_EXPORT_METHOD(sendNotification:(NSString *)name){
//  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(calendarEventReminderReceived:) name:nil object:nil];
//  NSLog(@"注册通知事件");
//}
//进行设置发送事件通知给JavaScript端
//- (void)calendarEventReminderReceived:(NSNotification *)notification
//{
//  [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder"
//                                               body:@{@"name": @"张三"}];
//}
/////////////////////

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


//   新的一种通信方式
////////////////////////////////////////////////////
RCT_EXPORT_METHOD(RNInvokeOCCallBack:(NSDictionary *)dictionary callback:(RCTResponseSenderBlock)callback){
  NSLog(@"接收到RN传过来的数据为:%@",dictionary);
  NSArray *events = [[NSArray alloc] initWithObjects:@"张三",@"李四", nil];
  callback(@[[NSNull null], events]);
}

@end

/*
    2.5 封装枚举常量供调用
 */

@implementation RCTConvert (StatusBarAnimation)
RCT_ENUM_CONVERTER(UIStatusBarAnimation, (@{@"statusBarAnimationNone" : @(UIStatusBarAnimationNone),@"statusBarAnimationFade" : @(UIStatusBarAnimationFade),
  @"statusBarAnimationSlide" : @(UIStatusBarAnimationSlide)}), UIStatusBarAnimationNone, integerValue)

@end



