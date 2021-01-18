import {Product} from './product';
import {User} from './user';

export interface Order {
  _id: string;
  orderStatus: string;
  products: [
    {
      _id: string;
      product: Product;
      count: number;
      description: string;
    }
  ],
  paymentIntent: {
    id: string;
    object: string;
    amount: number;
    canceled_at: string;
    cancellation_reason: string;
    capture_method: string
    client_secret: string
    confirmation_method: string
    created: number;
    currency: string
    description: string
    last_payment_error: string
    livemode: boolean;
    next_action: string
    payment_method: string;
    payment_method_types: string[]
    receipt_email: string;
    setup_future_usage: string;
    shipping: string;
    source: string;
    status: string;
  },
  orderedBy: User;
  createdAt: Date;
  updatedAt: Date;
  _v: number;
}
