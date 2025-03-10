// 从ev-store模块导入应用配置和设置存储相关的工具
import {EvAppConigStore, EvSettingsStore} from "./ev-store";
// 从vue-router导入Router类型定义
import {Router} from "vue-router";
// 导入vue3事件总线
import {bus} from './bus';

// 导入尺寸枚举类型定义
import {BusEnum, SizeEnum} from "./enum";

// 定义插件API接口，规定了插件必须实现的方法
interface PluginApiInterface {
    // 调用插件API的方法，接收请求对象，返回Promise
    CallPluginApi(req:Req): Promise<any>;
    // 获取当前选中的ES连接ID
    GetSelectEsConnID() :number;
    // 执行链接相关的操作
    LinkOptAction() :Promise<any>;
    // 判断当前是否为移动设备
    IsMobile():boolean;
    // 判断当前是否为暗色主题
    isDarkTheme():boolean
    // 获取路由实例
    getRouter():Router
    // 获取布局尺寸
    getLayoutSize():SizeEnum
    // 获取当前语言设置
    getLanguage():string
    // 获取事件总线实例
    getEventBus():any
    getSizeEnum():any
    getBusEnum():any
}

// SDK类实现，采用单例模式
export class PluginSDK implements PluginApiInterface {
    // 存储单例实例q
    private static _instance: PluginSDK;

    // 插件的唯一标识符
    private _pluginAlias: string = '';
    // 当前选中的ES连接ID
    private _selectEsConnId: number = 0;

    // Vue路由实例
    private _evRouter: Router = {} as Router;
    // 调用插件API的回调函数，处理具体的API请求
    private _callPluginCallBack: (req:Req) => Promise<any>;

    private _linkOptCallBack: () => Promise<any>;
    // 订阅频道的方法，用于事件监听
    private _subToChannel: (channel: string, callback: (data: any) => void) => void;
    // 向频道发送消息的方法
    private _callToChannel: (channel: string, data: any) => void;
    // 取消频道订阅的方法
    private _unSubscribeToChannel: (channel: string, callback?: (data: any) => void) => void;

    private _getUserId:()=>Number;

    // 处理链接操作的回调函数
    static set instance(value: PluginSDK) {
        this._instance = value;
    }

    set setPluginAlias(value: string) {
        this._pluginAlias = value;
    }

    set setSelectEsConnId(value: number) {
        this._selectEsConnId = value;
    }

    set setEvRouter(value: Router) {
        this._evRouter = value;
    }

    set setCallPluginCallBack(value: (req: Req) => Promise<any>) {
        this._callPluginCallBack = value;
    }

    set setLinkOptCallBack(value: () => Promise<any>) {
        this._linkOptCallBack = value;
    }

    set setSubToChannel(value: (channel: string, callback: (data: any) => void) => void) {
        this._subToChannel = value;
    }

    set setCallToChannel(value: (channel: string, data: any) => void) {
        this._callToChannel = value;
    }

    set setUnSubscribeToChannel(value: (channel: string, callback?: (data: any) => void) => void) {
        this._unSubscribeToChannel = value;
    }

    set setGetUserIdCb(value:()=>Number) {
        this._getUserId = value;
    }

    // 私有构造函数，确保只能通过getInstance方法创建实例
    private constructor() {
        // 初始化插件API调用回调，返回空对象
        this._callPluginCallBack = async () => ({});
        // 初始化链接操作回调，返回空对象
        this._linkOptCallBack = async () => ({});
        // 初始化订阅频道方法为空函数
        this._subToChannel = () => {};
        // 初始化发送消息方法为空函数
        this._callToChannel = () => {};
        // 初始化取消订阅方法为空函数
        this._unSubscribeToChannel = () => {};
        this._getUserId = ()=>{return 0 };
    }

    // 获取SDK单例实例的静态方法
    public static getInstance(): PluginSDK {
        // 如果实例不存在则创建新实例
        if (!PluginSDK._instance) {
            PluginSDK._instance = new PluginSDK();
        }
        // 返回单例实例
        return PluginSDK._instance;
    }

    // 订阅指定频道的消息
    SubToChannel(channel: string, msgCb: any): void {
        this._subToChannel(channel, msgCb);
    }

    // 向指定频道发送消息
    CallToChannel(channel: string, msg: any): void {
        this._callToChannel(channel, msg);
    }

    // 取消指定频道的订阅
    UnSubscribeToChannel(channel: string): void {
        this._unSubscribeToChannel(channel);
    }

    // 调用当前插件的API
    async CallPluginApi(req: Req): Promise<any> {
        req.pluginAlias = this.getPluginAlias()
        return this._callPluginCallBack(req);
    }

    // 调用其他插件的API
    async CallAnotherPluginApi(pluginAlias: string, req: Req): Promise<any> {
        req.pluginAlias = pluginAlias
        return this._callPluginCallBack(req);
    }

    // 执行链接相关操作
    async LinkOptAction(): Promise<any> {
        return this._linkOptCallBack();
    }

    GetUserId():Number{
        return this._getUserId()
    }

    // 获取当前选中的ES连接ID
    GetSelectEsConnID(): number {
        return this._selectEsConnId;
    }

    // 检查当前是否为移动设备
    IsMobile(): boolean {
        return EvAppConigStore.value.device === 'mobile';
    }

    // 获取路由实例
    getRouter(): Router {
        return this._evRouter;
    }

    // 检查当前是否为暗色主题
    isDarkTheme(): boolean {
        return EvSettingsStore.value.theme === 'dark';
    }

    // 获取当前布局尺寸
    getLayoutSize(): SizeEnum {
        return EvAppConigStore.value.size;
    }

    // 获取当前语言设置
    getLanguage(): string {
        return EvAppConigStore.value.language;
    }

    getSizeEnum() {
        return SizeEnum
    }
    getBusEnum(){
        return BusEnum
    }

    // 获取事件总线实例
    getEventBus(): any {
        return bus;
    }

    getPluginAlias():string{
        return this._pluginAlias
    }
}

// 定义HTTP请求接口
export interface Req {
    pluginAlias:string;
    url: string;              // API请求地址
    method: string;           // HTTP请求方法
    header: any;              // 请求头信息
    data: any;                // 请求数据
    responseType: any;        // 响应数据类型
    transformResponse: any;    // 响应数据转换函数
}

// 创建并导出SDK单例实例
export const sdk = PluginSDK.getInstance();

// 导出便捷的请求方法，封装了SDK的CallPluginApi调用
export  function request(req: Req): Promise<any> {
    req.pluginAlias = sdk.getPluginAlias()
    return sdk.CallPluginApi(req);
}
