
export const returnNullOnErr = (e:any)=>{
    console.log(e)
    return null
}

export const objArrayToMap = <T>(arr: {[key: string]: any}[], key: keyof T): {[x:string]: T} =>{
    const resultMap: {[x:string]: any} = {}
    arr.forEach(el=>{
        resultMap[el[key.toString()]] = el
    })

    return resultMap
}