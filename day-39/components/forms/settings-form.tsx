"use client"

import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { ISettingsForm, IUser } from "@/types"
import { sampleUserProfile } from "@/sampleData"

const settingsSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  currentPassword: Yup.string().when("newPassword", {
    is: (newPassword: string) => newPassword && newPassword.length > 0,
    then: (schema) => schema.required("Current password is required when changing password"),
    otherwise: (schema) => schema,
  }),
  newPassword: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string().when("newPassword", {
    is: (newPassword: string) => newPassword && newPassword.length > 0,
    then: (schema) =>
      schema.required("Please confirm your new password").oneOf([Yup.ref("newPassword")], "Passwords must match"),
    otherwise: (schema) => schema,
  }),
})

export default function SettingsForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState<IUser | null>(null)

  const formik = useFormik<ISettingsForm>({
    initialValues: {
      name: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: settingsSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      setError("")

      try {
        const updateData: any = {
          name: values.name,
          email: values.email,
        }

        if (values.newPassword) {
          updateData.currentPassword = values.currentPassword
          updateData.newPassword = values.newPassword
        }

        // TODO: Replace with actual API call
        // const response = await fetch("/api/profile", {
        //   method: "PUT",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(updateData),
        // })
        // 
        // const data = await response.json()
        // 
        // if (!response.ok) {
        //   setError(data.error)
        //   return
        // }

        // For now, simulate successful update
        console.log("Settings update data:", updateData)
        toast.success("Settings updated successfully!")

        // Reset password fields
        formik.setFieldValue("currentPassword", "")
        formik.setFieldValue("newPassword", "")
        formik.setFieldValue("confirmPassword", "")
      } catch (err) {
        setError("Something went wrong. Please try again.")
      } finally {
        setIsLoading(false)
      }
    },
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch("/api/profile")
        // const data = await response.json()
        // if (response.ok) {
        //   setUser(data.user)
        //   formik.setValues({
        //     name: data.user.name,
        //     email: data.user.email,
        //     currentPassword: "",
        //     newPassword: "",
        //     confirmPassword: "",
        //   })
        // }
        
        // For now, using sample data
        setUser(sampleUserProfile)
        formik.setValues({
          name: sampleUserProfile.name,
          email: sampleUserProfile.email,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  if (!user) {
    return <div className="animate-pulse h-96 bg-muted rounded-lg" />
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Update your account information and password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Profile Information</h3>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                  className={formik.touched.name && formik.errors.name ? "border-destructive" : ""}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-destructive">{formik.errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  className={formik.touched.email && formik.errors.email ? "border-destructive" : ""}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-destructive">{formik.errors.email}</p>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Change Password</h3>
              <p className="text-sm text-muted-foreground">Leave blank to keep your current password</p>

              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  {...formik.getFieldProps("currentPassword")}
                  className={
                    formik.touched.currentPassword && formik.errors.currentPassword ? "border-destructive" : ""
                  }
                />
                {formik.touched.currentPassword && formik.errors.currentPassword && (
                  <p className="text-sm text-destructive">{formik.errors.currentPassword}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  {...formik.getFieldProps("newPassword")}
                  className={formik.touched.newPassword && formik.errors.newPassword ? "border-destructive" : ""}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="text-sm text-destructive">{formik.errors.newPassword}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...formik.getFieldProps("confirmPassword")}
                  className={
                    formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-destructive" : ""
                  }
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-sm text-destructive">{formik.errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Settings"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
