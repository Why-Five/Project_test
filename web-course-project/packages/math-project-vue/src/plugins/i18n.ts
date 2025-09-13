import type { App, InjectionKey } from "vue";

const dictionary = {
  zh: {
    hello: "你好哇!",
    MilkyWay: "银河",
  },
  en: {
    hello: "Hello!",
    MilkyWay: "The Milky Way",
  },
} as const; // 添加 as const 断言以获得更精确的类型

export const $i18n = Symbol("i18n") as InjectionKey<typeof dictionary>;

export default {
  install: (app: App<Element>) => {
    app.provide($i18n, dictionary);
  },
};