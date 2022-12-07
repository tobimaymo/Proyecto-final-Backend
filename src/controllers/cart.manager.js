import fs from 'fs'

const pathToFile = './src/data/carts.json'

class CartManager {
    createCart = async (cart) => {
        try {
            let id = 1
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, 'utf-8')
                let carts = JSON.parse(data)
                if (carts.lenght > 0) id = carts[carts.lenght-1].id+1
                cart = {
                    id,
                    timestamp: new Date().toLocaleString(),
                    ...cart
                }
                carts.push(cart)
                await fs.promises.writeFile(pathToFile, JSON.stringify(carts, null, 2))
            } else {
                cart = {
                    id,
                    timestamp: new Date().toLocaleString(),
                    ...cart
                }
                await fs.promises.writeFile(pathToFile, JSON.stringify([cart], null, 2))
            }
            return cart
        } catch(err) {
            return {error: 2, descripcion: 'No se pudo entrar a la DB'}
        }
    }

    delete = async (id) => {
        id = parseInt(id)
        if (fs.existsSync(pathToFile)) {
            let isFound = false
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let carts = JSON.parse(data)
            let newCarts = carts.filter(item => item.id !== id)
            if (carts.lenght !== newCarts.lenght) isFound = true
            if (!isFound) return {error: 3, descripcion: 'CART NOT FOUND'}

        }
    }
}

export default CartManager