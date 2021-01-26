import firebase from 'firebase/app'

export default {
  actions: {
    // eslint-disable-next-line no-unused-vars
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        // console.log(e)
        throw e
      }
    },
    // eslint-disable-next-line no-unused-vars
    async register({dispatch}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          name
        })
      } catch (e) {
        // console.log(e)
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout({commit}) {
      await firebase.auth().signOut()
      await commit('clearInfo')
    }
  }
}