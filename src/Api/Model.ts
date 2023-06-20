import { Prisma, PrismaClient } from '@prisma/client'
import { returnNullOnErr } from '../Lib/Utils'

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query'
        }
    ]
})

prisma.$on('query', (event) => {
    console.log('Query', event.query)
})

export const getProductList = async (params: { searchTerm: string }) => {
    const result = await prisma.product.findMany({
        include: {
            stores: {
                select:{unit:true, unit_factor:true},
                take: 1
            }
        },
        where: {
            OR: [
                { name: { contains: params.searchTerm } },
                { brand: { contains: params.searchTerm } }
            ]
        }
    })
    .catch(returnNullOnErr)

    return result
}

export const getMasterList = async (params: {location: number, products: number[]})=>{
    const result = await prisma.master.findMany({
        select: {
            product: true,
            store: true,
            unit: true,
            unit_factor: true,
            unit_price: true
        },
        where: {
            store:{
                location_id: params.location
            },
            product_id: {in: params.products}
        }
    })

    return result.map(row=>({...row, one_factor_price: (row.unit_price/row.unit_factor)}))
}