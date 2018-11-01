<template>
  <v-text-field v-if="actionBeforeStatus.comment"
    label="Текущий этап"
    value="123"
    readonly
  ></v-text-field>
</template>

<script>
export default {
  created () {
    this.$store.commit('setMainNavbarState', {title: this.status, returnButton: true})
  },
  data () {
    return {
      ticketNumber: this.$route.params.ticketNumber,
      status: this.$route.params.status,
      actionBeforeStatus: this.$route.params.actionBeforeStatus
    }
  },
  name: 'TicketBeforeNewStatus'
}
</script>
