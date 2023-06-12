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
    // const result = await prisma.master.findMany({
    //     include: {
    //         product: true,
    //         store: true
    //     },
    //     where: {
    //         product: {
    //             OR: [
    //                 { name: { contains: params.searchTerm } },
    //                 { brand: { contains: params.searchTerm } }
    //             ]
    //         }
    //     }
    // })
    //     .catch(returnNullOnErr)

    const result = await prisma.product.findMany({
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