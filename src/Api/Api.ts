import { Express, Request, Response } from 'express'
import * as Model from './Model'

interface getTotalByStoresParams {
    location: number
    products: { [key: number]: { factor: number } }
}

export default function (app: Express) {
    app.get('/', (req: Request, res: Response) => {
        console.log('reached')
        res.send('Hello, Express and TypeScript!');
    });

    app.post('/product_list', async (req, res) => {
        const result = await getProductList(req.body)
        res.send(result)
    })

    app.post('/get_total', async (req, res) => {
        const result = await getProductList(req.body)
        res.send(result)
    })
}

async function getProductList(params: { searchTerm: string }) {
    let result = await Model.getProductList(params)
    const withUnit = result?.map(row => ({ ...row, unit: row.stores[0]?.unit, unit_factor: row.stores[0]?.unit_factor }))
    return withUnit
}

async function getTotalByStores(params: getTotalByStoresParams) {
    const masterList = await Model.getMasterList({
        location: params.location,
        products: Object.keys(params.products).map(r => parseInt(r))
    })

    const totalObj: { [key: number]: any } = {}

    masterList.forEach(row => {
        if (!totalObj[row.store.id]) {
            totalObj[row.store.id] = {
                total: 0,
                products: []
            }
        }

        totalObj[row.store.id].products.push({ ...row, unit_factor: params.products[row.product.id].factor })
        totalObj[row.store.id]['total'] += row.one_factor_price * params.products[row.product.id].factor

    })

    return totalObj
}