import { ENLocale } from "./en-us/en-us";
import { RULocale } from "./ru/ru-ru";

export interface L10N {
    [key: string]: string;
}
  
export interface ImsgContainer {
    "ru-RU"?: L10N;
    "en-EN"?: L10N;
}

export class GDL10n {
    static msgContainer: ImsgContainer = {
      "ru-RU": RULocale,
      "en-EN": ENLocale,
    };
    static defCurrentLocale: string = "ru-RU";
  
    public static get currentLocale(): string {
      return this.defCurrentLocale;
    }
  
    // static getCurMsg(): L10N {
    //   return GDL10n.msgContainer[GDL10n.currentLocale] || GDL10n.msgContainer["en-EN"];
    // }
  
    // static formatMsg(id: string, format?: IMsgFormat, defaultMessage?: string) {
    //   try {
    //     let enNumPhotos = new IntlMessageFormat(GDL10n.getCurMsg()[id], GDL10n.currentLocale);
    //     return enNumPhotos.format(format) || id;
    //   } catch (e) {
    //     console.warn("MSG id:" + id + " show defaultMessage");
    //     return defaultMessage || id;
    //   }
    // }
  }