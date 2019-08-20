export default {
  state: {
    activeMenuId: ''
  },
  mutations: {
    setActiveMenuId: (state, payload) => {
      state.activeMenuId = payload;
    }
  }
}
