<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-switch
          v-model="commentData.hidden"
          color=primary
          label="Скрытый комментарий"
        ></v-switch>
        <div>
          <v-btn outline color="primary" dark @click='$refs.fileInput.click()'>Вложения:</v-btn>
          <input type="file" multiple ref="fileInput" style="display: none" @change="handleFileChange($event)">
          <v-chip close
            outline
            color="primary"
            v-for="(attachment, index) in attachments"
            :key="index"
            @input="removeAttachment(index)">
            {{attachment.name}}
          </v-chip>
        </div>
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
export default {
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
    onBackClicked () {
      this.$router.go(-1)
    },
    handleFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      for (var i = 0; i < files.length; i++) {
        this.attachments.push(files[i])
      }
      this.$refs.fileInput.value = ''
    },
    removeAttachment (index) {
      if (index > -1) {
        this.attachments.splice(index, 1)
      }
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.$ALP_ITIL_API.postTicketComments(this.ticketNumber, this.commentData, this.attachments)
      }
    }
  },
  name: 'TicketAddComment'
}
</script>
