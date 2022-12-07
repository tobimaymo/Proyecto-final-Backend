import express from 'express'
import productosRouter from './router/productos.router.js'
// import carritoRouter from './router/carrito.router.js'

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server activo en el port... ${PORT}`))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', productosRouter)
// app.use('/api/carrito', carritoRouter)