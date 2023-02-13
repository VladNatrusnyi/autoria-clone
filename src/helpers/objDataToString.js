
export const objDataToString = (value) => {

  let obj = value

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = Number(obj[key]);
    }
  }

  return obj
}