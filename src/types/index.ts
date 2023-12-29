export interface Currency {
  key: string
  name: string
  icon: string
}

export interface Tax {
  name: string
  value: number
}

export interface Configuration {
  selectedCurrency: Currency
  taxes: Tax[]
  pageMode: PageMode
  timeout?: ReturnType<typeof setTimeout>
}

export interface CurrencyData {
  ask: number
  bid: number
  code: string
  codein: string
  create_date: Date
  high: number
  low: number
  name: string
  pctChange: number
  timestamp: number
  varBid: number
}

export type PageMode = 'chart' | 'simulate' | 'alerts' | 'more'
