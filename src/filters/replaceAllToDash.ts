export default function replaceAllToDash(value: string) {
  if (!value) return ''
  value = value.toString()
  return value.replace(/[^a-z0-9+]+/gi, '-')
}