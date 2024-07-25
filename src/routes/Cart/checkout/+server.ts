import Stripe from "stripe";
import type { RequestHandler } from "@sveltejs/kit";
import type { CartItem } from '../../../app'; 
import { env } from "$env/dynamic/private";
import supabase from "$lib/db";
import type { Item } from '../../types';

const stripeSecretKey: any = env.STRIPE_API;
const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20' 
});

const successUrl = 'http://localhost:5173/Success';
const cancelUrl = 'http://localhost:5173/Canceled';

export const POST: RequestHandler = async ({ request }) => {
    try {
        // Parse request body
        const data = await request.json();
        const cartItems: CartItem[] = data.items;
        const quantities: Record<string, number> = data.quantities; // Mapping of item IDs to quantities

        if (!cartItems || cartItems.length === 0) {
            return new Response(JSON.stringify({ error: 'No items in cart' }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Create Stripe checkout session
        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.name,
                    images: [item.image]
                },
                unit_amount: Math.round(parseFloat(item.price) * 100)
            },
            quantity: quantities[item.id] || item.quantity // Use the quantity from localStorage if available
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            shipping_address_collection: { allowed_countries: ["US"] },
            mode: "payment",
            success_url: successUrl,
            cancel_url: cancelUrl,
            phone_number_collection: { enabled: true },
        });

        // Process storage decrement
        await processStorageDecrement(cartItems, quantities);

        return new Response(JSON.stringify({ url: session.url }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return new Response(JSON.stringify({ error: 'Failed to create checkout session.' }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

async function processStorageDecrement(cartItems: CartItem[], quantities: Record<string, number>) {
    try {
        const { data: items, error } = await supabase.from("allitems").select("*");
        
        if (error) {
            throw new Error(`Error loading items: ${error.message}`);
        }

        const findDecrement = items.filter(item => 
            cartItems.some(cartItem => cartItem.id === item.id && item.storage !== null)
        );

        if (findDecrement.length > 0) {
            const updates = findDecrement.map(item => {
                const quantity = quantities[item.id];
                if (quantity !== undefined) {
                    return supabase
                        .from('allitems')
                        .update({ storage: item.storage - quantity }) // Decrement by the quantity in cart
                        .eq('id', item.id);
                }
            }).filter(promise => promise !== undefined);

            const results = await Promise.all(updates);
            const errors = results.filter(result => result.error);

            if (errors.length > 0) {
                throw new Error(`Error updating storage: ${errors.map(e => e.error.message).join(', ')}`);
            } else {
                console.log('Storage values decremented successfully');
            }
        }
    } catch (error) {
        console.error('Error processing storage decrement:', error);
        throw error;
    }
}
