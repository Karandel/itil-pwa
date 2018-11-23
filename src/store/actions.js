export default {
  loginUser ({commit}, payload) {
    commit('setIsFetching')
    payload.self.$ALP_ITIL_API.authUser(payload.requestData)
      .then((response) => {
        if (response && response.data && response.data.sessionID) {
          var commitPayload = {
            userName: payload.requestData.userName,
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
          commit('setPageContent', response.data.tickets)
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
    self.$ALP_ITIL_API.getTicketData(self.ticketNumber)
      .then((response) => {
        if (response && response.data && response.data.ticket) {
          if (response.data.ticket.attachments) {
            response.data.ticket.attachments.forEach(function (element) {
              element.downloading = false
            })
          }
          commit('setPageContent', response.data.ticket)
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
  fetchLaborCosts ({commit}, {self}) {
    commit('setFetchingPageContent')
    self.$ALP_ITIL_API.getTicketLaborCosts(self.ticketNumber)
      .then((response) => {
        if (response && response.data && response.data.laborCosts) {
          commit('setPageContent', response.data.laborCosts)
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
    self.$ALP_ITIL_API.getTicketComments(self.ticketNumber)
      .then((response) => {
        if (response && response.data && response.data.comments) {
          commit('setPageContent', response.data.comments)
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
    payload.self.$ALP_ITIL_API.postTicketComments(payload.self.ticketNumber, payload.commentData)
      .then((response) => {
        commit('newTicketComment', payload.self.ticketNumber)
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
    self.$ALP_ITIL_API.getTicketNewStatuses(self.ticketNumber)
      .then((response) => {
        if (response && response.data && response.data.statuses) {
          commit('setPageContent', response.data.statuses)
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
  updateTicketStatus ({commit}, payload) {
    commit('setIsFetching')
    payload.self.$ALP_ITIL_API.updateTicketStatus(payload.self.ticketNumber, payload.status)
      .then((response) => {
        commit('newTicketStatus', payload.self.ticketNumber)
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
