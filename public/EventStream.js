// eslint-disable-next-line no-unused-vars
class EventStreamClient {
  constructor() {
    this.socket = null
    this.text = []
    this.$onCallback = null
    this.status = 'init'
  }

  setStatus(status) {
    this.status = status
  }

  connect() {
    this.setStatus('ttsing')
    const URL = 'http://localhost:88/stream'

    if (this.socket !== null) {
      this.socket.close()
    }

    // eslint-disable-next-line no-undef
    this.socket = new EventSource(URL)

    this.socket.onmessage = (e) => {
      this.onMessage(e.data)
    }

    this.socket.onerror = (e) => {
      this.setStatus('error')
    }

    this.socket.onclose = (event) => {
      this.onClose(event)
    }
  }

  $on(callback) {
    this.$onCallback = callback
  }

  $emit(text) {
    switch (this.status) {
      case 'init':
      case 'error':
      case 'close':
        this.connect()
        return
    }

    const params = {
      messages: text,
      responseArray: ['id', 'created', 'usage'],
      temperature: '0.5'
    }

    this.socket.send(JSON.stringify(params))
  }

  onMessage(e) {
    if (typeof this.$onCallback === 'function') {
      this.$onCallback(e)
    }
  }
  onClose() {
    if (this.socket) {
      this.setStatus('close')
      this.socket.close()
    }
  }
}

// export default EventStreamClient
