// @flow
// Flags
import viFlag from 'assets/images/flags/vi.svg';
import enFlag from 'assets/images/flags/en.svg';
// Antd locale files
import viVN from 'antd/lib/locale-provider/vi_VN';
import enUS from 'antd/lib/locale-provider/en_US';
import vi from './vi';
import en from './en';

const languages = {
  vi: { translations: vi.translations, antLocale: viVN },
  en: { translations: en.translations, antLocale: enUS },
};

const regions = {
  vi: {
    key: 'vi',
    name: vi.name,
    icon: vi.icon,
    flag: viFlag,
  },
  en: {
    key: 'en',
    name: en.name,
    icon: en.icon,
    flag: enFlag,
  },
};
export { languages, regions };
