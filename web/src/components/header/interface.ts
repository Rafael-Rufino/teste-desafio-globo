export interface IHighlight {
  id: string
  title: string
  url: string
  logo: string
  queries: { value: string }[]
}

export interface ISuggestion {
  value: string
}
