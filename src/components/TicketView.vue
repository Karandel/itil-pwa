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
        :value="ticket.author"
        @click:append-outer = 'onUserViewOpenClicked(ticket.author)'
        readonly
      ></v-text-field>
      <v-text-field v-if="ticket.user !== '' && ticket.user !== null"
        append-outer-icon="open_in_new"
        label="Пользователь"
        :value="ticket.user"
        @click:append-outer = 'onUserViewOpenClicked(ticket.user)'
        readonly
      ></v-text-field>
      <v-text-field
        append-outer-icon="open_in_new"
        label="Менеджер"
        :value="ticket.manager"
        @click:append-outer = 'onUserViewOpenClicked(ticket.manager)'
        readonly
      ></v-text-field>
      <v-text-field
        append-icon="edit"
        append-outer-icon="open_in_new"
        label="Исполнитель"
        :value="ticket.assignee"
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
    }
  },
  data () {
    return {
      bottomNav: 'active',
      ticketNumber: this.$route.params.ticketNumber
    }
  },
  methods: {
    onUserViewOpenClicked (userName) {
      this.$router.push({name: 'UserView', params: { name: userName }})
    },
    onTicketStatusClicked () {
      this.$router.push({name: 'TicketAvaliableStatuses', params: { ticketNumber: this.ticketNumber }})
    },
    onTicketCommentsClicked () {
      this.$router.push({name: 'TicketComments', params: { ticketNumber: this.ticketNumber }})
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
