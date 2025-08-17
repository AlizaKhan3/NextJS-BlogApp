export interface IUser {
  _id: string
  name: string
  email: string
}

export interface IUserProfile {
  _id: string
  name: string
  email: string
  createdAt: string
}

export interface IUserStats {
  totalArticles: number
}
