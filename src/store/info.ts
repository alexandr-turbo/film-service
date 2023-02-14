import firebase from 'firebase/app'

export interface InfoState {
  info: object
}

export default {
  state: (): InfoState => ({
    info: {}
  }),
  mutations: {
    setInfo(state: InfoState, info: object) {
      state.info = info
    },
    clearInfo(state: InfoState) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({dispatch, commit}: {dispatch: any, commit: any}) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch(e) {
        // throw e
      }
    }
  },
  getters: {
    info: (state: InfoState) => state.info
  }
}