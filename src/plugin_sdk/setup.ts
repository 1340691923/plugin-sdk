import {renderWithQiankun} from 'vite-plugin-qiankun/dist/helper'
import {QiankunProps} from "vite-plugin-qiankun/es/helper";
import {EvAppConigStore, EvSettingsStore, handleEvAppConfig, handleEvSettingsStore} from "./ev-store";
import {App, createApp} from 'vue'

import {bus} from './bus';
import {sdk} from './sdk';
import {Router} from 'vue-router'
import {createI18n} from "vue-i18n";

interface RenderProps extends QiankunProps {
    container?: HTMLElement;
}

interface LocaleMessages {
    [key: string]: any;
}

let app: App;

const render = (
    props: RenderProps,
    registerPlugin: (app: App) => void,
    pluginJson: Record<string, any>,
    appVue: any,
    router: Router,
    enLocale: LocaleMessages,
    zhCnLocale: LocaleMessages
) => {
    const {container} = props;

    app = createApp(appVue);

    // 使用事件总线
    app.use(bus as any); // 临时解决方案，后续可能需要更好的类型定义

    // 初始化并监听系统设置变更
    handleEvSettingsStore(props.store.useSettingsStore)
    props.store.onChangeSettingsStore?.((parentStore: any) => {
        handleEvSettingsStore(parentStore)
    })

    // 初始化并监听应用配置变更
    handleEvAppConfig(props.store.useAppStore)
    props.store.onChangeAppStore?.((parentStore: any) => {
        handleEvAppConfig(parentStore)
    })

    // 注入存储对象到应用实例
    app.provide('useSettingsStoreHook',props.store.useSettingsStore)
    app.provide('useSettingsStore',EvSettingsStore)
    app.provide('useEvAppConigStoreHook',props.store.useAppStore)
    app.provide('useEvAppConigStore',EvAppConigStore)

    // 初始化SDK配置
    sdk.pluginAlias = pluginJson.plugin_alias
    sdk.callPluginCallBack = props.CallPluginApi
    sdk.selectEsConnId = props.GetSelectEsConnID()
    sdk.linkOptCallBack = props.LinkOptAction
    sdk.evRouter = props.store.router

    // 设置SDK的频道相关方法
    sdk.subToChannel = props.SubToChannel
    sdk.callToChannel = props.CallToChannel
    sdk.unSubscribeToChannel = props.UnSubscribeToChannel

    // 获取国际化消息配置
    let i18nMessage = props.GetI18nMessage()

    // 合并本地和远程的语言配置
    let zhCnLocaleCfg = zhCnLocale
    let enLocaleCfg = enLocale

    if(i18nMessage.hasOwnProperty('zh-cn')){
        for(let k in i18nMessage['zh-cn']){
            zhCnLocaleCfg[k] = i18nMessage['zh-cn'][k]
        }
    }

    if(i18nMessage.hasOwnProperty('en')){
        for(let k in i18nMessage['en']){
            enLocaleCfg[k] = i18nMessage['en'][k]
        }
    }

    // 配置国际化消息
    const messages = {
        "zh-cn": {
            ...zhCnLocaleCfg,
        },
        'en': {
            ...enLocaleCfg,
        },
    };

    // 创建i18n实例
    const i18n = createI18n({
        legacy: false,
        locale: sdk.getLanguage(),
        messages: messages,
        globalInjection: true,
    });

    // 使用i18n
    app.use(i18n)

    // 注册插件
    registerPlugin(app)

    // 挂载应用
    app
        .use(router)
        .mount(container?.querySelector('#app') || '#app')
}

export const setupEvPlugin = (
    pluginJson: Record<string, any>,
    appVue: any,
    router: Router,
    enLocale: LocaleMessages,
    zhCnLocale: LocaleMessages,
    registerPlugin: (app: App) => void
) => {
    // 配置乾坤微前端生命周期
    renderWithQiankun({
        // 更新回调
        update(props: QiankunProps): void | Promise<void> {
            return
        },
        // 挂载回调
        mount(props) {
            render(props,registerPlugin,pluginJson,appVue,router,enLocale,zhCnLocale)
        },
        // 启动回调
        bootstrap() {},
        // 卸载回调
        unmount() {
            app.unmount()
        }
    })
}
