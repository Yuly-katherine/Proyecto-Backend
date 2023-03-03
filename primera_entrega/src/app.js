import express from 'express';
import cartsRouter from './routes/carritoRouter.js'
import productosRouter from './routes/productosRouter.js'


const app = express();

app.use("/api/products", productosRouter)
app.use("/api/carts", cartsRouter)


app.listen(8080, () => {
    console.log('listening on port 8080')
})