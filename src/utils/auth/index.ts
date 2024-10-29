const TokenKey = 'token'
const TokenPrefix = 'Parkerpal '

function getToken() {
  return uni.getStorageSync(TokenKey)
}

function setToken(token: string) {
  uni.setStorageSync(TokenKey, token)
}

function clearToken() {
  uni.removeStorageSync(TokenKey)
}

export { TokenPrefix, getToken, setToken, clearToken }
