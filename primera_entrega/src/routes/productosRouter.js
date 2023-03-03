import { Router, json } from 'express';
import ProductManager from '../managers/productos.js';

const manager = new ProductManager();
const productosRouter = Router();
productosRouter.use(json())


productosRouter.get('/', async(req, res) => {
    const products = await manager.getProducts();
    const { limit } = req.query;

    if(limit) {
     res.send(products.slice(0, limit));
    }else{
     res.send(products);
    } 
})


productosRouter.get('/:id', async(req, res) => {
    const ProductId  = Number(req.params.id);
    const productById = await manager.getProductById(ProductId);

    if (!productById) {
      return res
      .status(404)
      .send( {error:`El producto con el id: ${id} no existe`})
  }
  res.send(productById);
});

productosRouter.post('/', async(req, res) => {
    const  {title, description, price, code, stock, category} = req.body;
    const productProperties = {title, description, price, code, stock, category}

    if (Object.values(productProperties).includes(undefined)) {
        return res.status(400).send({error: "No se han ingresado todos los datos"})
    } 
    const products = await manager.getProducts();
    const newProduct ={
        ...req.body,
        thumbail:[],
        status:true,
        id: await manager.updateId(products),
    }
    await manager.addProduct(title, description, price, code, stock, category)
    res.status(201).send(newProduct);
});


productosRouter.put('/:id', async(req, res) => {
    const productId = Number(req.params.id);
    await manager.updateProduct(productId, req.body)
    const updateProduct =  await manager.getProductById(productId)
    res.status(201).send(updateProduct);
    
});

productosRouter.delete('/:id', async(req, res) => {   
    const productId = Number(req.params.id);
    await manager.deleteProduct(productId);
    const products = await manager.getProducts();
    res.send(products);
})

export default productosRouter;