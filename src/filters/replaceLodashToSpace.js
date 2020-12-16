export default function replaceDash(value) {
  if (!value) return ''
  value = value.toString()
  return value.replace(/_/g, ' ')
}