<template>
  <v-form>
    <v-container>
      <h2>{{ticket.title}}</h2>
      <v-text-field
        label="Тип"
        :value="ticket.type"
        readonly
      ></v-text-field>
      <v-text-field
        append-outer-icon="open_in_new"
        label="Инициатор"
        :value="authorName"
        @click:append-outer = 'onUserViewOpenClicked(ticket.author)'
        readonly
      ></v-text-field>
      <v-text-field v-if="ticket.user !== '' && ticket.user !== null"
        append-outer-icon="open_in_new"
        label="Пользователь"
        :value="userName"
        @click:append-outer = 'onUserViewOpenClicked(ticket.user)'
        readonly
      ></v-text-field>
      <v-text-field
        append-outer-icon="open_in_new"
        label="Менеджер"
        :value="managerName"
        @click:append-outer = 'onUserViewOpenClicked(ticket.manager)'
        readonly
      ></v-text-field>
      <v-text-field
        append-icon="edit"
        append-outer-icon="open_in_new"
        label="Исполнитель"
        :value="assigneeName"
        @click:append-outer = 'onUserViewOpenClicked(ticket.assignee)'
        readonly
      ></v-text-field>
      <v-text-field v-if="ticket.canChangeStatus"
        append-icon="edit"
        label="Текущий этап"
        :value="ticket.status"
        @click = 'onTicketStatusClicked()'
        @click:append = 'onTicketStatusClicked()'
        readonly
      ></v-text-field>
      <v-text-field v-if="!ticket.canChangeStatus"
        label="Текущий этап"
        :value="ticket.status"
        readonly
      ></v-text-field>
      <v-text-field
        label="Крайний срок"
        :value="ticket.deadlineDate | moment(this.$defaultDateTimeFormat)"
        readonly
      ></v-text-field>
      <AttachmentToDownload
        v-for="(attachment, index) in ticket.attachments"
        v-bind:attachment="attachment"
        v-bind:key="index"
      ></AttachmentToDownload>
      <v-textarea
        auto-grow
        label="Описание"
        :value="ticket.description"
        readonly
      ></v-textarea>
    </v-container>
    <v-bottom-nav
        :active.sync="bottomNav"
        :value="true"
        fixed
        color="white"
      >
        <v-btn
          color="teal"
          flat
          value ='active'
          @click="onTicketCommentsClicked()"
        >
          <span>Комментарии</span>
          <v-badge color="red">
            <span slot="badge">{{ticket.commentsCount}}</span>
            <v-icon>message</v-icon>
          </v-badge>
        </v-btn>

        <v-btn
          color="teal"
          flat
          value ='active'
          @click="onTicketTimeSheetClicked()"
        >
          <span>Трудозатраты</span>
          <v-icon>timer</v-icon>
        </v-btn>

      </v-bottom-nav>
  </v-form>
</template>

<script>
import AttachmentToDownload from '@/components/parts/AttachmentToDownload'

export default {
  components: {AttachmentToDownload},
  created () {
    this.$store.commit('setMainNavbarState', {title: this.ticketNumber, returnButton: true})
    this.$store.dispatch('fetchTicket', {self: this})
  },
  computed: {
    ticket () {
      return this.$store.state.pageContent
    },
    authorName () {
      return (this.ticket && this.ticket.author && this.ticket.author.name ? this.ticket.author.name : '')
    },
    userName () {
      return (this.ticket && this.ticket.user && this.ticket.user.name ? this.ticket.user.name : '')
    },
    managerName () {
      return (this.ticket && this.ticket.manager && this.ticket.manager.name ? this.ticket.manager.name : '')
    },
    assigneeName () {
      return (this.ticket && this.ticket.assignee && this.ticket.assignee.name ? this.ticket.assignee.name : '')
    }
  },
  data () {
    return {
      bottomNav: 'active',
      ticketNumber: this.$route.params.ticketNumber
    }
  },
  methods: {
    onUserViewOpenClicked (user) {
      if (user) {
        this.$router.push({name: 'UserView', params: { userName: user.name, userID: user.id }})
      }
    },
    onTicketStatusClicked () {
      this.$router.push({name: 'TicketAvaliableStatuses', params: { ticketNumber: this.ticketNumber }})
    },
    onTicketCommentsClicked () {
      this.$router.push({name: 'TicketComments', params: { ticketNumber: this.ticketNumber }})
    },
    onTicketTimeSheetClicked () {
      this.$router.push({name: 'TicketLaborCosts', params: { ticketNumber: this.ticketNumber }})
    },
    onAttachmentClicked (attachment) {
      var payload = {
        self: this,
        attachment: attachment
      }
      this.$store.dispatch('fetchAttachmentContent', payload)
    }
  },
  name: 'TicketView'
}
</script>
