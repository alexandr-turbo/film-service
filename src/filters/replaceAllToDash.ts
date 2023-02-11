export default function replaceAllToDash(value) {
  if (!value) return ''
  value = value.toString()
  return value.replace(/[^a-z0-9+]+/gi, '-')
}