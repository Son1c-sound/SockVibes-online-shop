import Stripe from "stripe";
import type { RequestHandler } from "@sveltejs/kit";
import type { CartItem } from '../../../app'; 
import { env } from "$env/dynamic/private";
import supabase from "$lib/db";
import type { Item } from '../../types'
import { decrement } from "../../categories/men/store";



const stripeSecretKey:any = env.STRIPE_API;

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20' 
});

const successUrl = 'http://localhost:5173/Success';
const cancelUrl = 'http://localhost:5173/Canceled';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();
        const cartItems: CartItem[] = data.items;

        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.name,
                    images: [item.image]
                },
                unit_amount: Math.round(parseFloat(item.price) * 100)
            },
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            shipping_address_collection: {
                allowed_countries: ["US"] 
            },
            mode: "payment",
            success_url: successUrl,
            cancel_url: cancelUrl,
            phone_number_collection: {
                enabled: true,
            },
        });
        await loadItems()
        return new Response(JSON.stringify({ url: session.url }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return new Response(JSON.stringify({ error: 'Failed to create checkout session.' }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

let cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]'); // Or however you store/retrieve your cart items
let items: Item[] = [];
let errorMessage: string = '';
let FindDecrement = [];

async function loadItems() {
    const { data, error } = await supabase.from("allitems").select("*");

    if (error) {
        errorMessage = `Error loading items: ${error.message}`;
        console.error(error);
    } else {
        items = data;

        // Find items that need to be decremented based on cartItems
        FindDecrement = items.filter(item => 
            cartItems.some(cartItem => cartItem.id === item.id && item.storage !== null)
        );

        if (FindDecrement.length > 0) {
            // Create update promises based on quantities from cartItems
            const updates = FindDecrement.map(item => {
                // Find the corresponding cart item to get the quantity
                const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
                if (cartItem) {
                    return supabase
                        .from('allitems')
                        .update({ storage: item.storage - cartItem.quantity }) // Decrement by the quantity in cart
                        .eq('id', item.id);
                }
            }).filter(promise => promise !== undefined); // Remove any undefined entries

            // Execute and handle the results
            const results = await Promise.all(updates);
            const errors = results.filter(result => result.error);

            if (errors.length > 0) {
                errorMessage = `Error updating storage: ${errors.map(e => e.error.message).join(', ')}`;
                console.error(errorMessage);
            } else {
                console.log('Storage values decremented successfully');
                // You can redirect to success URL or handle success here
                // successUrl
            }
        }
    }
}