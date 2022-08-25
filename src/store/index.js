import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import VuexPersistence from 'vuex-persist'
// import permission from './modules/permission'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  modules: {
    app,
    user,
    // permission
  },
  getters,
  plugins: [vuexLocal.plugin]
})

export default store
