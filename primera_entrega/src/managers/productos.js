import fs from "fs";

class ProductManager {
  #path = "./products.json";

  async addProduct(title, description, price, code, stock, category) {
    const products = await this.getProducts();
    const product = products.find((element) => {
      return element.code === code;
    });

    if (product) {
      return console.error(
        `El code: ${code} se encuentra repetido, no se puede agregar el producto`
      );
    } else {
      const nuevoProducto = {
        id: await this.updateId(products),
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnail: [],
      };

      if (Object.values(nuevoProducto).includes(undefined)) {
        return console.error("No se han ingresado todos los datos");
      } else {
        const updateProducts = [...products, nuevoProducto];
        await fs.promises.writeFile(this.#path, JSON.stringify(updateProducts));
      }
    }
  }

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      return [];
    }
  }

  async updateId(products) {
    if (products.length === 0) {
      return 0;
    } else {
      const ids = products.map((prods) => prods.id);
      let maxIds = Math.max(...ids);
      return maxIds + 1;
    }
  }

  async getProductById(productId) {
    const products = await this.getProducts();
    const product = products.find((item) => {
      return item.id === productId;
    });
    if (!product) {
      console.error(`El producto con el ID: ${productId} no existe`);
      return {}
    } else {
      return product;
    }
  }

  async updateProduct(
    productId,
    newTitle,
    newDescription,
    newCode,
    newPrice,
    newStatus,
    newStock,
    newCategory,
    newThumbnail
  ) {
    let products = await this.getProducts();
    const index = products.findIndex((element) => {
      return element.id === productId;
    });
    if (index === -1) {
      return console.error(`El producto con el ID ${productId} no existe`);
    } else {
      const actualizarProducto = {
        id: productId,
        title: newTitle || products[index].title,
        description: newDescription || products[index].description,
        price: newPrice || products[index].price,
        thumbnail: newThumbnail || products[index].thumbnail,
        code: newCode || products[index].code,
        stock: newStock || products[index].stock,
        category: newCategory || products[index].category,
        status: newStatus || products[index].status,
      };
      products[index] = actualizarProducto;
      await fs.promises.writeFile(this.#path, JSON.stringify(products));
    }
  }

  async deleteProduct(productId) {
    let products = await this.getProducts();
    const index = products.findIndex((element) => {
      return element.id === productId;
    });
    if (index === -1) {
      return console.error(`El producto con el ID ${productId} no existe`);
    } else {
      products.splice(index, 1);
      await fs.promises.writeFile(this.#path, JSON.stringify(products));
    }
  }
}


export default ProductManager;
