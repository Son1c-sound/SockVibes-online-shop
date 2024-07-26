# SockVibes - Online Shop

**SockVibes**, a dynamic online shopping platform for a major U.S. brand with over 11 stores across the country. 
(Freelance project)

Contractor: sock vibes management

## 🚀 Tech Stack

- **Frontend:** [SvelteKit](https://kit.svelte.dev/)
- **Backend:** [Node.js](https://nodejs.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) 
- **Payments:** [Stripe](https://stripe.com/)
- **Host** [Supabase](https://supabase.com/) [Vercel](https://vercel.com/)
- **Libraries:** [Shadcn](https://shadcn.dev/), [Tailwind CSS](https://tailwindcss.com/)

## 🛒 How the Shop Works

**SockVibes** operates dynamically, meaning all shop data is loaded from the database. This flexibility allows clients to:

- **Adjust**: Easily modify product details, including prices, descriptions, and statuses through a custom-built admin interface.
- **Add/Remove Products**: Manage the inventory without technical constraints.

**Shopping Experience:**

- **No Login Required:** Users can add items to their cart without needing to log in. Cart items are stored locally in the browser’s localStorage.
- **Dynamic Checkout:** The cart details, including item images, quantities, and prices, are passed to Stripe for a streamlined checkout process.

## 💳 Stripe Integration

Stripe handles the checkout process by:

- Collecting user shipping addresses, email, and phone numbers.
- Notifying the client with details of the order, including what items were purchased and where they are to be shipped.

## 🗃️ Database

- **PostgreSQL**:  stores all data related to products, inventory, and transactions.
- **Node.js API**: Facilitates communication between the frontend and the PostgreSQL database.

## 🎨 UI/UX

- **Shadcn Components:** Utilized for creating reusable and customizable UI components.
- **Tailwind CSS:** Provides a responsive and modern design framework, ensuring a beautiful and consistent look across the site.

## 📈 Key Features

- **Dynamic Product Management**: Update products in real-time without code changes.
- **Seamless Checkout**: Quick and easy checkout with Stripe integration.
- **Local Storage Cart**: Persistent cart functionality without user login.


