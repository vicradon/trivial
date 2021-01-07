"use strict";

class ChatController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }
  onMessage(message) {
    this.socket.broadcastToAll("message", message);
  }
  onOnline() {
    const userCount = this.socket.channel.subscriptions.get("chat").size;
    console.log("chat", userCount);

    this.socket.broadcastToAll("userCount", userCount);
  }
}

module.exports = ChatController;
