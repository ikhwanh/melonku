<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Ubah status</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <p>
            <span class="has-text-weight-semibold">Informasi:</span>
            <ul>
              <li>Harga: {{ price | currency }}</li>
              <li>Jumlah: {{ qty }}</li>
              <li>Total: {{ price * qty | currency }}</li>

            </ul>
          </p>
        </div>
        <div class="control">
          <div class="select">
            <select v-model="stat">
              <option value="0">Hanya bilang</option>
              <option value="1">Ada gas</option>
              <option value="2">Lunas</option>
              <option value="-1">Batal</option>
            </select>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="update()">Simpan</button>
      </footer>
    </div>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    props: ['selected'],
    data() {
      return {
        id: '',
        overviewId: '',
        stat: -2,
        qty: 0,
        price: 0,
        oldStatus: -2,
        isChanged: false
      }
    },
    computed: {
    },
    methods: {
      update() {
        if (this.isChanged) {
          let collection = 'overview'
          let docId = this.overviewId
          this.$store.dispatch(
            'melon/updateStatusOrder', 
            {id: this.id, status: this.stat}
          )
          this.$store.dispatch(
            'melon/incrementFieldValue',
            {
              qty: this.qty, 
              newStatus: this.stat, 
              oldStatus: this.oldStatus, 
              collection, 
              docId
            }
          )
          
          this.$emit('close')
        }
      }
    },
    watch: {
      stat(newValue) {
        if (newValue != this.oldStatus) {
          this.isChanged = true
        } else if (newValue == this.oldStatus) {
          this.isChanged = false
        }
      }
    },
    created() {
      this.stat = this.selected.status
      this.oldStatus = this.selected.status
      this.qty = this.selected.qty
      this.id = this.selected.id
      this.overviewId = this.selected.overviewId
      this.price = this.selected.price
    }
  }
</script>
