export const parseAssetUrl = (asset) => {
    let img = asset?.asset?.metadata?.image
    //TODO: Handle parsing of img better. Need to determine possible format metadata can be in
    if (isString(img)) {
        img = img.replace('ipfs://ipfs/', '');
        img = img.replace('ipfs://', '');
        return `https://ipfs.io/ipfs/${img}`
    } else if (isObject(isObj)) {
        return `https://ipfs.io/ipfs/${img[1]}`
    }
    return 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
}


export const parseAssetMetadata = (asset) => {
    return parseMetadataObj(asset)
}

const parseMetadataObj = (obj, parentPrefix = '') => {
    let items = []
    const keys = Object.keys(obj).filter(x => !x.startsWith('__')) || []
    keys.forEach((key, index) => {
        const value = obj[key]
        items.push(buildMetadataItem(parentPrefix + index, key, value))
    });
    return items
}

const buildMetadataItem = (index, key, value) => {
    let obj = {
        "key": index,
        "data": {
            "name": key,
            "value": isString(value) ? value : null
        }
    }
    if (isObject(value)) {
        obj.children = parseMetadataObj(value, `${index}-`)
    }
    return obj
}

const isString = (string) => {
    return typeof string === 'string' || string instanceof String
}

const isObject = (obj) => {
    return typeof obj === "object" && obj !== null
}