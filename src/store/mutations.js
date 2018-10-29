import router from '@/router'

export default {
  newTicketComment (state) {
    router.push({name: 'TicketComments', params: {ticketNumber: state.currentTicketNumber}})
  },
  setMainNavbarState (state, payload) {
    state.mainNavbarState = payload
  },
  setGeneralErrorMsg (state, errorMsg) {
    state.generalErrorMsg = errorMsg
  },
  setCurrentTicketNumber (state, currentTicketNumber) {
    state.currentTicketNumber = currentTicketNumber
  },
  clearPageContent (state) {
    state.pageContent = {}
  },
  setIsFetching (state) {
    setStateIsFetching(state)
  },
  setDoneFetching (state) {
    state.serverCallInProgress = false
  },
  setFetchingPageContent (state) {
    setStateIsFetching(state)
    state.previousRoute.name = state.route.name
    state.previousRoute.path = state.route.path
    state.pageContent = {}
  },
  FETCH_PAGE_CONTENT (state, pageContent) {
    state.pageContent = pageContent
  },
  loginUser (state, payload) {
    localStorage.userName = payload.email
    localStorage.ALP_ITIL_API_SessionID = payload.sessionID
    if (state.previousRoute.name === 'Login' || state.previousRoute.name === '' || state.previousRoute.name === null || state.previousRoute.name === undefined) {
      router.replace({path: '/'})
    } else {
      router.replace({path: state.previousRoute.path})
    }
  },
  downloadAttachment (state, attachment) {
    var sliceSize = 512
    var byteCharacters = atob(attachment.content)
    var byteArrays = []

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize)

      var byteNumbers = new Array(slice.length)
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      var byteArray = new Uint8Array(byteNumbers)

      byteArrays.push(byteArray)
    }

    var blob = new Blob(byteArrays, {type: 'octet/stream'})
    var link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = attachment.name
    link.click()
  },
  handleApiError (state, error) {
    if (error && error.response) {
      if (error.response.status === 400) {
        if (error.response.data && error.response.data.errorDescription) {
          state.serverCallErrorDescription = error.response.data.errorDescription
        } else {
          state.generalErrorMsg = 'Ошибка получения данных. Пожалуйста, попробуйте позднее'
        }
      } else if (error.response.status === 401) {
        localStorage.ALP_ITIL_API_SessionID = null
        router.replace({name: 'Login'})
      } else {
        state.generalErrorMsg = 'Ошибка получения данных от сервера. Пожалуйста, попробуйте позднее'
      }
    } else {
      state.generalErrorMsg = 'Непредвиденная ошибка. Пожалуйста, попробуйте ещё раз'
    }
  }
}

function setStateIsFetching (state) {
  state.serverCallInProgress = true
  state.generalErrorMsg = ''
  state.serverCallErrorDescription = ''
}
