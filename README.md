# SockVibes - Online Shop

**SockVibes** is a dynamic online shopping platform for a major U.S. brand with over 11 stores across the country. This project is a freelance contract.

**Contractor:** Sock Vibes Management - Miami, FL

## Tech Stack

- **Frontend:** [SvelteKit](https://kit.svelte.dev/)
- **Backend:** [Node.js](https://nodejs.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Payments:** [Stripe](https://stripe.com/)
- **Hosting:** [Supabase](https://supabase.com/), [Vercel](https://vercel.com/)
- **Libraries:** [Shadcn](https://shadcn.dev/), [Tailwind CSS](https://tailwindcss.com/)

## 🛒 How the Shop Works

- **Checkout Process:**
  - Items array is passed to Stripe for dynamic checkouts.
  - Stripe collects user shipping addresses, email, and phone numbers to handle product shipping.

## 🗃️ Database

- **PostgreSQL**:
  - Stores data related to products, inventory, transactions, and page content.
  - On page load, a function fetches necessary info. Pagination is implemented for a smoother experience.
- **Backend:** Node.js as server.
- **Storage Management:**
  - Built-in storage manager tracks item availability.

## UI Libraries

- **Shadcn Components:**
  - Provides reusable custom UI components.




