import en from '../i18n/languages/en.json';
import zh_CN from '../i18n/languages/zh-CN.json';
import zh_TW from '../i18n/languages/zh-TW.json';

// 默认语言（服务端渲染不保存到 html 中）
export const defaultLanguage = 'en';

export const languages = [
  {
    code: 'en',
    name: 'English',
    data: en,
    subsets: ['en-GB', 'en-US', 'en-IE', 'en-AU', 'en-CA', 'en-ZA', 'en-NZ', 'en-IN', 'en-GB-oxendict'],
  },
  {
    code: 'zh-CN',
    name: '中文（简体）',
    data: zh_CN,
    subsets: ['zh'],
  },
  {
    code: 'zh-TW',
    name: '中文（繁體）',
    data: zh_TW,
    subsets: ['zh-TW', 'zh-HK'],
  },
  // {
  //   code: 'pt',
  //   name: 'Português',
  //   subsets: ['pt-BR', 'pt-PT'],
  // },
  // {
  //   code: 'es',
  //   name: 'Español',
  //   subsets: [
  //     'es-AR',
  //     'es-CO',
  //     'es-CR',
  //     'es-HN',
  //     'es-419',
  //     'es-US',
  //     'es-PE',
  //     'es-MX',
  //     'es-VE',
  //     'es-UY',
  //     'es-ES',
  //     'es-CL',
  //   ],
  // },
  // {
  //   code: 'fr',
  //   name: 'Français',
  //   subsets: ['fr-BE', 'fr-FR', 'fr-CA', 'fr-CH'],
  // },
  // {
  //   code: 'ru',
  //   name: 'Русский',
  //   subsets: [],
  // },
  // {
  //   code: 'de',
  //   name: 'Deutsch',
  //   subsets: ['de-AT', 'de-DE', 'de-LI', 'de-CH'],
  // },
  // {
  //   code: 'it',
  //   name: 'Italiano',
  //   subsets: ['it-CH', 'it-IT'],
  // },
  // {
  //   code: 'ja',
  //   name: '日本語',
  //   sortNum: 10,
  //   subsets: [],
  // },
  // {
  //   code: 'ko',
  //   name: '한국어',
  //   subsets: [],
  // },
  // {
  //   code: 'hi',
  //   name: 'हिन्दी',
  //   subsets: [],
  // },
  // {
  //   code: 'th',
  //   name: 'ไทย',
  //   subsets: [],
  // },
  // {
  //   code: 'vi',
  //   name: 'Tiếng Việt',
  //   subsets: [],
  // },
];
