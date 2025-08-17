export interface ILoginForm {
  email: string
  password: string
}

export interface ISignupForm {
  name: string
  email: string
  password: string
}

export interface IPostForm {
  title: string
  content: string
  tags: string
}

export interface ISettingsForm {
  name: string
  email: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
