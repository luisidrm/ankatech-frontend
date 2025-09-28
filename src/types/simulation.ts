export type SimulationVersion = {
  date: string
  patrimonio: number
  retirementAge: number
  version: number
}

export type Simulation = {
  id: string
  title: string
  color?: string 
  versions?: SimulationVersion[]
}
