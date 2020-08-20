<template>
  <div>
    <Loading :active="!settings" />
    <div v-if="settings && overview[0]">
      <Melon :settings="settings" :overview="overview[0]" :isCanOrder="overview[0].stockInit - overview[0].paid > 0" />
    </div>
  </div>
</template>
<script>
const Melon = () => import ('~/components/Melon')
const Loading = () => import('~/components/Loading')
import { db } from '~/service/firebase'
export default {
  data() {
    return {
      loading: false,
      closed: true,
      settings: [],
      overview: []
    }
  },
  firestore() {
    return {
      settings: db.collection('settings').doc('general'),
      overview: db.collection('overview').orderBy('created', 'desc').limit(1)
    }
  },
  methods: {},
  created() {
    
  },
  components: { Loading, Melon }
}
</script>
