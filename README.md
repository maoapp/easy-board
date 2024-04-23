## Easy Board

App build on React, Next and Node

### Methodology

To tackle the exercise efficiently, I implemented a structured methodology focused on setting up the foundational components of the project. This encompassed delineating the core structure, crafting the architecture, and seamlessly integrating essential tools tailored for the client application.

Given the requirements of the position and the nature of the exercise, I opted for Next.js and Tailwind CSS, as they aligned well with the project's needs. For state management, I leveraged local state and React hooks. This decision stemmed from the project's scope, which only necessitated two screens and didn't warrant the overhead of larger state management libraries like Redux or Context.

To streamline HTTP requests, I utilized Axios and created an API service to centralize all network calls. This approach facilitates future enhancements, such as incorporating interceptors for implementing techniques like refresh tokens.

The deployment was handled by Vercel to take advantage of its seamless integration with Next.js, ensuring smooth and efficient deployment processes.

### Development Tasks Completed

- Project Setup: Establish project structure, config, dependencies.
- Create navBar, mock screens, layout and global styles
- Create auth feature UI and API logic
- Create board feature UI and API logic
- Deploy App

### Development Tasks Pending

- Implementing a robust state management solution will facilitate scalability for the application.
- Explore alternative methods for sharing tokens between services to enhance security and efficiency.
- Enhance the error feedback mechanism by displaying detailed error messages returned by the board service in the toast notifications.
- Enable the capability to rearrange board tasks within the same column and sort them based on the updated date for improved usability and organization.

### Note

Regrettably, due to the deadline constraints, I was unable to implement a branch strategy similar to that of the service project.

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
