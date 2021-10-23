export type TApiParams = {
  method: 'POST' | 'GET',
  params?: TUrlParams
}

export type TUrlParams = {
  [key: string]: string
}