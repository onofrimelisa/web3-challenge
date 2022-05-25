import express from 'express'
import SmartContractService from "../services/smartContract";
const router = express.Router()

// Swagger config
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../../docs/swaggerDoc.json')

/**
 * GET /products
 * @summary Get all the products with their details
 * @tags Products
 */
router.get('/products', (req, res) => {
    SmartContractService.getProducts()
        .then((products) => {
            console.log(products)
            res.send({
                status: 200,
                products
            })
        })
        .catch((err) => {
            console.error(err)
            res.send({
                status: 500,
                message: "There was an error while fetching products from the Smart Contract",
                err
            })
        })
})

/**
 * POST /products
 * @summary Create a product from a wallet
 * @tags Products
 */
router.post('/products', (req, res) => {
    SmartContractService.createProduct("test")
    res.send()
})

// Swagger endpoints
router.get('/swagger/index.html', swaggerUi.serve, swaggerUi.setup(swaggerFile))

export default router