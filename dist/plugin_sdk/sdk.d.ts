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
    private static instance;
    pluginAlias: string;
    selectEsConnId: number;
    evRouter: Router;
    callPluginCallBack: (req: Req) => Promise<any>;
    linkOptCallBack: () => Promise<any>;
    subToChannel: (channel: string, callback: (data: any) => void) => void;
    callToChannel: (channel: string, data: any) => void;
    unSubscribeToChannel: (channel: string, callback?: (data: any) => void) => void;
    private constructor();
    static getInstance(): PluginSDK;
    SubToChannel(channel: string, msgCb: any): void;
    CallToChannel(channel: string, msg: any): void;
    UnSubscribeToChannel(channel: string): void;
    CallPluginApi(req: Req): Promise<any>;
    CallAnotherPluginApi(pluginAlias: string, req: Req): Promise<any>;
    LinkOptAction(): Promise<any>;
    GetSelectEsConnID(): number;
    IsMobile(): boolean;
    getRouter(): Router;
    isDarkTheme(): boolean;
    getLayoutSize(): SizeEnum;
    getLanguage(): string;
    getSizeEnum(): typeof SizeEnum;
    getBusEnum(): typeof BusEnum;
    getEventBus(): any;
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
