import express from 'express'
import SmartContractService from "../services/smartContract";
const router = express.Router()

// swagger config
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../../docs/swaggerDoc.json')

/**
 * GET /products
 * @summary Calls Policy Agent evaluate endpoint
 * @tags Policy Agent Client
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

// Swagger endpoints
router.get('/swagger/index.html', swaggerUi.serve, swaggerUi.setup(swaggerFile))

export default router