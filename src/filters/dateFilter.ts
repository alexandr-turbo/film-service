import store from '@/store'
export default function dateFilter(value: Date, format = 'date') {
  let { locale } = store.state.locale || 'en-US'
  const options: Intl.DateTimeFormatOptions | undefined = {}
  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
  }
  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }
  return new Intl.DateTimeFormat(locale, options).format(new Date(value))
}