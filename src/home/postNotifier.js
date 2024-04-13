  class EventMessage {
    constructor(discussion, username, text) {
      this.discussion = discussion;
      this.username = username;
      this.text = text;
    }
  }
  
  class PostEventNotifier {
    events = [];
    handlers = [];
  
    constructor() {
      let port = window.location.port;
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
      console.log('WebSocket connection configured');
      this.socket.onopen = (event) => {
        console.log('WebSocket connection opened');
      };
      this.socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
      };
      this.socket.onmessage = async (event) => {
        try {
          const msg = JSON.parse(await event.data.text());
          this.receiveEvent(msg);
        } catch {}
      };
    }
  
    broadcastEvent(discussion, username, text) {
      console.log(this.handlers);
      const event = new EventMessage(discussion, username, text);
      this.socket.send(JSON.stringify(event));
    }
  
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    removeHandler(handler) {
      this.handlers.filter((h) => h !== handler);
    }
  
    receiveEvent(event) {
      this.events.push(event);
      
      this.events.forEach((e) => {
        this.handlers.forEach((handler) => {
          handler(e);
        });
      });
    }
  }
  
  const PostNotifier = new PostEventNotifier();
  export { PostNotifier };