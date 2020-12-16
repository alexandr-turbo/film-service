export default function replaceDashToSpace(value) {
  if (!value) return ''
  value = value.toString()
  return value.replace(/-/g, ' ')
}