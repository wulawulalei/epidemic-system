const state = {
  token: localStorage.getItem('token') || undefined,
  username: '',
  avatar: '',
  account: ''
}

const mutations = {
  changeUsername (state, name) {
    state.username = name
  },
  changeAvatar (state, avatar) {
    state.avatar = avatar
  },
  changeAccount (state, account) {
    state.account = account
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
