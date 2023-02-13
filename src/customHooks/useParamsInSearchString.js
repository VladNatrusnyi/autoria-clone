import {useSearchParams} from "react-router-dom";

export const useParamsInSearchString = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const objOfParams = searchParams.toString().split('&').map(item => {
    const arr = item.split('=')
    return {[arr[0]]: arr[1]}
  }).reduce((total, amount) => ({...total, ...amount}));

  return {
    objOfParams: objOfParams,
    setParamsInSearch: (paramsForChange) => setSearchParams(paramsForChange)

  }
}