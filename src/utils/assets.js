export const parseAssetUrl = (asset) => {
    let img = asset?.asset?.metadata?.image
    //TODO: Handle parsing of img better. Need to determine possible format metadata can be in
    if (typeof img === 'string' || img instanceof String) {
        img = img.replace('ipfs://ipfs/', '');
        img = img.replace('ipfs://', '');
        return `https://ipfs.io/ipfs/${img}`
    } else if (typeof img === "object" && img !== null) {
        return `https://ipfs.io/ipfs/${img[1]}`
    }
    return 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
}