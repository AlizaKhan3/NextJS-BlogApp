export interface IArticle {
  _id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  author: {
    _id: string
    name: string
    email?: string
  }
}

export interface IPagination {
  currentPage: number
  totalPages: number
  totalArticles: number
  hasNext: boolean
  hasPrev: boolean
}
