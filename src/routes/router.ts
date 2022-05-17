import express from 'express'
import SmartContractService from "../services/smartContract";
const router = express.Router()
const service = new SmartContractService()

router.get('/products', (req, res) => {
    service.getProducts()
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

export default router