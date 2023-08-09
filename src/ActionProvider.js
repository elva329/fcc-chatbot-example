import axios from "axios";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // comment default function

  // greet() {
  //   const greetingMessage = this.createChatBotMessage("Hi, friend.");
  //   this.updateChatbotState(greetingMessage);
  // }

  // handleJavascriptList = () => {
  //   const message = this.createChatBotMessage(
  //     "Fantastic, I've got the following resources for you on Javascript:",
  //     {
  //       widget: "javascriptLinks",
  //     }
  //   );

  //   this.updateChatbotState(message);
  // };

  async retrieveResponse(message) {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWIwZjYxOTMtNWJjZi00NDM2LWI1YTYtYWNkMWMzYzdiMWNjIiwidHlwZSI6ImFwaV90b2tlbiJ9.vBJAUFJT1y6QmvYtqFd_yaPkzuLXzYBUWvQ8ZYu3C9k";
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/generation",
      headers: { Authorization: "Bearer " + token },
      data: {
        providers: "cohere",
        text: message,
        temperature: 0.2,
        max_tokens: 250,
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log("response", response.data);
        const message = this.createChatBotMessage(
          response.data.cohere.generated_text
        );
        console.log("message", message);
        this.updateChatbotState(message);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateChatbotState(message) {
    // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
