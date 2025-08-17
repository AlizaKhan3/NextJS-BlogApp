import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import type { Metadata } from "next"
import { IArticle } from "@/types"
import { sampleArticlesById } from "@/sampleData"

async function getArticle(id: string): Promise<IArticle | null> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/articles/${id}`, {
    //   cache: "no-store",
    // })
    // 
    // if (!response.ok) {
    //   return null
    // }
    // 
    // const data = await response.json()
    // return data.article

    // For now, using sample data
    return sampleArticlesById[id] || null
  } catch (error) {
    console.error("Error fetching article:", error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = await getArticle(params.id)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: article.title,
    description: article.content.substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 160),
      type: "article",
      authors: [article.author.name],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id)

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <CardTitle className="text-3xl md:text-4xl leading-tight">{article.title}</CardTitle>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <CardContent>
            <div className="prose prose-gray max-w-none">
              {article.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </article>
    </div>
  )
}
