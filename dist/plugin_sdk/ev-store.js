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
exports.EvAppConigStore = exports.EvSettingsStore = void 0;
exports.handleEvSettingsStore = handleEvSettingsStore;
exports.handleEvAppConfig = handleEvAppConfig;
var vue_1 = require("vue");
var bus_1 = require("./bus");
var enum_1 = require("./enum");
// 创建一个响应式的系统设置存储对象
var EvSettingsStore = (0, vue_1.ref)(null);
exports.EvSettingsStore = EvSettingsStore;
// 创建一个响应式的应用配置存储对象
var EvAppConigStore = (0, vue_1.ref)(null);
exports.EvAppConigStore = EvAppConigStore;
// 处理系统设置变更的函数
// parentStore: 从父应用传递过来的设置数据
function handleEvSettingsStore(parentStore) {
    // 触发设置变更事件
    bus_1.bus.emit(enum_1.BusEnum.changeEvSettings, parentStore);
    // 更新本地存储的设置数据
    EvSettingsStore.value = __assign({}, parentStore);
}
// 处理应用配置变更的函数
// parentStore: 从父应用传递过来的配置数据
function handleEvAppConfig(parentStore) {
    // 触发配置变更事件
    bus_1.bus.emit(enum_1.BusEnum.changeEvAppConfig, parentStore);
    // 更新本地存储的配置数据
    EvAppConigStore.value = __assign({}, parentStore);
}
