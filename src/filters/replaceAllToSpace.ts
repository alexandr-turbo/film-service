export default function replaceAllToSpace(value: string) {
  if (!value) return ''
  value = value.toString()
  return value.replace(/[^А-ЩЬЮЯҐЄІЇа-щьюяґєіїA-Za-z0-9+]+/gi, ' ')
}