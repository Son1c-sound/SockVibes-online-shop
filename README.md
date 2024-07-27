# SockVibes - Online Shop

**SockVibes**, a dynamic online shopping platform for a major U.S. brand with over 11 stores across the country. 
(Freelance project)

Contractor: sock vibes management - miami,fl

## 🚀 Tech Stack

- **Frontend:** [SvelteKit](https://kit.svelte.dev/)
- **Backend:** [Node.js](https://nodejs.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) 
- **Payments:** [Stripe](https://stripe.com/)
- **Host** [Supabase](https://supabase.com/) [Vercel](https://vercel.com/)
- **Libraries:** [Shadcn](https://shadcn.dev/), [Tailwind CSS](https://tailwindcss.com/)

## 🛒 How the Shop Works

## 💳 Stripe Integration

Stripe handles the checkout process by:

- items array is passed to stripe in which cart items are stored and passed to stripe allows dynamic checkouts
- Stripe Collecting user shipping addresses, email, and phone numbers which helps in shipping the product.

## 🗃️ Database

- **PostgreSQL**:  stores all data related to products, inventory, transactions and any data that is loaded on pages.
- Upon entering to web load function is initialized which fetches all the necessary info , panignation implemented for smoother experience.
- **Node.js as server**

##libraries on UI
- **Shadcn Components:** 

## Usage
You can clone code npm install , npm run dev and run it locally, dont forget to add your en variables of stripe api and supabase url with apikey, this way u can redsign code as you want.
