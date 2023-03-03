import { Router, json } from 'express';
import CartManager from '../managers/cart.js';
import productosRouter from '../managers/productos.js'

const manager = new CartManager();
const managerProd = new productosRouter();
const CartsRouter = Router();
CartsRouter.use(json())


CartsRouter.get('/:cid', async(req, res) => {
    const cartId = Number(req.params.cid);
    const cartById = await manager.getCartById(cartId);
    res.status(201).send(cartById);
})


CartsRouter.post('/', async(req, res) => {
    const updateCart = await manager.addCart()
    res.status(201).send(updateCart);
});


CartsRouter.post('/:cid/product/:pid', async(req, res) => {
    const cartId = Number(req.params.cid);
    const prodId = Number(req.params.pid);
    const product = await managerProd.getProductById(prodId);
    const updateCart = await manager.updateProduct(cartId, product);
    res.status(201).send(updateCart);

});



export default CartsRouter;