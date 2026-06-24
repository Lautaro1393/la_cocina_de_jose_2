export type CategoryId =
  | 'platos'
  | 'pizzas'
  | 'milanesas'
  | 'guarniciones'
  | 'sandwich';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  available: boolean;
}

export interface Category {
  id: CategoryId;
  title: string;
  dishes: Dish[];
}

export interface CartLine {
  dish: Dish;
  qty: number;
}

export type PaymentMethod = 'Efectivo' | 'Transferencia';

export interface CheckoutInfo {
  name: string;
  payment: PaymentMethod;
  notes?: string;
}
