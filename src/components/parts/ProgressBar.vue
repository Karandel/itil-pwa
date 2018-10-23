<template>
  <v-progress-linear :indeterminate="true" v-if="serverCallInProgress"></v-progress-linear>
</template>

<script>
export default {
  name: 'ProgressBar',
  computed: {
    serverCallInProgress () {
      return this.$store.state.serverCallInProgress
    }
  }
}
</script>
