import { App } from 'vue';
import { Router } from 'vue-router';
interface LocaleMessages {
    [key: string]: any;
}
export declare const setupEvPlugin: (pluginJson: Record<string, any>, appVue: any, router: Router, enLocale: LocaleMessages, zhCnLocale: LocaleMessages, registerPlugin: (app: App) => void) => void;
export {};
