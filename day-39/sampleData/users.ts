import { IUser, IUserProfile } from "@/types"

export const sampleUsers: IUser[] = [
  {
    _id: "user1",
    name: "John Doe",
    email: "john.doe@example.com"
  },
  {
    _id: "user2", 
    name: "Jane Smith",
    email: "jane.smith@example.com"
  },
  {
    _id: "user3",
    name: "Mike Johnson", 
    email: "mike.johnson@example.com"
  }
]

export const sampleUserProfile: IUserProfile = {
  _id: "user1",
  name: "John Doe",
  email: "john.doe@example.com",
  createdAt: "2024-01-01T00:00:00Z"
}

export const sampleUserStats = {
  totalArticles: 3
}
