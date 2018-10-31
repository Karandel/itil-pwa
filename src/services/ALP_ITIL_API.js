import axios from 'axios'

export default class ALP_ITIL_API {
  constructor (settings) {
    let service = axios.create({
      baseURL: settings.baseURL,
      timeout: settings.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': settings.authKey,
        'sessionid': localStorage.getItem(settings.localStorageSessionIDName)
      }
    })
    this.service = service

    service.interceptors.request.use(function (config) {
      config.headers.sessionid = localStorage.getItem(settings.localStorageSessionIDName)
      return config
    }, function (error) {
      return Promise.reject(error)
    })

    service.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      console.log(error)
      return Promise.reject(error)
    })
  }

  authUser (requestData, callback) {
    return this.service.post('/auth', requestData)
  }

  getPersonalTicketList () {
    return this.service.get('/tickets')
  }

  getTicketData (ticketNumber) {
    return this.service.get('/tickets/' + ticketNumber)
  }

  getTicketComments (ticketNumber) {
    return this.service.get('/tickets/' + ticketNumber + '/comments')
  }

  postTicketComments (ticketNumber, commentData) {
    return this.service.post('/tickets/' + ticketNumber + '/comments', commentData)
  }

  getTicketNewStatuses (ticketNumber) {
    return this.service.get('/tickets/' + ticketNumber + '/statuses')
  }

  updateTicketStatus (ticketNumber, status) {
    return this.service.post('/tickets/' + ticketNumber + '/statuses/' + status)
  }

  getAttachmentContent (attachmentID, callback) {
    return this.service.get('/attachments/' + attachmentID)
  }
}
