// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

export interface CartItem {
    productId: any;
    quantity: number;
    id: number;
    name: string;
    image: string;
    description: string;
    status: string;
    price: string;
    category: string;
}



