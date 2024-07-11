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

**You should have Nodejs and Bun installed on your system**

### Cloning the repository

```shell
git clone https://github.com/abdtriedcoding/learnify.git
```

### Install packages

```shell
bun i
```

### Setup .env file taking refrence from .env.example file

### Setup Prisma

Add Database (I used Supabase)

```shell
bunx prisma generate
bunx prisma db push

```

### Start the app

```shell
bun run dev
```
