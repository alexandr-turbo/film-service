// import store from '@/store'
let loc = localStorage.getItem('locale') || 'en-US'
export default function dateFilter(value, format = 'date') {
  const options = {}

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

  // const locale = store.getters.info.locale || 'ukr-UA'
  // return new Intl.DateTimeFormat(locale, options).format(new Date(value))
  return new Intl.DateTimeFormat(loc, options).format(new Date(value))
}