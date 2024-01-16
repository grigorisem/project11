import { TUser, User } from "./src/scripts/classuser";
const getRandomProducts = (products: { name: string; price: number }[], count: number): { name: string; price: number }[] => {
  const shuffledProducts = products.sort(() => 0.5 - Math.random());
  return shuffledProducts.slice(0, count);
};
const displayUserInfo = (user: User): void => {
  console.log("Имя и фамилия пользователя:", user.fullname);
  if (user.orders.length === 0) {
    console.log("Пользователь не сделал заказов.\n");
    return;
  }
  console.log("Товары пользователя:");
  user.orders.forEach(order => {
    const product = user.products.find(p => p.name === order.productName);
    if (product) {
      console.log(" - Название товара:", order.productName);
      console.log("   Цена:", product.price);
      console.log("   Дата доставки:", order.deliveryDate.toISOString().split("T")[0]);
    } else {
      console.log(" - Название товара:", order.productName);
      console.log("   Продукт не найден в данных.\n");
    }
  });
  console.log("\n");
};
const getRandomDate = (daysToAdd: number): Date => {
  const today = new Date();
  const deliveryDate = new Date(today.setDate(today.getDate() + daysToAdd));
  return deliveryDate;
};
const getNewData = async (): Promise<{ users: User[]; products: { name: string; price: number }[] }> => {
  const usersResponse: TUser[] = await (await fetch("https://run.mocky.io/v3/b1bd6eba-759d-4e61-9d45-0816794d2d0b")).json();
  const productsResponse = await fetch("https://run.mocky.io/v3/de2f0069-2896-4b67-99cc-fbd0ff242ccf");
  const products = await productsResponse.json();
  const users = usersResponse.map(userData => {
    const randomProducts = getRandomProducts(products, Math.floor(Math.random() * 5) + 1);
    const user = new User(userData, randomProducts);
    if (randomProducts.length > 0) {
      const randomProduct = randomProducts[Math.floor(Math.random() * randomProducts.length)];
      const deliveryDate = getRandomDate(10);
      user.addOrder(randomProduct.name, randomProduct.price, deliveryDate);
    }
    return user;
  });
  return { users, products };
};
(async () => {
  try {
    const { users } = await getNewData();

    users.forEach(user => {
      displayUserInfo(user);
    });
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
})();
