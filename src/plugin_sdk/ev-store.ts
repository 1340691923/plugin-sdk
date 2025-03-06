import {ref} from "vue";

import {bus} from './bus';

import {BusEnum} from "./enum";

// 创建一个响应式的系统设置存储对象
let EvSettingsStore:any=ref(null)

// 创建一个响应式的应用配置存储对象
let EvAppConigStore:any=ref(null)

// 处理系统设置变更的函数
// parentStore: 从父应用传递过来的设置数据
export function handleEvSettingsStore(parentStore: any) {
    // 触发设置变更事件
    bus.emit(BusEnum.changeEvSettings, parentStore)
    // 更新本地存储的设置数据
    EvSettingsStore.value= {...parentStore}
}

// 处理应用配置变更的函数
// parentStore: 从父应用传递过来的配置数据
export function handleEvAppConfig(parentStore: any) {
    // 触发配置变更事件
    bus.emit(BusEnum.changeEvAppConfig, parentStore)
    // 更新本地存储的配置数据
    EvAppConigStore.value= {...parentStore}
}

// 导出存储对象,供其他组件使用
export {EvSettingsStore,EvAppConigStore}
