import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


export const numbToAbsMonetize = (number: number) => {
  return Math.abs(number).toLocaleString('ru-RU', { style: 'decimal', minimumFractionDigits: 2 })
}

export const formatDateRelative = (date: string) => {
  const THREE_HOURS_IN_MS = 1000 * 60 * 60 * 3
  const diff = dayjs().diff(dayjs(date))
  if (diff < THREE_HOURS_IN_MS) {
    dayjs.extend(relativeTime)
    return dayjs(dayjs(date)).fromNow()
  } else {
    return dayjs(date).format('DD.MM.YY в HH:mm')
  }
}
