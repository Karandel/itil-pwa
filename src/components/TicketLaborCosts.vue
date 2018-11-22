<template>
  <v-container>
    <template v-for="(laborCost, index) in laborCosts">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>{{laborCost.assignee}}</v-list-tile-sub-title>
          <v-list-tile-sub-title>{{laborCost.startDate | moment($defaultDateTimeFormat)}}</v-list-tile-sub-title>
          <v-list-tile-title v-html="laborCost.comment"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-if="index + 1 < laborCosts.length" :key="`divider-${index}`"></v-divider>
    </template>
  </v-container>
</template>

<script>

export default {
  created () {
    this.$store.commit('setMainNavbarState', {title: 'Трудозатраты', returnButton: true})
    this.$store.dispatch('fetchLaborCosts', {self: this})
  },
  computed: {
    laborCosts () {
      return this.$store.state.pageContent
    }
  },
  data () {
    return {
      ticketNumber: this.$route.params.ticketNumber
    }
  },
  name: 'TicketLaborCosts'
}
</script>
