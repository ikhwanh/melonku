<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Pesan tabung</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Nama</label>
          <div class="control">
            <input class="input" type="text" placeholder="Isikan namamu" v-model="name">
          </div>
        </div>

        <div class="field">
          <label class="label">Jumlah</label>
          <div class="control">
            <input class="input" type="number" v-model="qty">
          </div>
        </div>

        <div class="field">
          <label class="label">Status</label>
          <div class="control">
            <div class="select">
              <select v-model="status">
                <option value="0">Hanya bilang</option>
                <option value="1">Gas ada</option>
                <option value="2">Lunas</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Harga</label>
          <div class="select" v-model="price">
            <select>
              <option value="18000">{{ 18000 | currency }}</option>
              <option value="17500">{{ 17500 | currency }}</option>
              <option value="17000">{{ 17000 | currency }}</option>
            </select>
          </div>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" 
            @click="function() { addOrder({name,qty,status,price});increment(); $emit('close'); }">
          Simpan
        </button>
      </footer>
    </div>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        name: null,
        qty: 1,
        status: 1,
        price: 18000
      }
    },
    computed: {
      ...mapState({
        docId: state => state.melon.overviewKey
      })
    },
    methods: {
      ...mapActions({
        addOrder: 'melon/addOrder',
      }),
      increment() {
        this.$store.dispatch('melon/incrementFieldValue', {
          qty: this.qty, 
          newStatus: this.status, 
          collection: 'overview', 
          docId: this.docId
        })
      }
    }
  }
</script>
