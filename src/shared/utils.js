import dayjs from 'dayjs'

export const sizeFormat = (size) => {
  const sizes = size / 1024
  if (sizes >= 1) {
    return `${sizes.toFixed(2)} MB`
  } else {
    return `${size} KB`
  }
}

export const isBetween = (date, dateStart, dateEnd, precision, inclusivity) => {
  let result =
    (dayjs(date).isSame(dateStart, precision) || dayjs(date).isAfter(dateStart, precision)) &&
    (dayjs(date).isSame(dateEnd, precision) || dayjs(date).isBefore(dateEnd, precision))
  if (!result && (inclusivity || inclusivity !== '()')) {
    if (inclusivity === '[)') {
      result = dayjs(date).isSame(dateStart, precision)
    } else if (inclusivity === '(]') {
      result = dayjs(date).isSame(dateEnd, precision)
    } else {
      result = dayjs(date).isSame(dateStart, precision) && dayjs(date).isSame(dateEnd, precision)
    }
  }
  return result
}
