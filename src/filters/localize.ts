import uk from '@/locales/uk.json'
import en from '@/locales/en.json'
import store from '@/store'

const locales: any = {
  'uk-UA': uk,
  'en-US': en
}

export default function localizeFilter(key: string) {
  const locale: string = store.getters.locale || 'en-US'
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}
