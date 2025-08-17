import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import { IArticle } from "@/types"

interface BlogCardProps {
  article: IArticle
}

export default function BlogCard({ article }: BlogCardProps) {
  const excerpt = article.content.length > 150 ? article.content.substring(0, 150) + "..." : article.content

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <User className="h-4 w-4" />
          <span>{article.author.name}</span>
          <Calendar className="h-4 w-4 ml-2" />
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        <CardTitle className="line-clamp-2">
          <Link href={`/blog/${article._id}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">{excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
