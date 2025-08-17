import type React from "react"
import { Toaster } from "sonner"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
      <Toaster />
    </div>
  )
}
