# TBC FINAL APP

This is a Next.js application that includes a store, tours, and a blog. Users can add, delete, and edit products in the store as well as posts in the blog.

## Features

- **Store**: Manage products (add, delete, edit).
- **Tours**: Browse and book tours.
- **Blog**: Manage posts (add, delete, edit).
- **Admin**: Manage everything (add, delete, edit).

## Technologies Used

- Next.js
- Vercel Postgres (for database)
- Vercel Blob (for file storage)
- Auth0 (for authentication)
- Stripe (for handling payments)

## Prerequisites

- Vercel account and project
- Auth0 account and application
- Stripe account

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ShalvaMishvelidze/tbc-react-course-project
   cd tbc-react-course-project
   ```

2. Install dependencies:

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory of your project and add vercel and auth0 variables together with:

   ```plaintext
       NEXT_PUBLIC_URL="http://localhost:3000/"
   ```

4. Set up Vercel Postgres:

   - Go to the Vercel dashboard and create a new Postgres database.
   - Obtain the connection URL from the Vercel dashboard.

5. Set up Vercel Blob:

   - Go to the Vercel dashboard and create a new Blob storage.
   - Obtain the API key and Blob URL from the Vercel dashboard.

6. Set up Auth0:

   - Go to the Auth0 dashboard and create a new application.
   - Set the application type to "Single Page Application".
   - Configure the callback URL to match your application.

7. Set up Stripe:

   - Go to the Stripe dashboard and create a new project.
   - Obtain your public and secret keys from the dashboard.

## Usage

1. Start the development server:

   Using npm:

   ```bash
   npm run dev
   ```

   Using yarn:

   ```bash
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `/components`: Reusable React components
- `/app`: Next.js pages
- `/app/api`: Next.js api routes
  - `/store`: Store-related pages
  - `/tours`: Tours-related pages
  - `/blog`: Blog-related pages
- `/sass`: Global and component-specific styles
- `/utils`: Utility functions and helpers

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## Contact

For any inquiries, please contact [shalva.mishvelidze111@gmail.com].
