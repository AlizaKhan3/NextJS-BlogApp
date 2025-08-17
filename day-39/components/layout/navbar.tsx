"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PlusCircle, User, Settings, LogOut, BookOpen } from "lucide-react"
import { toast } from "sonner"
import { IUser } from "@/types"

interface NavbarProps {
  user?: IUser
}

export default function Navbar({ user }: NavbarProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch("/api/auth/logout", {
      //   method: "POST",
      // })
      // 
      // if (response.ok) {
      //   toast.success("Logged out successfully!")
      //   router.push("/")
      // } else {
      //   toast.error("Error logging out")
      // }

      // For now, simulate successful logout
      console.log("Logout attempt")
      toast.success("Logged out successfully!")
      router.push("/")
    } catch (error) {
      toast.error("Error logging out")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/feed" className="flex items-center gap-2 font-bold text-xl">
              <BookOpen className="h-6 w-6" />
              BlogApp
            </Link>

            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/feed"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Feed
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button asChild size="sm">
              <Link href="/create">
                <PlusCircle className="h-4 w-4 mr-2" />
                Write
              </Link>
            </Button>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {isLoading ? "Logging out..." : "Log out"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
