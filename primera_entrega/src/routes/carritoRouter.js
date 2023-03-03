import { Router, json } from 'express';
import CartManager from '../managers/cart.js';

const manager = new CartManager();
const CartsRouter = Router();
CartsRouter.use(json())


CartsRouter.get('/:cid', async(req, res) => {
    const cartId = Number(req.params.id);
    const cart = await manager.getCartsById(cartId);
    res.send(cart);
})


CartsRouter.post('/', async(req, res) => {
    const carts = await manager.getAllCarts();

    const newCart ={
        ...req.body,
        id: await manager.updateCartId(carts),
    }
    await manager.addCart(req.body)
    res.status(201).send(newCart);
});


CartsRouter.post('/:cid/product/:pid', async(req, res) => {
    const {cid, pid} = req.params
    const prodId = Number(pid)
    const cartId = Number(cid)
    const cartById = await manager.getCartById(cartId);
    if(!cartById) {
        return res.status(400).send({error: "El ID ingresado no corresponde a ningun carrito"})
    }
});



export default CartsRouter;