<template>
  <div>
    <v-form>
      <v-container>
        <v-text-field
          label="Организация"
          :value="user.company"
          readonly
        ></v-text-field>
        <v-text-field v-if="user.email"
          append-icon="email"
          label="Email"
          :value="user.email"
          @click:append = 'onEmailClicked(user.email)'
          @click = 'onEmailClicked(user.email)'
          readonly
        ></v-text-field>
        <v-text-field v-else
          label="Email"
          :value="user.email"
          readonly
        ></v-text-field>
        <v-text-field v-if="user.phone"
          append-icon="call"
          label="Телефон"
          :value="user.phone"
          readonly
          @click:append = 'onPhoneClicked(user.phone)'
          @click = 'onPhoneClicked(user.phone)'
        ></v-text-field>
        <v-text-field v-else
          label="Телефон"
          :value="user.phone"
          readonly          
        ></v-text-field>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.commit('setMainNavbarState', {title: this.userName, returnButton: true})
    this.$store.dispatch('fetchUserInfo', {self: this})
  },
  computed: {
    user () {
      return this.$store.state.pageContent
    }
  },
  data () {
    return {
      userID: this.$route.params.userID,
      userName: this.$route.params.userName
    }
  },
  methods: {
    onBackClicked () {
      this.$router.go(-1)
    },
    onPhoneClicked (phoneNumber) {
      if (phoneNumber) {
        window.location.href = 'tel://' + phoneNumber
      }
    },
    onEmailClicked (email) {
      if (email) {
        window.location.href = 'mailto:' + email
      }
    }
  },
  name: 'UserView'
}
</script>
