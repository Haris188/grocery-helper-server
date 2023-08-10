import { Express, Request, Response } from 'express'
import * as Model from './Model'
import { objArrayToMap } from '../Lib/Utils';
import { Location, User } from '@prisma/client';

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
        const result = await getTotalByStores(req.body)
        res.send(result)
    })

    app.get('/initial_params', async (req, res) => {
        const result = await getInitialParams(req)
        res.send(result)
    })

    app.get('/update_def_location/:location_id', async (req, res)=>{
        const user = await getCurrentUser(req)
        if(user?.id){
            const result = await updateUserLocation(user.id, parseInt(req.params.location_id))
            return res.send(result)
        }
        res.send('User Not Found in session')
    })
}

async function getInitialParams(req: Request){
    const locations = await getLocations()
    const user = await getCurrentUser(req, {full: true})

    return {
        locations,
        user
    }
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
                products: [],
                store: row.store
            }
        }

        totalObj[row.store.id].products.push({ 
            ...row.product, 
            unit: row.unit,
            unit_price: row.unit_price,
            unit_factor: params.products[row.product.id].factor,
            total: row.unit_price * params.products[row.product.id].factor
        })
        totalObj[row.store.id]['total'] += row.unit_price * params.products[row.product.id].factor

    })

    // console.log(JSON.stringify(totalObj, null, 4))

    return totalObj
}

async function getLocations(){
    const locations = await Model.getLocations()
    return objArrayToMap<Location>(locations, 'id')
}

async function getCurrentUser(req: Request, options: { full?: boolean} = {}): Promise<Partial<User & {favourite_stores: number[]}>>{
    // simulates a mock user
    if(options.full){
        return await Model.getUserWithId(1) as User & {favourite_stores: number[]}
    }

    return {id: 1}
}

async function updateUserLocation(user_id:number, location_id:number){
    const result = await Model.updateUser(user_id, {
        default_location_id: location_id
    })

    if(result){
        return await Model.getUserWithId(user_id)
    }

    return result
}