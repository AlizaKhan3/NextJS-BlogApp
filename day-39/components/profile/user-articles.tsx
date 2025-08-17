"use client"

import { useState, useEffect } from "react"
import BlogCard from "@/components/blog/blog-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { IArticle, IPagination } from "@/types"
import { sampleUserArticles } from "@/sampleData"

export default function UserArticles() {
  const [articles, setArticles] = useState<IArticle[]>([])
  const [pagination, setPagination] = useState<IPagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchUserArticles = async (page: number) => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/profile?page=${page}&limit=6`)
      // const data = await response.json()
      // setArticles(data.articles)
      // setPagination(data.pagination)
      
      // For now, using sample data
      setArticles(sampleUserArticles)
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalArticles: sampleUserArticles.length,
        hasNext: false,
        hasPrev: false
      })
    } catch (error) {
      console.error("Error fetching user articles:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserArticles(currentPage)
  }, [currentPage])

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">You haven't published any articles yet.</p>
        <p className="text-muted-foreground mt-2">Start writing to see your articles here!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <BlogCard key={article._id} article={article} />
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={!pagination.hasPrev}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <Button variant="outline" onClick={() => setCurrentPage(currentPage + 1)} disabled={!pagination.hasNext}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
