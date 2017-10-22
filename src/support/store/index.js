import Vue from 'vue'
import Vuex from 'vuex'

import { strict } from 'src/support'

import state from 'src/support/store/schema/state'
import mutations from 'src/support/store/schema/mutations'

import * as actions from 'src/support/store/schema/actions'
import * as getters from 'src/support/store/schema/getters'

import modules from 'src/support/store/schema/modules'

Vue.use(Vuex)

export default new Vuex.Store({state, mutations, actions, getters, modules, strict})
