export interface Order {
    productName: string;
    price: number;
    deliveryDate: Date;
  }
export type TUser = {
    fullname: string,
    login: string,
    password: string,
    country: string,
    city: string,
    age: number,
    id: string,
    orders: Order[]
}
export class User {
    fullname: string;
    login: string;
    password: string;
    country: string;
    city: string;
    age: number;
    id: string;
    orders: Order[];
    products: { name: string; price: number }[];
  
    constructor(params: TUser, allProducts: { name: string; price: number }[]) {
      this.fullname = params.fullname;
      this.login = params.login;
      this.password = params.password;
      this.country = params.country;
      this.city = params.city;
      this.age = params.age;
      this.id = params.id;
      this.orders = params.orders || [];
      this.products = allProducts.filter(product => this.orders.some(order => order.productName === product.name));
    }
  
    addOrder(productName: string, price: number, deliveryDate: Date): void {
      this.orders.push({ productName, price, deliveryDate });
      this.products.push({ name: productName, price });
    }
  }
  