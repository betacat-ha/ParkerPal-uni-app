// const merchantApi = uniCloud.importObject('MerchantApi')

// TODO
export function createMerchantApi(requestMethod: 'http' | 'cloud') {
  if (requestMethod === 'http') {
    return 'httpApi'
  }
  else if (requestMethod === 'cloud') {
    return 'cloudApi'
  }
  else {
    throw new Error('Invalid requestMethod. Use "http" or "cloud".')
  }
}
