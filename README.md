This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Run the project

1. Install dependencies
   ```bash
   yarn
   ```
2. Create `.env.local` and copy `.env.example` to `.env.local`

   ```text
    POSTGRES_URL=postgres://postgres:postgres@localhost:5432/leftover

    PUSHER_ID=
    NEXT_PUBLIC_PUSHER_KEY=
    PUSHER_SECRET=
    NEXT_PUBLIC_PUSHER_CLUSTER=

    AUTH_SECRET=
    AUTH_GITHUB_ID=
    AUTH_GITHUB_SECRET=


    NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. Start the database
   ```bash
   docker compose up -d
   ```
4. Run migrations
   ```bash
   yarn migrate
   ```
5. Start the development server
   ```bash
   yarn dev
   ```
6. Open http://localhost:3000 in your browser
7. Test account, no need to sign up, use this to login
   ```text
   帳號：test123
   密碼：test123
   ```

# 組員分工

李宇軒：後端，DB schema、auth、圖片儲存

吳郁心：後端，API、pusher、少數前端（預訂功能）

劉倍嘉：前端、少數API（取得使用者名稱，以及根據使用者、餐點或餐點類型取得餐點資訊）
