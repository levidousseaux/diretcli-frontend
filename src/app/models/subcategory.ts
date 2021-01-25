import { Recomendation } from "./recomendation.model"

export class Subcategory {
  name: string
  recomendations: Recomendation[]

  constructor (recomendation: Recomendation) {
    this.name = recomendation.subcategory
    this.recomendations = [ recomendation ]
  }
}
