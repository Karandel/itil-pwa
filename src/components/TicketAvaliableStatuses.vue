<template>
  <v-list one-line>
    <template v-for="(status, index) in statuses">
      <v-list-tile @click='onStatusClicked (status)'>
        <v-list-tile-content>
          <v-list-tile-title>{{status.name}}</v-list-tile-title>
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
  data () {
    return {
      ticketNumber: this.$route.params.ticketNumber
    }
  },
  methods: {
    onStatusClicked (status) {
      this.$store.dispatch('updateTicketStatus', {self: this, status: status.name})
      // if (!status.actionBeforeStatus) {
      //   this.$store.dispatch('updateTicketStatus', {self: this, status: status.name})
      // } else {
      //   this.$router.push({name: 'TicketBeforeNewStatus', params: { ticketNumber: this.ticketNumber, status: status.name, actionBeforeStatus: status.actionBeforeStatus }})
      // }
    }
  },
  name: 'TicketAvaliableStatuses'
}
</script>
