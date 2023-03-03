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

  async updateCartId(carts) {
    if (carts.length === 0) {
      return 0;
    } else {
      const ids = carts.map((prods) => prods.id);
      let maxIds = Math.max(...ids);
      return maxIds + 1;
    }
  }

  async addCart() {
    const carts = await this.getAllCarts();

    const newCart = {
      products: [],
      id: await this.updateCartId(carts),
    };
    const updateCarts = [...carts, newCart];
    await fs.promises.writeFile(this.#path, JSON.stringify(updateCarts));
    return updateCarts;
  }


  async updateProduct(cartId, newProduct) {
    const cartById = await this.getCartById(cartId);
    const productSelected = cartById.products.find(prod => {
      return prod.id === newProduct.id
    })
    if(!productSelected) {
      cartById.products = [...cartById.products,
        {
            id: newProduct.id,
            quantity: 1
        }
      ]
    } else {
      productSelected.quantity ++
    }

    const carts = await this.getAllCarts();
    const index = carts.findIndex(el => {
      return el.id === cartId
    })

    carts[index] = cartById

    await fs.promises.writeFile(this.#path, JSON.stringify(carts))
    return carts;
  }

}

export default CartManager;
