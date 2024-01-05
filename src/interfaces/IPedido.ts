import { TCart } from "./ICart";
import { IUser } from "./IUser";

export interface IPedido {
  id: string;
  cart: TCart;
  status: string;
  user: IUser;
  userId: string;
  date: Date;
  subTotal: number;
  paymentUrl: string
}
