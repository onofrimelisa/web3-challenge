import Web3 from 'web3'
import axios from 'axios'
import { WEB3_PROVIDER, SMART_CONTRACT_ADDRESS, ABI_PROVIDER } from "../config/config";
import {Product} from "../model";

class SmartContractService {
    #smartContract: any;
    #web3: any;
    #account: any;

    constructor() {
        this.init().catch(err => console.error(err))
    }

    private init = async () => {
        // Set Web3 Provider
        this.#web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER))

        // Create account
        this.createAccount()

        // Fetch ABI and initialize contract
        const abiResult = await this.getABI().catch((err) => {
            return Promise.reject((`There was an error while fetching ABI: ${err}`))
        })

        if (abiResult) {
            this.#smartContract = new this.#web3.eth.Contract(JSON.parse(abiResult), SMART_CONTRACT_ADDRESS, {
                from: this.#account.address
            })

            return Promise.resolve()
        }

        return Promise.reject(("The ABI received is empty"))
    }

    private getABI = (): Promise<string> => {
        return axios
            .get(`${ABI_PROVIDER}/api?module=contract&action=getabi&address=${SMART_CONTRACT_ADDRESS}`)
            .then((res: any) => {
                return Promise.resolve(res.data.result)
            })
            .catch((err) => {
                return Promise.reject(err)
            })
    }

    getProducts = async (): Promise<Product[]> => {
        let products: Product[] = []

        // TODO this is not working. The result is the error Invalid JSON RPC response
        const totalOfProducts: number = await this.#smartContract.methods.size().call()

        for (let i = 0; i < totalOfProducts; i++) {
            const product: Product = await this.#smartContract.methods.products(i).call().catch((err) => {
                return Promise.reject(err)
            })
            products.push(product)
        }

        return Promise.resolve(products)
    }

    private createAccount = () => {
        this.#account = this.#web3.eth.accounts.create()
    }
}

export default new SmartContractService()

