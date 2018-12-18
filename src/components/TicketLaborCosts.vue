<template>
  <v-container>
    <template v-for="(laborCost, index) in laborCosts">
      <p class='regularGreyFont no-margin-bottom'>{{laborCost.assignee}}</p>
      <p class='blueColor no-margin-bottom' v-if='laborCost.overtime'>{{laborCost.startDate | moment($defaultDateTimeFormat)}} ({{laborCost.hoursSpent}}ч сверхурочно)</p>
      <p class='blueColor no-margin-bottom' v-else>{{laborCost.startDate | moment($defaultDateTimeFormat)}} ({{laborCost.hoursSpent}}ч)</p>
      <v-textarea
        class='no-margin-top'
        auto-grow
        :value="laborCost.comment"
        readonly
      ></v-textarea>
    </template>
  </v-container>
</template>

<style scoped>
  .regularFontSize {
    font-size: 16px
  }
  .regularGreyFont {
    color: rgba(0,0,0,.54)
  }
  .blueColor {
    color: rgb(0,0,255)
  }
  .redColor {
    color: rgb(255,0,0)
  }
  .no-margin-bottom {
    margin-bottom: 0px
  }
  .no-margin-top {
    margin-top: 0px
  }
</style>

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
