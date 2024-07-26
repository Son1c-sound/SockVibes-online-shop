export interface quantityItem {
    value: string;
    label: string;
}

export const quantity: quantityItem[] = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
];


export interface Item {
  newitem: string;
  new: string;
  seller: string;
  sale: any;
  text: any;
  storage: any;
  stock: number;
  id: number;
  name: string;
  price: number;
  img: string;
  description?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  category: string;
  status: string;
  logo: any;
}