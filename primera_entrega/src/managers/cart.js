import fs from "fs";

class CartManager {
  #path = "./carts.json";

  async getCartById(cartId) {
    const allCarts = await this.getAllCarts();
    const cart = allCarts.find((item) => {
      return item.id === cartId;
    });
    if (!cart) {
      console.error(`El carrito con el ID: ${cartId} no existe`);
      return {}
    } else {
      return cart;
    }
  }

  async getAllCarts() {
    try {
      const allCarts = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(allCarts);
    } catch (error) {
      return [];
    }
  }

  async updateCartId(cart) {
    if (cart.length === 0) {
      return 0;
    } else {
      const ids = products.map((prods) => prods.id);
      let maxIds = Math.max(...ids);
      return maxIds + 1;
    }
  }

  async addCart(products) {
    const carts = await this.getAllCarts();
    if (!products) {
      return console.error(
        "No se estan ingresando los productos"
      );
    } else {
      const newCart = {
        ...products,
        id: await this.updateCartId(carts),
      };
      const updateCarts = [...carts, newCart];
        await fs.promises.writeFile(this.#path, JSON.stringify(updateCarts));
    }
  }


  async updateProduct(cartId, productId, newProduct) {
    const carts = await this.getAllCarts();
    const cartIndex = carts.findIndex( cart => {
      return cart.id === cartId;
    })

    if(cartIndex === -1) {
      console.error(`El carrito con el ID: ${cartId} no existe`);
      return {}
    }
    
    const productSelected = carts[cartIndex].products.find(product =>{
      return product.id === productId;
    })

    if(!productSelected) {
      carts[cartIndex].products.push(newProduct)
    } else {
      productSelected.quantity += newProduct.quantity
    }
    await fs.promises.writeFile(this.#path, JSON.stringify(carts));
    
  }
}

export default CartManager;
