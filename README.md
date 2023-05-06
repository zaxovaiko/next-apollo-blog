# Apollo-blog

The project was rewritten with Next.js and GraphQL.

> Fill free to contribute even small things, I will be very happy with your help.*

## Required tools

1. Node.js >= 16
2. `npm` >= 8
3. MongoDB >= 5.0

## Installation

1. Clone or fork this repository.
2. Create or ask someone for `.env` file which contains Firebase keys and other stuff.
3. Run `npm install`
4. Run `npm run dev`

## Deployment

The app is deployed on Vercel automatically after pushing commits to `dev` branch. You can find the app under [this link](https://apollo-blog.vercel.app/).

The backend API can be found under `http://localhost:3000/api/graphql` endpoint.

## Project structure and Business logic

This project is using `schema.ts`, which contains definition of GraphQL schema and `prisma/schema.prisma` for defining Prisma database schema.

From the business perspective this project is pretty much obvious. User can create draft posts which he can publish later. Also, everybody can comments posts, like them and share them on social media. There is also a search bar which allows you to search posts by title or content. You can also filter posts by tags.

Project is currently under development, so there is a lot of things to do.

> Also, there is no strict business rules which we are going to achieve, so fill free to propose your ideas and visions.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

P.S. Sometimes I'm asking myself, why did I choose Next.js alongside with GraphQL for this project? Isn't it easier to use `getServerSideProps` and etc with Prisma helpers? Idk. I just wanted to try something new.
