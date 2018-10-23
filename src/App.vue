<template>
  <v-app>
    <v-content class = 'backgroundWhite'>
      <MainNavbar/>
      <GeneralErrorSnackBar/>
      <ProgressBar/>
      <router-view/>
    </v-content>
  </v-app>
</template>

<style scoped>
  .backgroundWhite {
    background: white
  }
</style>

<script>
import MainNavbar from '@/components/parts/MainNavbar'
import ProgressBar from '@/components/parts/ProgressBar'
import GeneralErrorSnackBar from '@/components/parts/GeneralErrorSnackBar'

export default {
  components: {MainNavbar, ProgressBar, GeneralErrorSnackBar},
  name: 'App'
}
</script>
