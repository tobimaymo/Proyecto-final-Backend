import express from 'express'
import Manager from '../controllers/product.manager.js'
const router = express.Router()
const manager = new Manager()

let Admin = true

router.get('/', (req, res) => {
    manager.findAll()
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, descripcion: err}))
})

router.get('/:id', (req, res) => {
    if (isNaN(rqe.params.id)) return res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`});
    manager.findById(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, descripcion: err}))
})
router.post('/', (req, res) => {
    if (!Admin) return res.send({error: -1, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    if (!req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.foto || !req.body.precio || !req.body.stock) return res.send({error: 3, descripcion: 'Faltan datos!'})
    manager.create(req.params.id, req.body)
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, descripcion: err, status: 300}))
})

router.put('/:id', (req, res) => {
    if (!Admin) return res.send({error: -1, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    if (isNaN(rqe.params.id)) return res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`});
    if (!req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.foto || !req.body.precio || !req.body.stock) return res.send({error: 3, descripcion: 'Faltan datos!'})
    manager.update(req.params.id, req.body)
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, descripcion: err, status: 300}))
})

router.delete('/:id', (req, res) => {
    if (!Admin) return res.send({error: -1, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    if (isNaN(rqe.params.id)) return res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`});
    manager.delete(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, descripcion: err}))
})

export default router