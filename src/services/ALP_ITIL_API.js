import axios from 'axios'

export default class ALP_ITIL_API {
  constructor () {
    let service = axios.create({
      baseURL: process.env.ALP_ITIL_API.BASE_URL,
      timeout: 100000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.ALP_ITIL_API.API_KEY,
        'sessionid': localStorage.getItem('ALP_ITIL_API_SessionID')
      }
    })
    this.service = service

    service.interceptors.request.use(function (config) {
      config.headers.sessionid = localStorage.getItem('ALP_ITIL_API_SessionID')
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
    return this.service.get('/tickets/' + ticketNumber + '/newStatuses')
  }

  getAttachmentContent (attachmentID, callback) {
    return this.service.get('/attachments/' + attachmentID)
  }
}
