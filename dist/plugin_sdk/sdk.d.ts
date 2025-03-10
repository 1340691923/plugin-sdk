import { Router } from "vue-router";
import { BusEnum, SizeEnum } from "./enum";
interface PluginApiInterface {
    CallPluginApi(req: Req): Promise<any>;
    GetSelectEsConnID(): number;
    LinkOptAction(): Promise<any>;
    IsMobile(): boolean;
    isDarkTheme(): boolean;
    getRouter(): Router;
    getLayoutSize(): SizeEnum;
    getLanguage(): string;
    getEventBus(): any;
    getSizeEnum(): any;
    getBusEnum(): any;
}
export declare class PluginSDK implements PluginApiInterface {
    private static _instance;
    private _pluginAlias;
    private _selectEsConnId;
    private _evRouter;
    private _callPluginCallBack;
    private _linkOptCallBack;
    private _subToChannel;
    private _callToChannel;
    private _unSubscribeToChannel;
    private _getUserId;
    static set instance(value: PluginSDK);
    set setPluginAlias(value: string);
    set setSelectEsConnId(value: number);
    set setEvRouter(value: Router);
    set setCallPluginCallBack(value: (req: Req) => Promise<any>);
    set setLinkOptCallBack(value: () => Promise<any>);
    set setSubToChannel(value: (channel: string, callback: (data: any) => void) => void);
    set setCallToChannel(value: (channel: string, data: any) => void);
    set setUnSubscribeToChannel(value: (channel: string, callback?: (data: any) => void) => void);
    set setGetUserIdCb(value: () => Number);
    private constructor();
    static getInstance(): PluginSDK;
    SubToChannel(channel: string, msgCb: any): void;
    CallToChannel(channel: string, msg: any): void;
    UnSubscribeToChannel(channel: string): void;
    CallPluginApi(req: Req): Promise<any>;
    CallAnotherPluginApi(pluginAlias: string, req: Req): Promise<any>;
    LinkOptAction(): Promise<any>;
    GetUserId(): Number;
    GetSelectEsConnID(): number;
    IsMobile(): boolean;
    getRouter(): Router;
    isDarkTheme(): boolean;
    getLayoutSize(): SizeEnum;
    getLanguage(): string;
    getSizeEnum(): typeof SizeEnum;
    getBusEnum(): typeof BusEnum;
    getEventBus(): any;
    getPluginAlias(): string;
}
export interface Req {
    pluginAlias: string;
    url: string;
    method: string;
    header: any;
    data: any;
    responseType: any;
    transformResponse: any;
}
export declare const sdk: PluginSDK;
export declare function request(req: Req): Promise<any>;
export {};
