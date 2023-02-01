export const moneyFormatter = (currency, value) => {
  const moneyFormat = new Intl.NumberFormat("ru", {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  })

  return moneyFormat.format(value)
}
