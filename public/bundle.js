(()=>{"use strict";class o{fullname;login;password;country;city;age;id;orders;products;constructor(o,t){this.fullname=o.fullname,this.login=o.login,this.password=o.password,this.country=o.country,this.city=o.city,this.age=o.age,this.id=o.id,this.orders=o.orders||[],this.products=t.filter((o=>this.orders.some((t=>t.productName===o.name))))}addOrder(o,t,e){this.orders.push({productName:o,price:t,deliveryDate:e}),this.products.push({name:o,price:t})}}(async()=>{try{const{users:t}=await(async()=>{const t=await(await fetch("https://run.mocky.io/v3/b1bd6eba-759d-4e61-9d45-0816794d2d0b")).json(),e=await fetch("https://run.mocky.io/v3/de2f0069-2896-4b67-99cc-fbd0ff242ccf"),s=await e.json(),r=t.map((t=>{const e=((o,t)=>o.sort((()=>.5-Math.random())).slice(0,t))(s,Math.floor(5*Math.random())+1),r=new o(t,e);if(e.length>0){const o=e[Math.floor(Math.random()*e.length)],t=(o=>{const t=new Date;return new Date(t.setDate(t.getDate()+10))})();r.addOrder(o.name,o.price,t)}return r}));return{users:r,products:s}})();t.forEach((o=>{(o=>{console.log("Имя и фамилия пользователя:",o.fullname),0!==o.orders.length?(console.log("Товары пользователя:"),o.orders.forEach((t=>{const e=o.products.find((o=>o.name===t.productName));e?(console.log(" - Название товара:",t.productName),console.log("   Цена:",e.price),console.log("   Дата доставки:",t.deliveryDate.toISOString().split("T")[0])):(console.log(" - Название товара:",t.productName),console.log("   Продукт не найден в данных.\n"))})),console.log("\n")):console.log("Пользователь не сделал заказов.\n")})(o)}))}catch(o){console.error("Ошибка при получении данных:",o)}})()})();