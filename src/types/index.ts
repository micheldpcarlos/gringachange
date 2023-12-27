export interface Currency {
  key: string
  name: string
  icon: string
}

export interface Configuration {
  selectedCurrency: Currency
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
