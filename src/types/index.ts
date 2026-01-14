export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'ring' | 'necklace' | 'earring';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderForm {
  name: string;
  phone: string;
  paymentMethod: string;
  notes: string;
}
