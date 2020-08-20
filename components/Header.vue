<template>
    <h1 v-if="show" class="title is-4"><a @click="$router.push('/')" class="has-text-dark">{{ title }}</a></h1>
    
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null
    },
    ...mapGetters({
      title: 'melon/getTitle',
      show: 'melon/showHeader'
    })
  }
}
</script>
<style scoped>

</style>
