// 导出尺寸枚举类型
export  enum SizeEnum {
    /**
     * 默认尺寸
     */
    DEFAULT = "default",

    /**
     * 大型尺寸
     */
    LARGE = "large",

    /**
     * 小型尺寸
     */
    SMALL = "small",
}


// 导出事件总线枚举类型
export  enum BusEnum {
    /**
     * 页面设置变更事件
     * 当系统设置发生变化时触发此事件
     */
    changeEvSettings = "changeEvSettings",

    /**
     * 应用配置变更事件
     * 当应用配置发生变化时触发此事件
     */
    changeEvAppConfig = "changeEvAppConfig",

}
