<div align="center">
    <h1 align="center">Learnify</h1>
    <h5>Empowering education on an intuitive platform 🎓, seamlessly sign up, purchase courses, and sell your content 📚🚀. User-friendly dashboards for tracking progress and income, making learning and teaching a breeze.</h5>
</div>

<div align="center">
  <a href="https://learnifyy.vercel.app">learnifyy.vercel.app</a>
</div>
<br/>

![Thumbnail](/public/thumbnail.png)

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
- PostgreSQL database using Supabase 🌐

### Prerequisites

**Node version 20.x.x**

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
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

NEXT_PUBLIC_APP_URL=

DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Setup Prisma

Add Database (I used Supabase)

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
