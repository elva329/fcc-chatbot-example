// MessageParser starter code in MessageParser.js
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    this.actionProvider.retrieveResponse(lowerCaseMessage);
  }
}

export default MessageParser;
