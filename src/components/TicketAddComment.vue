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
      attachments: [],
      textRules: [
        v => !!v || 'Пожалуйста, заполните'
      ],
      ticketNumber: this.$route.params.ticketNumber
    }
  },
  created () {
    this.$store.commit('setMainNavbarState', {title: this.ticketNumber + '. Новый комментарий', returnButton: true})
  },
  methods: {
    submit () {
      if (!(this.$refs.form.validate())) {
        return
      }

      this.commentData.attachments = []

      for (var i = 0; i < this.attachments.length; i++) {
        var attachment = {name: '', content: ''}
        attachment.name = this.attachments[i].name

        var reader = new FileReader()

        reader.onloadend = function () {
          var binaryData = reader.result
          var base64String = window.btoa(binaryData)
          attachment.content = base64String
        }

        reader.readAsBinaryString(this.attachments[i])

        this.commentData.attachments.push(attachment)
      }

      this.$store.dispatch('addTicketComment', {self: this, commentData: this.commentData})
    }
  },
  name: 'TicketAddComment'
}
</script>
