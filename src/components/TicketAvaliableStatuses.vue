<template>
  <v-list one-line>
    <template v-for="(status, index) in statuses">
      <v-list-tile @click='onStatusClicked (status)'>
        <v-list-tile-content>
          <v-list-tile-title>{{status}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-if="index + 1 < statuses.length" :key="`divider-${index}`"></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  created () {
    this.$store.commit('setMainNavbarState', {title: 'Выберите новый этап', returnButton: true})
    this.$store.dispatch('fetchTicketNewStatuses', {self: this})
  },
  computed: {
    statuses () {
      return this.$store.state.pageContent
    }
  },
  methods: {
    onStatusClicked (status) {
      alert(status)
    }
  },
  name: 'TicketAvaliableStatuses'
}
</script>
