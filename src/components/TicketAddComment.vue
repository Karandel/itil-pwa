<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-switch
          v-model="commentData.hidden"
          color=primary
          label="Скрытый комментарий"
        ></v-switch>
        <AddAttachments v-bind:attachments="attachments"></AddAttachments>
        <v-textarea
          v-model="commentData.text"
          :rules = 'textRules'
          label="Текст комментария"
          required
        ></v-textarea>
        <v-btn
          color="primary"
          dark
          @click="submit"
        >
          Добавить
        </v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import AddAttachments from '@/components/parts/AddAttachments'

export default {
  components: {AddAttachments},
  data () {
    return {
      valid: false,
      commentData: {
        hidden: false,
        text: ''
      },
      textRules: [
        v => !!v || 'Пожалуйста, заполните'
      ],
      ticketNumber: this.$route.params.ticketNumber,
      attachments: []
    }
  },
  mounted () {
    this.$store.commit('setMainNavbarState', {title: 'Новый комментарий', returnButton: true})
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$ALP_ITIL_API.postTicketComments(this.ticketNumber, this.commentData, this.attachments)
      }
    }
  },
  name: 'TicketAddComment'
}
</script>
