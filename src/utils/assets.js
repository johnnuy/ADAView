export const parseAssetUrl = (assetProperties) => {
    const { contentUrl, contentData } = assetProperties
    if (contentData != null) return contentData
    else return contentUrl   
}


export const parseAssetMetadata = (asset) => {
    const metadata = parseMetadataObj(asset)
    return metadata.length == 0 ? null : metadata
}

const parseMetadataObj = (obj, parentPrefix = '') => {
    if (obj == null) return []
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