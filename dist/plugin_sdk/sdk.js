"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sdk = exports.PluginSDK = void 0;
exports.request = request;
// 从ev-store模块导入应用配置和设置存储相关的工具
var ev_store_1 = require("./ev-store");
// 导入vue3事件总线
var bus_1 = require("./bus");
// 导入尺寸枚举类型定义
var enum_1 = require("./enum");
// SDK类实现，采用单例模式
var PluginSDK = /** @class */ (function () {
    // 私有构造函数，确保只能通过getInstance方法创建实例
    function PluginSDK() {
        var _this = this;
        // 插件的唯一标识符
        this.pluginAlias = '';
        // 当前选中的ES连接ID
        this.selectEsConnId = 0;
        // Vue路由实例
        this.evRouter = {};
        // 初始化插件API调用回调，返回空对象
        this.callPluginCallBack = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ({})];
        }); }); };
        // 初始化链接操作回调，返回空对象
        this.linkOptCallBack = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ({})];
        }); }); };
        // 初始化订阅频道方法为空函数
        this.subToChannel = function () { };
        // 初始化发送消息方法为空函数
        this.callToChannel = function () { };
        // 初始化取消订阅方法为空函数
        this.unSubscribeToChannel = function () { };
    }
    // 获取SDK单例实例的静态方法
    PluginSDK.getInstance = function () {
        // 如果实例不存在则创建新实例
        if (!PluginSDK.instance) {
            PluginSDK.instance = new PluginSDK();
        }
        // 返回单例实例
        return PluginSDK.instance;
    };
    // 订阅指定频道的消息
    PluginSDK.prototype.SubToChannel = function (channel, msgCb) {
        this.subToChannel(channel, msgCb);
    };
    // 向指定频道发送消息
    PluginSDK.prototype.CallToChannel = function (channel, msg) {
        this.callToChannel(channel, msg);
    };
    // 取消指定频道的订阅
    PluginSDK.prototype.UnSubscribeToChannel = function (channel) {
        this.unSubscribeToChannel(channel);
    };
    // 调用当前插件的API
    PluginSDK.prototype.CallPluginApi = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                req.pluginAlias = exports.sdk.pluginAlias;
                return [2 /*return*/, this.callPluginCallBack(req)];
            });
        });
    };
    // 调用其他插件的API
    PluginSDK.prototype.CallAnotherPluginApi = function (pluginAlias, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                req.pluginAlias = pluginAlias;
                return [2 /*return*/, this.callPluginCallBack(req)];
            });
        });
    };
    // 执行链接相关操作
    PluginSDK.prototype.LinkOptAction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.linkOptCallBack()];
            });
        });
    };
    // 获取当前选中的ES连接ID
    PluginSDK.prototype.GetSelectEsConnID = function () {
        return this.selectEsConnId;
    };
    // 检查当前是否为移动设备
    PluginSDK.prototype.IsMobile = function () {
        return ev_store_1.EvAppConigStore.value.device === 'mobile';
    };
    // 获取路由实例
    PluginSDK.prototype.getRouter = function () {
        return this.evRouter;
    };
    // 检查当前是否为暗色主题
    PluginSDK.prototype.isDarkTheme = function () {
        return ev_store_1.EvSettingsStore.value.theme === 'dark';
    };
    // 获取当前布局尺寸
    PluginSDK.prototype.getLayoutSize = function () {
        return ev_store_1.EvAppConigStore.value.size;
    };
    // 获取当前语言设置
    PluginSDK.prototype.getLanguage = function () {
        return ev_store_1.EvAppConigStore.value.language;
    };
    PluginSDK.prototype.getSizeEnum = function () {
        return enum_1.SizeEnum;
    };
    PluginSDK.prototype.getBusEnum = function () {
        return enum_1.BusEnum;
    };
    // 获取事件总线实例
    PluginSDK.prototype.getEventBus = function () {
        return bus_1.bus;
    };
    return PluginSDK;
}());
exports.PluginSDK = PluginSDK;
// 创建并导出SDK单例实例
exports.sdk = PluginSDK.getInstance();
// 导出便捷的请求方法，封装了SDK的CallPluginApi调用
function request(req) {
    console.log("req", req);
    req.pluginAlias = exports.sdk.pluginAlias;
    return exports.sdk.CallPluginApi(req);
}
