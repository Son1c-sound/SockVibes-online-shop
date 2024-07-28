import Stripe from "stripe";
import type { RequestHandler } from "@sveltejs/kit";
import type { CartItem } from "../../../app";
import { env } from "$env/dynamic/private";
import supabase from "$lib/db";
import type { Item } from "../../types";

const stripeSecretKey: any = env.STRIPE_API;

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-06-20",
});

const successUrl = "http://localhost:5173/Success";
const cancelUrl = "http://localhost:5173/Canceled";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const cartItems: CartItem[] = data.items;

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "USD", // Update currency if needed
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(parseFloat(item.price) * 100),
      },
      quantity: item.quantity,
    }));
  

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["US"], // Update allowed countries if needed
      },
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      phone_number_collection: {
        enabled: true,  // Update phone number collection behavior if needed
      },
    });
    // Call insertSoldItems function after successful session creation


    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create checkout session." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};


// You don't need to call getAvailableStock here
// This function is for a separate purpose (e.g., displaying stock on product page)

