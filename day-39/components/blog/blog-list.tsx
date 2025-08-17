"use client"

import { useState, useEffect } from "react"
import BlogCard from "./blog-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { IArticle, IPagination } from "@/types"
import { sampleArticles } from "@/sampleData"

export default function BlogList() {
  const [articles, setArticles] = useState<IArticle[]>([])
  const [pagination, setPagination] = useState<IPagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchArticles = async (page: number) => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/articles?page=${page}&limit=6`)
      // const data = await response.json()
      // setArticles(data.articles)
      // setPagination(data.pagination)
      
      // For now, using sample data
      setArticles(sampleArticles)
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalArticles: sampleArticles.length,
        hasNext: false,
        hasPrev: false
      })
    } catch (error) {
      console.error("Error fetching articles:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles(currentPage)
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
