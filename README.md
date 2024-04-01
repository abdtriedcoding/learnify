# Learnify: Empowering education on an intuitive platform 🎓, seamlessly sign up, purchase courses, and sell your content 📚🚀. User-friendly dashboards for tracking progress and income, making learning and teaching a breeze! 💻💰

![Copy of Copy of Copy of Copy of Fullstack Twitter Clone (9)](https://files.edgestore.dev/j26azsoyqh7n72m2/myPublicImages/_public/9577e193-7ee1-47d8-aa8c-1afae71681c3.png)


This is a repository for Build an LMS Platform: Next.js 13, React, Stripe, Mux, Prisma, Tailwind, MySQL, Supabase, Uploadthings, etc.

Key Features:

- Browse & Filter Courses 📚
- Purchase Courses using Stripe 💳
- Mark Chapters as Completed or Uncompleted ✅❌
- Progress Calculation of each Course 📊
- Student Dashboard 🎓
- Teacher mode 👩‍🏫👨‍🏫
- Create new Courses 🆕
- Create new Chapters 📝
- Easily reorder chapter position with drag n’ drop 🔄
- Upload thumbnails, attachments and videos using UploadThing 🖼️📎📹
- React Video player using Mux ▶️
- Rich text editor for chapter description ✍️
- Authentication using Clerk 🔐
- ORM using Prisma 🛠️
- MySQL database using Supabase 🌐

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/abdtriedcoding/learnify.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

NEXT_PUBLIC_APP_URL=

DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Setup Prisma

Add MySQL Database (I used Supabase)

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
