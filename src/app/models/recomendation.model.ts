export class Recomendation {
  id: number
  id_disease: number
  category: string
  subcategory: string
  sequence: number
  title: string
  value: string

  constructor(id_disease?: number, category?: string, subcategory?: string, sequence?: number, title?: string, value?: string) {
    this.id_disease = id_disease
    this.category = category
    this.subcategory = subcategory
    this.sequence = sequence
    this.title = title
    this.value = value
  }
}
