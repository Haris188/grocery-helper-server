import { Express, Request, Response } from 'express'

export default function (app: Express) {
    app.get('/', (req: Request, res: Response) => {
        console.log('reached')
        res.send('Hello, Express and TypeScript!');
    });

    app.post('/product_list', async (req, res)=>{
        console.log(req.body)
        res.send([{id: 1}])
    })
}