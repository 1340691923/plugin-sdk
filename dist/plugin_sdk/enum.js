"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusEnum = exports.SizeEnum = void 0;
// 导出尺寸枚举类型
var SizeEnum;
(function (SizeEnum) {
    /**
     * 默认尺寸
     */
    SizeEnum["DEFAULT"] = "default";
    /**
     * 大型尺寸
     */
    SizeEnum["LARGE"] = "large";
    /**
     * 小型尺寸
     */
    SizeEnum["SMALL"] = "small";
})(SizeEnum || (exports.SizeEnum = SizeEnum = {}));
// 导出事件总线枚举类型
var BusEnum;
(function (BusEnum) {
    /**
     * 页面设置变更事件
     * 当系统设置发生变化时触发此事件
     */
    BusEnum["changeEvSettings"] = "changeEvSettings";
    /**
     * 应用配置变更事件
     * 当应用配置发生变化时触发此事件
     */
    BusEnum["changeEvAppConfig"] = "changeEvAppConfig";
})(BusEnum || (exports.BusEnum = BusEnum = {}));
