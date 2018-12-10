<template>
  <v-toolbar app color="primary" dark fixed>
    <v-icon @click='onBackClicked()' v-if="returnButton">arrow_back</v-icon>
    <v-toolbar-title>{{title}}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'MainNavbar',
  computed: {
    title () {
      return this.$store.state.mainNavbarState.title
    },
    returnButton () {
      return this.$store.state.mainNavbarState.returnButton
    }
  },
  methods: {
    onBackClicked () {
      if (this.$store.state.mainNavbarState.returnPass) {
        this.$router.push(this.$store.state.mainNavbarState.returnPass)
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
