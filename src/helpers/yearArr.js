export const yearArr = [...Array(124)]
  .map((_,index) => new Date().getFullYear() - index)
  .map(item => ({label: item.toString(), value: item.toString()}))
