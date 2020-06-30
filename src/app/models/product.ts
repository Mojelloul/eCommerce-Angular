import { Category } from './category';
import { CartItem } from './cart-item';
import { OrderItem } from './order-item';

export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    publishedIn: Date;
    quantity: number;
    image: string;
    category: Category;
    cartItem: CartItem;
    order_items: OrderItem[];
}
