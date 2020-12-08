

export const supportFileEx = value =>{

    const allowedformat = ['jpg','png','jpeg']
    const extension = value.split('.').pop()
    return allowedformat.includes(extension)
}