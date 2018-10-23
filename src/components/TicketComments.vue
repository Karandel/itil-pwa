<template>
  <div>
    <template v-for="(comment, index) in comments">
      <v-container>
        <p class = 'regularGreyFont'>{{comment.author}}<br>{{comment.createdDate | moment($defaultDateTimeFormat)}}</p>
        <p class = 'redColor' v-if='comment.hidden'>Данное сообщение скрыто от клиента</p>
        <p class = 'blueColor' v-if='comment.recipientsString !== ""'>{{comment.recipientsString}}</p>
        <template v-for="(attachment, index) in comment.attachments">
          <v-chip outline color="primary" @click = 'onAttachmentClicked(attachment)'>
            <v-progress-circular
              indeterminate
              color="primary"
              v-if='attachment.downloading'
            ></v-progress-circular>
            <v-icon left v-if='!attachment.downloading'>save_alt</v-icon>{{attachment.name + "(" + attachment.size + ")"}}
          </v-chip>
        </template>
        <v-textarea
          auto-grow
          :value="comment.text"
          readonly
        ></v-textarea>
      </v-container>
    </template>
    <v-footer
      fixed
      color = 'transparent'
    >

        <v-btn
          @click='onMessageAddClicked()'
          absolute
          dark
          fab
          top
          right
          color="primary"
        >
          <v-icon>add</v-icon>
        </v-btn>
    </v-footer>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .regularFontSize {
    font-size: 16px
  }
  .regularGreyFont {
    color: rgba(0,0,0,.54)
  }
  .blueColor {
    color: rgb(0,0,255)
  }
  .redColor {
    color: rgb(255,0,0)
  }
</style>

<script>
export default {
  created () {
    this.$store.commit('setMainNavbarState', {title: 'Комментарии', returnButton: true})
    this.$store.dispatch('fetchComments', {self: this})
  },
  computed: {
    comments () {
      return this.$store.state.pageContent
    }
  },
  methods: {
    onBackClicked () {
      this.$router.go(-1)
    },
    onMessageAddClicked () {
      this.$router.push({name: 'TicketAddComment', params: { ticketNumber: 'IT-000000338249' }})
    },
    onAttachmentClicked (attachment) {
      var payload = {
        self: this,
        attachment: attachment
      }
      this.$store.dispatch('fetchAttachmentContent', payload)
    }
  },
  name: 'TicketComments'
}
</script>
