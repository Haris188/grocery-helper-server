import { Express, Request, Response } from 'express'
import * as Model from './Model'

export default function (app: Express) {
    app.get('/', (req: Request, res: Response) => {
        console.log('reached')
        res.send('Hello, Express and TypeScript!');
    });

    app.post('/product_list', async (req, res)=>{
        const result = await Model.getProductList(req.body)
        res.send(result)
    })
}