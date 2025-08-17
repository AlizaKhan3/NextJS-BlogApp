"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Navbar from "@/components/layout/navbar"
import { Toaster } from "sonner"
import { IUser } from "@/types"
import { sampleUserProfile } from "@/sampleData"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch("/api/profile")
        // if (response.ok) {
        //   const data = await response.json()
        //   setUser(data.user)
        // }
        
        // For now, using sample data
        setUser(sampleUserProfile)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user || undefined} />
      <main>{children}</main>
      <Toaster />
    </div>
  )
}
