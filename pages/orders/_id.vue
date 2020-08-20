<template>
  <div>

  <Loading :active="!orders" />
  <section class="hero is-info">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Omset
      </h1>
      <h2 class="subtitle">
        {{ omset | currency }}
      </h2>
    </div>
  </div>
</section>
  <div class="container">
    <div class="content">
      <p class="has-text-right" style="margin-top: 0.5rem">
          <a @click="$router.push('/')">kembali ke halaman awal</a>
        </p>
      <div class="flex">
        <input class="input input-box" type="text" placeholder="Cari disini" v-model="search">
      </div>
        
        <div class="columns is-multiline">
          <div class="column is-one-quarter clickable" role="button" v-for="order of corders" @click="select(order)">
            <p 
            :class="{ 'is-light': order.status == 0, 'is-warning': order.status == 1, 'is-primary': order.status == 2, 'is-dark': order.status == -1 }"
            class="notification has-text-weight-bold">{{ order.name }} ({{ order.qty }})</p>
          </div>
        </div>
        <p v-if="corders.length <= 0" class="has-text-centered has-text-weight-semibold">tidak ada data sesuai kata kunci</p>
      
    </div>
  </div>
  <modal-change-status v-if="showMCS" @close="showMCS = false" :selected="selected" />
  </div>
</template>
<script>
  const Loading = () => import('~/components/Loading')
  const ModalChangeStatus = () => import('~/components/ModalChangeStatus')
  import { db } from '~/service/firebase'
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        search: '',
        selected: {},
        orders: [],
        showMCS: false
      }
    },
    methods: {
      select(order) {
        this.selected.status = order.status
        this.selected.id = order['.key']
        this.selected.overviewId = order.groupId
        this.selected.qty = order.qty
        this.selected.price = order.price

        this.showMCS = true;
      }
    },
    computed: {
      corders() {
        return this.orders.filter(
          (value) => value.name.toLocaleLowerCase().includes(this.search) ||
          value.qty == this.search
          )
      },
      omset() {
        return this.orders.reduce((acc, cur) => {
          if (cur.status == 2) return acc + (cur.qty * cur.price)
          return acc
        }, 0)
      }
    },
    firestore() {
      return {
        orders: db.collection('orders').where('groupId', '==', this.$route.params.id)
      }
    },
    created() {
      const header = this.$store.state.melon.header;
      this.$store.commit('melon/setHeader', {title: header.title, show: false})
    },
    components: { Loading, ModalChangeStatus },
  }
</script>
<style scoped>
  .input-box {
    width: 100%;
    max-width: 240px;

  }
  .clickable {
    cursor: pointer;
  }
  .flex {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 1.5rem;
  }
  .flex > div {
    display: inline-flex;
  }
</style>