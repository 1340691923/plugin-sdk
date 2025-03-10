"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupEvPlugin = void 0;
var helper_1 = require("vite-plugin-qiankun/dist/helper");
var ev_store_1 = require("./ev-store");
var vue_1 = require("vue");
var bus_1 = require("./bus");
var sdk_1 = require("./sdk");
var vue_i18n_1 = require("vue-i18n");
var app;
var render = function (props, registerPlugin, pluginJson, appVue, router, enLocale, zhCnLocale) {
    var _a, _b, _c, _d;
    var container = props.container;
    app = (0, vue_1.createApp)(appVue);
    // 使用事件总线
    app.use(bus_1.bus); // 临时解决方案，后续可能需要更好的类型定义
    // 初始化并监听系统设置变更
    (0, ev_store_1.handleEvSettingsStore)(props.store.useSettingsStore);
    (_b = (_a = props.store).onChangeSettingsStore) === null || _b === void 0 ? void 0 : _b.call(_a, function (parentStore) {
        (0, ev_store_1.handleEvSettingsStore)(parentStore);
    });
    // 初始化并监听应用配置变更
    (0, ev_store_1.handleEvAppConfig)(props.store.useAppStore);
    (_d = (_c = props.store).onChangeAppStore) === null || _d === void 0 ? void 0 : _d.call(_c, function (parentStore) {
        (0, ev_store_1.handleEvAppConfig)(parentStore);
    });
    // 注入存储对象到应用实例
    app.provide('useSettingsStoreHook', props.store.useSettingsStore);
    app.provide('useSettingsStore', ev_store_1.EvSettingsStore);
    app.provide('useEvAppConigStoreHook', props.store.useAppStore);
    app.provide('useEvAppConigStore', ev_store_1.EvAppConigStore);
    // 初始化SDK配置
    sdk_1.sdk.setPluginAlias = pluginJson.plugin_alias;
    sdk_1.sdk.setCallPluginCallBack = props.CallPluginApi;
    sdk_1.sdk.setSelectEsConnId = props.GetSelectEsConnID();
    sdk_1.sdk.setLinkOptCallBack = props.LinkOptAction;
    sdk_1.sdk.setEvRouter = props.store.router;
    // 设置SDK的频道相关方法
    sdk_1.sdk.setSubToChannel = props.SubToChannel;
    sdk_1.sdk.setCallToChannel = props.CallToChannel;
    sdk_1.sdk.setUnSubscribeToChannel = props.UnSubscribeToChannel;
    sdk_1.sdk.setGetUserIdCb = props.getUserId;
    // 获取国际化消息配置
    var i18nMessage = props.GetI18nMessage();
    // 合并本地和远程的语言配置
    var zhCnLocaleCfg = zhCnLocale;
    var enLocaleCfg = enLocale;
    if (i18nMessage.hasOwnProperty('zh-cn')) {
        for (var k in i18nMessage['zh-cn']) {
            zhCnLocaleCfg[k] = i18nMessage['zh-cn'][k];
        }
    }
    if (i18nMessage.hasOwnProperty('en')) {
        for (var k in i18nMessage['en']) {
            enLocaleCfg[k] = i18nMessage['en'][k];
        }
    }
    // 配置国际化消息
    var messages = {
        "zh-cn": __assign({}, zhCnLocaleCfg),
        'en': __assign({}, enLocaleCfg),
    };
    // 创建i18n实例
    var i18n = (0, vue_i18n_1.createI18n)({
        legacy: false,
        locale: sdk_1.sdk.getLanguage(),
        messages: messages,
        globalInjection: true,
    });
    // 使用i18n
    app.use(i18n);
    // 注册插件
    registerPlugin(app);
    // 挂载应用
    app
        .use(router)
        .mount((container === null || container === void 0 ? void 0 : container.querySelector('#app')) || '#app');
};
var setupEvPlugin = function (pluginJson, appVue, router, enLocale, zhCnLocale, registerPlugin) {
    // 配置乾坤微前端生命周期
    (0, helper_1.renderWithQiankun)({
        // 更新回调
        update: function (props) {
            return;
        },
        // 挂载回调
        mount: function (props) {
            render(props, registerPlugin, pluginJson, appVue, router, enLocale, zhCnLocale);
        },
        // 启动回调
        bootstrap: function () { },
        // 卸载回调
        unmount: function () {
            app.unmount();
        }
    });
};
exports.setupEvPlugin = setupEvPlugin;
