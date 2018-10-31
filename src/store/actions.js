export default {
  loginUser ({commit}, payload) {
    commit('setIsFetching')
    payload.self.$ALP_ITIL_API.authUser(payload.requestData)
      .then((response) => {
        if (response && response.data && response.data.sessionID) {
          var commitPayload = {
            email: payload.requestData.email,
            sessionID: response.data.sessionID
          }
          commit('loginUser', commitPayload)
        } else {
          throwErrornoDataInServerResponse()
        }
      })
      .catch((error) => {
        commit('handleApiError', error)
      })
      .finally(() => {
        commit('setDoneFetching')
      })
  },
  fetchTickets ({commit}, {self}) {
    commit('setFetchingPageContent')
    self.$ALP_ITIL_API.getPersonalTicketList()
      .then((response) => {
        if (response && response.data && response.data.tickets) {
          commit('FETCH_PAGE_CONTENT', response.data.tickets)
        } else {
          throwErrornoDataInServerResponse()
        }
      })
      .catch((error) => {
        commit('handleApiError', error)
      })
      .finally(() => {
        commit('setDoneFetching')
      })
  },
  fetchTicket ({commit}, {self}) {
    commit('setFetchingPageContent')
    self.$ALP_ITIL_API.getTicketData(this.state.currentTicketNumber)
      .then((response) => {
        if (response && response.data && response.data.ticket) {
          if (response.data.ticket.attachments) {
            response.data.ticket.attachments.forEach(function (element) {
              element.downloading = false
            })
          }
          commit('FETCH_PAGE_CONTENT', response.data.ticket)
        } else {
          throwErrornoDataInServerResponse()
        }
      })
      .catch((error) => {
        commit('handleApiError', error)
      })
      .finally(() => {
        commit('setDoneFetching')
      })
  },
  fetchComments ({commit}, {self}) {
    commit('setFetchingPageContent')
    self.$ALP_ITIL_API.getTicketComments(this.state.currentTicketNumber)
      .then((response) => {
        if (response && response.data && response.data.comments) {
          commit('FETCH_PAGE_CONTENT', response.data.comments)
        } else {
          throwErrornoDataInServerResponse()
        }
      })
      .catch((error) => {
        commit('handleApiError', error)
      })
      .finally(() => {
        commit('setDoneFetching')
      })
  },
  addTicketComment ({commit}, payload) {
    commit('setIsFetching')
    payload.self.$ALP_ITIL_API.postTicketComments(this.state.currentTicketNumber, payload.commentData)
      .then((response) => {
        commit('newTicketComment')
      })
      .catch((error) => {
        commit('handleApiError', error)
      })
      .finally(() => {
        commit('setDoneFetching')
      })
  },
  fetchTicketNewStatuses ({commit}, {self}) {
    commit('setFetchingPageContent')
    self.$ALP_ITIL_API.getTicketNewStatuses(this.state.currentTicketNumber)
      .then((response) => {
        if (response && response.data && response.data.statuses) {
          commit('FETCH_PAGE_CONTENT', response.data.statuses)
        } else {
          throwErrornoDataInServerResponse()
        }
      })
      .catch((error) => {
        commit('handleApiError', error)
      })
      .finally(() => {
        commit('setDoneFetching')
      })
  },
  fetchAttachmentContent ({commit}, payload) {
    payload.attachment.downloading = true
    payload.self.$ALP_ITIL_API.getAttachmentContent(payload.attachment.id)
      .then((response) => {
        if (response && response.data && response.data.attachment) {
          commit('downloadAttachment', response.data.attachment)
        } else {
          throwErrornoDataInServerResponse()
        }
      })
      .catch((error) => {
        commit('handleApiError', error)
      })
      .finally(() => {
        payload.attachment.downloading = false
      })
  }
}

function throwErrornoDataInServerResponse () {
  var error = new Error('noDataInServerResponse')
  console.log(error)
  throw error
}
