import { Express, Request, Response } from 'express'
import * as Model from './Model'

export default function (app: Express) {
    app.get('/', (req: Request, res: Response) => {
        console.log('reached')
        res.send('Hello, Express and TypeScript!');
    });

    app.post('/product_list', async (req, res)=>{
        let result = await Model.getProductList(req.body)
        const withUnit = result?.map(row=>({...row, unit: row.stores[0]?.unit, unit_factor: row.stores[0]?.unit_factor}))
        res.send(withUnit)
    })
}