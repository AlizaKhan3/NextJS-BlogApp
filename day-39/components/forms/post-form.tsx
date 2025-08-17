"use client"

import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { IPostForm } from "@/types"

const postSchema = Yup.object({
  title: Yup.string().required("Title is required").max(100, "Title must be less than 100 characters"),
  content: Yup.string().required("Content is required").min(50, "Content must be at least 50 characters"),
  tags: Yup.string(),
})

export default function PostForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const formik = useFormik<IPostForm>({
    initialValues: {
      title: "",
      content: "",
      tags: "",
    },
    validationSchema: postSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      setError("")

      try {
        const tagsArray = values.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)

        // TODO: Replace with actual API call
        // const response = await fetch("/api/articles", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     title: values.title,
        //     content: values.content,
        //     tags: tagsArray,
        //   }),
        // })
        // 
        // const data = await response.json()
        // 
        // if (!response.ok) {
        //   setError(data.error)
        //   return
        // }

        // For now, simulate successful submission
        console.log("Article data to submit:", {
          title: values.title,
          content: values.content,
          tags: tagsArray,
        })

        toast.success("Article published successfully!")
        router.push("/feed")
      } catch (err) {
        setError("Something went wrong. Please try again.")
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Article</CardTitle>
        <CardDescription>Share your thoughts with the community</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter your article title..."
              {...formik.getFieldProps("title")}
              className={formik.touched.title && formik.errors.title ? "border-destructive" : ""}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-sm text-destructive">{formik.errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your article content here..."
              rows={12}
              {...formik.getFieldProps("content")}
              className={formik.touched.content && formik.errors.content ? "border-destructive" : ""}
            />
            {formik.touched.content && formik.errors.content && (
              <p className="text-sm text-destructive">{formik.errors.content}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (optional)</Label>
            <Input
              id="tags"
              type="text"
              placeholder="javascript, react, web-development (comma separated)"
              {...formik.getFieldProps("tags")}
            />
            <p className="text-sm text-muted-foreground">Separate tags with commas</p>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Publishing..." : "Publish Article"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/feed")}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
