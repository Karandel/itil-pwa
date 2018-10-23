<template>
  <v-snackbar
    :value='errorMsg'
    :top = 'true'
    :timeout = '0'
  >
    {{errorMsg}}
    <v-btn
      dark
      flat
      @click="onCloseClicked"
    >
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    errorMsg () {
      return this.$store.state.generalErrorMsg
    }
  },
  methods: {
    onCloseClicked () {
      this.$store.commit('setGeneralErrorMsg', '')
    }
  },
  name: 'GeneralErrorSnackBar'
}
</script>
