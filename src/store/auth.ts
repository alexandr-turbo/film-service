import firebase from 'firebase/app'

export default {
  actions: {
    async login({dispatch}: {dispatch: any}, {email, password}: {email: string, password: string}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        throw e
      }
    },
    async register({dispatch}: {dispatch: any}, {email, password, name}: {email: string, password: string, name: string}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          name
        })
      } catch (e) {
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout({commit}: {commit: any}) {
      await firebase.auth().signOut()
      await commit('clearInfo')
    }
  }
}