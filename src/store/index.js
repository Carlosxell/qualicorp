import Vue from 'vue';
import Vuex from 'vuex';

const RESIZE_WINDOW = 'RESIZE_WINDOW';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowSize: {
      h: 0,
      w: 0
    }
  },
  getters: {
    getWindowInfo: (state) => { return state.windowSize; },
  },
  mutations: {
    [RESIZE_WINDOW] (state, status) {
      state.windowSize = status;
    }
  },
  actions: {
    resizeWindow({ commit }, payload) {
      commit(RESIZE_WINDOW, payload);
    }
  }
});
