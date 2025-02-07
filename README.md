# Next.js Hackathon 2025 Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/DHANESHJOSHI/hackathon2025.git
cd hackathon2025
```

Then, install the dependencies:

```bash
npm install  # or yarn install, pnpm install, bun install
```

Run the development server:

```bash
npm run dev  # or yarn dev, pnpm dev, bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `pages/` - Contains all Next.js pages, including `index.js` (home page) and API routes inside `api/`.
- `components/` - Contains reusable React components.
- `styles/` - Contains global styles and CSS modules.
- `public/` - Static assets such as images and icons.
- `next.config.js` - Next.js configuration file.
- `.env.local` - Environment variables (create this file for API keys and sensitive data).

## API Routes

API routes are located in `pages/api/` and can be accessed via:

```
http://localhost:3000/api/hello
```

You can modify `pages/api/hello.js` to update the API response.

## Deployment

To deploy this project, you can use [Vercel](https://vercel.com/) (recommended) or another hosting provider:

```bash
npm run build
npm run start
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Contribute and explore the Next.js ecosystem.
