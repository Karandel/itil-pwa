<template>
  <v-container fluid>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        prepend-icon="person"
        v-model="userName"
        :rules="userNameRules"
        label="Пользователь"
        required
      ></v-text-field>
      <v-text-field
        prepend-icon="lock"
        v-model="password"
        :rules="passwordRules"
        :error-messages='passwordFieldErrorMessages'
        label="Пароль"
        type="password"
        required
      ></v-text-field>
      <v-btn block color="primary" @click="onLoginClicked ()">Войти</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      userName: (localStorage.getItem('userName') === undefined, '', localStorage.getItem('userName')),
      userNameRules: [
        v => !!v || 'Пожалуйста, укажите email'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Пожалуйста, введите пароль'
      ]
    }
  },
  mounted () {
    this.$store.commit('setMainNavbarState', {title: 'ALP:ITIL', returnButton: false})
  },
  computed: {
    passwordFieldErrorMessages () {
      var passwordFieldErrorMessages = []
      if (this.$store.state.serverCallErrorDescription !== '') {
        passwordFieldErrorMessages.push(this.$store.state.serverCallErrorDescription)
      }
      return passwordFieldErrorMessages
    }
  },
  methods: {
    onLoginClicked () {
      if (!(this.$refs.form.validate())) {
        return
      }

      var payload = {
        self: this,
        requestData: {
          userName: this.userName,
          password: this.password
        }
      }
      this.$store.dispatch('loginUser', payload)
    }
  },
  name: 'Login'
}
</script>
