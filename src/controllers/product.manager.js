import fs from 'fs'

const pathToFile = './src/data/products.json'

class Manager {
    findAll = async () => {
        if (!fs.existsSync(pathToFile)) return {error:0, descripcion: 'DB NOT FOUND'}
        let data = await fs.promises.readFile(pathToFile, 'utf-8')
        return JSON.parse(data)
    }

    findById = async (id) => {
        id = parseInt(id)
        if (!fs.existsSync(pathToFile)) return {error:0, descripcion: 'DB NOT FOUND'}
        let data = await fs.promises.readFile(pathToFile, 'utf-8')
        let products = JSON.parse(data)
        let product = products.find(item => item.id === id)
        if (!product) return {error: 1, descripcion: 'Product Not Found'}
        return product
    }
    create = async (product) => {
        try {
            let id = 1
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, 'utf-8')
                let products = JSON.parse(data)
                if (product.length > 0) id = products[products.length-1].id+1
                product = {
                    id,
                    timestamp: new Date().toLocaleString(),
                    ...product
                }
                products.push(product)
                await fs.promises.writeFile(pathToFile, JSON.stringify(products, null, 2))
            } else {
                product = {
                    id,
                    timestamp: new Date().toLocaleString(),
                    ...product
                }
                await fs.promises.writeFile(pathToFile, JSON.stringify([product], null, 2))
            }
            return product
        } catch(err) {
            return {error: 2, descripcion: 'No se pudo entrar a la BD'}
        }
    }

    update = async (id, updatedProduct) => {
        id = parseInt(id)
        if (fs.existsSync(pathToFile)) {
            let isFound = false
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let products = JSON.parse(data)
            let newProductos = products.map(item => {
                if (item.id === id) {
                    isFound = true
                    return {
                        id,
                        ...updatedProduct
                    }
                } else return item
            })
            if (!isFound) return {error: 1, descripcion: 'Product NOT FOUND'}
            await fs.promises.writeFile(pathToFile, JSON.stringify(newProductos, null, 2))
            return newProductos.find(item => item.id === id)
        } else {
            return {error: 0, descripcion: 'DB NOT FOUND'}
        }
    }

    delete = async (id) => {
        id = parseInt(id)
        if (fs.existsSync(pathToFile)) {
            let isFound = false
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let products = JSON.parse(data)
            let newProductos = products.filter(item => item.id !== id)
            if (products.length !== newProductos.length) isFound = true
            if (!isFound) return {error: 1, descripcion: 'Product NOT FOUND'}
            await fs.promises.writeFile(pathToFile, JSON.stringify(newProductos, null, 2))
            return newProductos
        } else {
            return {error: 0, descripcion: 'DB NOT FOUND'}
        }
    }
}

export default Manager