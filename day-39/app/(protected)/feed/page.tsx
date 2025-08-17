import BlogList from "@/components/blog/blog-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function FeedPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Latest Articles</h1>
          <p className="text-muted-foreground mt-2">Discover the latest posts from our community</p>
        </div>
        <Button asChild>
          <Link href="/create">
            <PlusCircle className="h-4 w-4 mr-2" />
            Write Article
          </Link>
        </Button>
      </div>

      <BlogList />
    </div>
  )
}
