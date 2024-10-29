import { defineStore } from 'pinia'

const useMerchantStore = defineStore('merchant', {
  state: () => ({
    merchant: null,
    tabValue: 0,
  }),
  getters: {
    isLoggedIn: state => !!state.merchant,
  },
})

export default useMerchantStore
