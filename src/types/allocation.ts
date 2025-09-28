export type Allocation = {
  id: number
  title: string
  start?: string
  end?: string
  category: string
  financed?: boolean
  progress?: {
    current: number
    total: number
  }
  amount: number
  totalAmount?: number
  lastUpdate?: string
}
