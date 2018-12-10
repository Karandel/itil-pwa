<template>
  <v-container>
    <template v-for="(comment, index) in comments">
        <p class='regularGreyFont no-margin-bottom'>{{comment.author}}<br>{{comment.createdDate | moment($defaultDateTimeFormat)}}</p>
        <p class='redColor no-margin-bottom' v-if='comment.hidden'>Данное сообщение скрыто от клиента</p>
        <p class='blueColor no-margin-bottom' v-if='comment.recipientsString !== ""'>{{comment.recipientsString}}</p>
        <AttachmentToDownload
          v-for="(attachment, index) in comment.attachments"
          v-bind:attachment="attachment"
          v-bind:key="index"
        ></AttachmentToDownload>
        <v-textarea
          class='no-margin-top'
          auto-grow
          :value="comment.text"
          readonly
        ></v-textarea>
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
  </v-container>
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
  .no-margin-bottom {
    margin-bottom: 0px
  }
  .no-margin-top {
    margin-top: 0px
  }
</style>

<script>
import AttachmentToDownload from '@/components/parts/AttachmentToDownload'

export default {
  components: {AttachmentToDownload},
  created () {
    this.$store.commit('setMainNavbarState', {title: 'Комментарии', returnButton: true, returnPass: {name: 'TicketView', params: { ticketNumber: this.ticketNumber }}})
    this.$store.dispatch('fetchComments', {self: this})
  },
  computed: {
    comments () {
      return this.$store.state.pageContent
    }
  },
  data () {
    return {
      ticketNumber: this.$route.params.ticketNumber
    }
  },
  methods: {
    onMessageAddClicked () {
      this.$router.push({name: 'TicketAddComment', params: { ticketNumber: this.ticketNumber }})
    }
  },
  name: 'TicketComments'
}
</script>
