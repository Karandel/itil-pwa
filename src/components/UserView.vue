<template>
  <div>
    <v-toolbar app color="primary" dark fixed>
      <v-icon @click='onBackClicked'>arrow_back</v-icon>
      <v-toolbar-title>{{user.name}}</v-toolbar-title>
    </v-toolbar>
    <v-form>
      <v-container>
        <v-text-field
          label="Организация"
          :value="user.company"
          readonly
        ></v-text-field>
        <v-text-field
          append-icon="email"
          label="Email"
          :value="user.email"
          @click:append = 'onEmailClicked(user.email)'
          @click = 'onEmailClicked(user.email)'
          readonly
        ></v-text-field>
        <v-text-field
          append-icon="call"
          label="Телефон"
          :value="user.phone"
          readonly
          @click:append = 'onPhoneClicked(user.phone)'
          @click = 'onPhoneClicked(user.phone)'
        ></v-text-field>
      </v-container>
    </v-form>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>
export default {
  data () {
    return {
      bottomNav: 'message',
      user:
      {
        name: 'Петров Петр',
        company: 'Рога и Копыта',
        email: 'test@test.test',
        phone: '+7-999-999-99-99'
      }
    }
  },
  methods: {
    onBackClicked () {
      this.$router.go(-1)
    },
    onPhoneClicked (phoneNumber) {
      window.location.href = 'tel://' + phoneNumber
    },
    onEmailClicked (email) {
      window.location.href = 'mailto:' + email
    }
  },
  name: 'UserView'
}
</script>
