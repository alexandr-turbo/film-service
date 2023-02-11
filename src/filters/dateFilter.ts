import store from '@/store'
export default function dateFilter(value, format = 'date') {
  let loc = store.state.locale.locale || 'en-US'
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
  return new Intl.DateTimeFormat(loc, options).format(new Date(value))
}