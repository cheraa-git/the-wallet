export const numbToAbsMonetize = (number: number) => {
  return Math.abs(number).toLocaleString('ru-RU', { style: 'decimal', minimumFractionDigits: 2 })
}


