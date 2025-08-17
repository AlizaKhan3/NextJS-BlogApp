"use client"

import { useState, useEffect } from "react"
import UserArticles from "@/components/profile/user-articles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { PlusCircle, Settings, User } from "lucide-react"
import { IUserProfile, IUserStats } from "@/types"
import { sampleUserProfile, sampleUserStats } from "@/sampleData"

export default function ProfilePage() {
  const [user, setUser] = useState<IUserProfile | null>(null)
  const [stats, setStats] = useState<IUserStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch("/api/profile")
        // const data = await response.json()
        // if (response.ok) {
        //   setUser(data.user)
        //   setStats({ totalArticles: data.pagination.totalArticles })
        // }
        
        // For now, using sample data
        setUser(sampleUserProfile)
        setStats(sampleUserStats)
      } catch (error) {
        console.error("Error fetching profile data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [])

  if (loading) {
    return <div className="container mx-auto px-4 py-8 animate-pulse h-96 bg-muted rounded-lg" />
  }

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Error loading profile</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
            <Button asChild>
              <Link href="/create">
                <PlusCircle className="h-4 w-4 mr-2" />
                Write Article
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>Your blogging activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.totalArticles}</div>
                  <div className="text-sm text-muted-foreground">Articles Published</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Total Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Comments</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* User Articles */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Articles</h2>
          <UserArticles />
        </div>
      </div>
    </div>
  )
}
