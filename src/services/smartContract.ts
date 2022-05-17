import Web3 from 'web3'
import axios from 'axios'

export default class SmartContractService {
    #smartContract: any;

    constructor() {
        this.init()
    }

    private init = async () => {
        const web3 = new Web3(new Web3.providers.HttpProvider('https://mumbai.polygonscan.com'))

        const abiResult = await this.getABI()

        if (abiResult) {
            this.#smartContract = new web3.eth.Contract(JSON.parse(abiResult), '0xd9E0b2C0724F3a01AaECe3C44F8023371f845196')
        }
    }

    private getABI = (): Promise<string> => {
        return axios
            .get('https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=0xd9E0b2C0724F3a01AaECe3C44F8023371f845196')
            .then((res: any) => {
                return res.data.result
            })
            .catch((err) => {
                // TODO handle error here
                return ""
            })
    }

    getProducts = () => {
        // TODO this is not working. The result is the error Invalid JSON RPC response
        return this.#smartContract.methods.products(1).call()
    }
}

