import { db, firebase, fv } from '~/service/firebase'

const state = () => ({
	overviewKey: '',
	header: {
		title: 'melonku',
		show: true
	}
})

// getters
const getters = {
	getTitle(state) {
		return state.header.title
	},
	showHeader(state) {
		return state.header.show
	}
}

// actions
const actions = {
	async updateStatusOrder({ state }, payload) {
		try {
			let newOrder = await db.collection('orders')
			.doc(payload.id)
			.update('status', payload.status)
		} catch (err) {
			console.error(err)
		}
	},
	async addOrder({ state }, payload) {
		try {
			let newOrder = await db.collection('orders').add({
				groupId: state.overviewKey,
				name: payload.name,
				qty: payload.qty,
				status: payload.status,
				price: payload.price,
				date: new Date()
			})
		} catch (err) {
			console.error(err)
		}
	},
	async openNewEdition({}, payload) {
		try {
			let newOverview = await db.collection('overview').add({
				created: fv.serverTimestamp(),
				date: new Date(payload.timestamp),
				stockInit: payload.qty,
				withoutgas: 0,
				withgas: 0,
				paid: 0,
				drop: 0
			})
		} catch(err) {
			console.error(err)
		}
	},
	async incrementFieldValue({}, { qty, newStatus, oldStatus, collection, docId }) {
	    function getField(status) {
	        if (status == 0) return 'withoutgas'
	        if (status == 1) return 'withgas'
	        if (status == 2) return 'paid'
	        if (status == -1) return 'drop' 
	    }

	    try {
	      let obj = {}
	      if (newStatus) obj[getField(newStatus)] = fv.increment(parseInt(qty))
	      if (oldStatus) obj[getField(oldStatus)] = fv.increment(-parseInt(qty))
	      let updated = db.collection(collection)
	        .doc(docId)
	        .set(obj,{merge: true})
	    } catch(err) {
	      console.error(err)
	    }
	  }
}

// mutation
const mutations = {
	setKey(state, payload) {
		state.overviewKey = payload
	},
	setHeader(state, payload) {
		state.header = payload
	}

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

