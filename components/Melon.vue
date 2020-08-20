<template>
	<div>
		<div class="container">
			<div class="content">
				<h2 class="subtitle is-size-6 has-text-weight-normal">Edisi {{ overview.date.seconds | date }} <span class="is-size-7 has-text-right"><a role="button" class="is-primary has-text-weight-semibold" @click="showMES = true">edit</a></span></h2>
				<p class="has-text-right">
					<a @click="$router.push('/orders/' + overview['.key'])">lihat daftar penjualan</a>
				</p>
				
			</div>
			<div class="tile is-ancestor">
				  <div class="tile is-vertical">
				    <div class="tile">
				      <div class="tile is-parent is-vertical">
				        
				        <article v-if="isCanOrder" class="tile is-child notification is-warning">
				          <p class="title">Informasi tabung</p>
				          <div class="content">
				          	<ul>
				          		<li><strong>Datang</strong> {{ overview.stockInit }}</li>
				          		<li><strong>Sudah dipesan</strong> {{ ordered }} Tabung</li>
				          		<li><strong>Sudah dijual</strong> {{ overview.paid }} Tabung</li>
				          		
				          	</ul>
				          	
				          </div>
				          
				        </article>
				        <article v-if="!isCanOrder" class="tile is-child notification is-danger">
				          <p class="title">Kosong...</p>
				          <p class="subtitle">Gas sudah habis</p>
				          
				        </article>
				        <article class="tile is-child notification is-primary">
				          <p class="title">Ada setiap</p>
				          <p class="subtitle">
				          	{{ settings.workDays }}
				          </p>
				          <!-- <div class="content">
					          <p class="has-text-right is-size-7">
					          		<a role="button" class="is-primary has-text-weight-semibold">edit</a>
					          </p>
					       </div> -->
				        </article>
				      </div>
				      <div class="tile is-parent" v-if="isCanOrder">
				        <article class="tile is-child notification is-info">
				          <p class="title">Pesan sekarang</p>
				          <p class="subtitle">Sebelum kehabisan</p>
				          <div>
				          	<button class="button is-primary is-light is-large" @click="showMO = true">Order</button>
				          </div>
				        </article>
				      </div>
				    </div>
				  </div>
			</div>
			<div class="content has-text-right">
				<p v-if="!user">
			      Anda pemilik <strong>toko</strong>? masuk sebagai <a role="button" @click="googleSignIn()">admin</a>
			    </p>
			    <p v-if="user">
			      Ingin <a role="button" @click="googleSignOut">logout</a>?
			    </p>
			</div>
		</div>
		<Footer/>
		<modal-edit-stock v-if="showMES" @close="showMES = false"/>
		<modal-order v-if="showMO" @close="showMO = false"/>
	</div>
</template>
<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	const ModalEditStock = () => import('~/components/ModalEditStock')
	const ModalOrder = () => import('~/components/ModalOrder')
	const Footer = () => import('~/components/Footer')
	export default {
		props: ['settings', 'overview', 'isCanOrder'],
		data() {
			return {
				showMES: false,
				showMO: false
			}
		},
		components: { ModalEditStock, ModalOrder, Footer },
		computed : {
			...mapState({
				id: state => state.melon.overviewKey,
				user: state => state.auth.user
			}),
			ordered() {
				return this.overview.withgas + this.overview.withoutgas
			}
		},
		methods: {
			...mapActions({
				googleSignIn: 'auth/googleSignIn',
				googleSignOut: 'auth/googleSignOut'
			})
		},
		created() {
			this.$store.commit('melon/setKey', this.overview['.key'])

			const header = this.$store.state.melon.header
			this.$store.commit('melon/setHeader', {title: header.title, show: true})
		},
		watch: {
			overview(newValue) {
				this.$store.commit('melon/setKey', newValue['.key'])
			}
		}
	}
</script>
<style scoped>


</style>