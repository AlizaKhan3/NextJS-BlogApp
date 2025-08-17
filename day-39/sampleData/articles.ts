import { IArticle } from "@/types"

export const sampleArticles: IArticle[] = [
  {
    _id: "1",
    title: "Getting Started with Next.js 14",
    content: "Next.js 14 introduces many new features including the App Router, Server Components, and improved performance...",
    tags: ["nextjs", "react", "web-development"],
    createdAt: "2024-01-15T10:00:00Z",
    author: {
      _id: "user1",
      name: "John Doe"
    }
  },
  {
    _id: "2",
    title: "Mastering TypeScript in 2024",
    content: "TypeScript has become the standard for modern web development. Let's explore the latest features and best practices...",
    tags: ["typescript", "javascript", "programming"],
    createdAt: "2024-01-14T15:30:00Z",
    author: {
      _id: "user2",
      name: "Jane Smith"
    }
  },
  {
    _id: "3",
    title: "Building Beautiful UIs with Tailwind CSS",
    content: "Tailwind CSS provides utility-first CSS framework that makes building modern user interfaces faster and more consistent...",
    tags: ["css", "tailwind", "ui-design"],
    createdAt: "2024-01-13T09:15:00Z",
    author: {
      _id: "user3",
      name: "Mike Johnson"
    }
  },
  {
    _id: "4",
    title: "The Future of Web Development",
    content: "As we move into 2024, web development continues to evolve with new technologies and approaches...",
    tags: ["web-development", "trends", "technology"],
    createdAt: "2024-01-12T14:20:00Z",
    author: {
      _id: "user1",
      name: "John Doe"
    }
  },
  {
    _id: "5",
    title: "Understanding React Server Components",
    content: "React Server Components are a new paradigm that allows you to build applications that span the server and client...",
    tags: ["react", "server-components", "nextjs"],
    createdAt: "2024-01-11T11:45:00Z",
    author: {
      _id: "user2",
      name: "Jane Smith"
    }
  },
  {
    _id: "6",
    title: "Database Design Best Practices",
    content: "Good database design is crucial for application performance and maintainability. Here are some key principles...",
    tags: ["database", "design", "best-practices"],
    createdAt: "2024-01-10T16:00:00Z",
    author: {
      _id: "user3",
      name: "Mike Johnson"
    }
  }
]

export const sampleUserArticles: IArticle[] = [
  {
    _id: "user1",
    title: "My First Blog Post",
    content: "This is my first attempt at blogging. I'm excited to share my thoughts and experiences...",
    tags: ["first-post", "blogging", "personal"],
    createdAt: "2024-01-15T10:00:00Z",
    author: {
      _id: "user1",
      name: "John Doe"
    }
  },
  {
    _id: "user2",
    title: "Learning React Hooks",
    content: "React Hooks have revolutionized how we write functional components. Here's what I learned...",
    tags: ["react", "hooks", "learning"],
    createdAt: "2024-01-14T15:30:00Z",
    author: {
      _id: "user1",
      name: "John Doe"
    }
  },
  {
    _id: "user3",
    title: "Building a Portfolio Website",
    content: "I recently built my portfolio website using Next.js and Tailwind CSS. Here's the process...",
    tags: ["portfolio", "nextjs", "tailwind"],
    createdAt: "2024-01-13T09:15:00Z",
    author: {
      _id: "user1",
      name: "John Doe"
    }
  }
]

export const sampleArticlesById: { [key: string]: IArticle } = {
  "1": {
    _id: "1",
    title: "Getting Started with Next.js 14",
    content: `Next.js 14 introduces many new features including the App Router, Server Components, and improved performance.

The App Router is a new paradigm that allows you to build applications that span the server and client. It provides a more intuitive way to organize your code and enables better performance through server-side rendering.

Server Components are React components that run on the server and can access backend resources directly. This eliminates the need for client-side data fetching and improves the user experience.

Performance improvements in Next.js 14 include faster builds, better caching strategies, and optimized bundle splitting. The framework now automatically optimizes your application for the best possible performance.

To get started with Next.js 14, you can create a new project using the create-next-app command with the latest version. The new App Router will be enabled by default, and you can start building your application using the new file-based routing system.`,
    tags: ["nextjs", "react", "web-development"],
    createdAt: "2024-01-15T10:00:00Z",
    author: {
      _id: "user1",
      name: "John Doe",
      email: "john.doe@example.com"
    }
  },
  "2": {
    _id: "2",
    title: "Mastering TypeScript in 2024",
    content: `TypeScript has become the standard for modern web development. Let's explore the latest features and best practices.

TypeScript 5.0 introduced several new features including const type parameters, multiple config files, and improved type inference. These features make it easier to write type-safe code and improve developer productivity.

Best practices for TypeScript include using strict mode, leveraging utility types, and writing comprehensive type definitions. Strict mode helps catch common errors at compile time, while utility types provide reusable type transformations.

Type inference in TypeScript has improved significantly, reducing the need for explicit type annotations in many cases. The compiler can now infer types from context, making your code cleaner and more maintainable.

When working with TypeScript, it's important to balance type safety with developer experience. Over-typing can make code harder to read, while under-typing can lead to runtime errors.`,
    tags: ["typescript", "javascript", "programming"],
    createdAt: "2024-01-14T15:30:00Z",
    author: {
      _id: "user2",
      name: "Jane Smith",
      email: "jane.smith@example.com"
    }
  },
  "3": {
    _id: "3",
    title: "Building Beautiful UIs with Tailwind CSS",
    content: `Tailwind CSS provides utility-first CSS framework that makes building modern user interfaces faster and more consistent.

The utility-first approach means you apply pre-defined classes directly in your HTML, eliminating the need to write custom CSS. This approach promotes consistency and makes it easier to maintain design systems.

Tailwind CSS includes a comprehensive set of utility classes for spacing, typography, colors, and layout. These classes are designed to work together seamlessly, allowing you to build complex layouts quickly.

One of the key benefits of Tailwind CSS is its responsive design utilities. You can easily create responsive layouts using breakpoint prefixes like sm:, md:, and lg:.

The framework also provides excellent support for dark mode, custom animations, and state variants like hover and focus. This makes it easy to create interactive and engaging user interfaces.`,
    tags: ["css", "tailwind", "ui-design"],
    createdAt: "2024-01-13T09:15:00Z",
    author: {
      _id: "user3",
      name: "Mike Johnson",
      email: "mike.johnson@example.com"
    }
  }
}
