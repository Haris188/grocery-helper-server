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