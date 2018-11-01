<template>
  <v-snackbar
    v-model='visible'
    :top = 'true'
    :timeout = '5000'
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
  data () {
    return {
      visible: false
    }
  },
  computed: {
    errorMsg () {
      return this.$store.state.generalErrorMsg
    }
  },
  methods: {
    onCloseClicked () {
      this.visible = false
    }
  },
  watch: {
    visible: function (newValue, oldValue) {
      if (oldValue && !newValue) {
        this.$store.commit('setGeneralErrorMsg', '')
      }
    },
    '$store.state.generalErrorMsg': function (value) {
      if (value) {
        this.visible = true
      } else {
        this.visible = false
      }
    }
  },
  name: 'GeneralErrorSnackBar'
}
</script>
