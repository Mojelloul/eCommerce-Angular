import { Payment } from './payment';
import { Invoice } from './invoice';
import { Profile } from './profile';
import { Order } from './order';
export class User {
    id:number;
    username:string;
    password:string;
    isAdmin:boolean;
    profile:Profile;
    orders:Order[];
    invoices:Invoice[];
    payments:Payment[];
}
