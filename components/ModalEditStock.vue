<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Pesan</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Tanggal</label>
          <div class="control">
            <input class="input" type="date" v-model="date">
          </div>
        </div>
        <div class="field">
          <label class="label">Datang berapa?</label>
          <div class="control">
            <input class="input" type="number" v-model="qty">
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button 
          class="button is-success" 
            @click="function() { openNewEdition({timestamp, qty}); $emit('close') }" >
          Simpan
        </button>
        <button class="button" @click="$emit('close')">Batal</button>
      </footer>
    </div>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        date: new Date().toISOString().substring(0, 10),
        qty: 100
      }
    },
    computed: {
      timestamp: function() {
        return new Date(this.date).getTime()
      }
    },
    methods: {
    ...mapActions({
      openNewEdition: 'melon/openNewEdition'
    }),

  },
  }
</script>
