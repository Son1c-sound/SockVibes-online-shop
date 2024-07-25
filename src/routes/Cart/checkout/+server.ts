// src/routes/api/checkout-and-webhook.ts
import Stripe from 'stripe';
import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

const stripe = new Stripe(env.STRIPE_API, { apiVersion: '2024-06-20' });
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

const successUrl = 'http://localhost:5173/Success';
const cancelUrl = 'http://localhost:5173/Canceled';
const endpointSecret = env.STRIPE_WEBHOOK_SECRET;

export const POST: RequestHandler = async ({ request }) => {
    const sig = request.headers.get('stripe-signature');
    const body = await request.text();

    if (sig) {
        // Handle webhook
        try {
            let event: Stripe.Event;
            try {
                event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
            } catch (err) {
                return new Response(JSON.stringify({ error: 'Webhook Error: ' + err.message }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            if (event.type === 'checkout.session.completed') {
                const session = event.data.object as Stripe.Checkout.Session;
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

                for (const item of lineItems.data) {
                    const productId = item.price.product; // Adjust based on your data structure
                    const quantityPurchased = item.quantity;

                    // Decrement inventory
                    await supabase
                        .from('storage')
                        .update({ quantity: supabase.raw('quantity - ?', [quantityPurchased]) })
                        .eq('id', productId);
                }
            }

            return new Response(JSON.stringify({ received: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error('Error handling webhook:', error);
            return new Response(JSON.stringify({ error: 'Webhook handling failed.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } else {
        // Handle checkout session creation
        try {
            const data = JSON.parse(body);
            const cartItems: CartItem[] = data.items;

            // Check inventory
            for (const item of cartItems) {
                const { data: inventory, error } = await supabase
                    .from('products')
                    .select('quantity')
                    .eq('id', item.id)
                    .single();

                if (error || !inventory || inventory.quantity < item.quantity) {
                    return new Response(JSON.stringify({ error: 'Item is out of stock.' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
            }

            // Create Stripe Checkout Session
            const lineItems = cartItems.map(item => ({
                price_data: {
                    currency: 'USD',
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
                shipping_address_collection: { allowed_countries: ['US'] },
                mode: 'payment',
                success_url: successUrl,
                cancel_url: cancelUrl,
                phone_number_collection: { enabled: true }
            });

            return new Response(JSON.stringify({ url: session.url }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error('Error creating checkout session:', error);
            return new Response(JSON.stringify({ error: 'Failed to create checkout session.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
};
