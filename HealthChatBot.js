// Import necessary modules
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import { Icon } from 'react-native-elements';

const HealthChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [textInputValue, setTextInputValue] = useState('');

    // Function to handle sending messages
    /* 
    This function sends the user's message to the chatbot API and then adds the chatbot's response to the messages array, 
    causing it to be displayed in the chat area.
    */
    const sendMessage = async (message) => {
      setTextInputValue(''); // Clear the text input after sending the message
      
      // Create a new message object for the user's message
      const newUserMessage = { text: message, sender: 'user' };

      console.log('Response data:', data)

      // Update the messages state with the new user message
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);

      // Format user message with <user> and <agent> tags
      const formattedMessage = '<user> ' + message + ' <agent>'
    
      // Send message to the chatbot API
      const response = await fetch(
        'https://api.llama-health-chat.com/predict',// 'https://Llama-health-chatbot-env.eba-8jfmcypd.us-east-1.elasticbeanstalk.com/predict', // URL of the chatbot API
        {
          method: 'POST', // Send data using POST method
          headers: {
            'Content-Type': 'application/json', // Specify content type as JSON
          },
          // body: JSON.stringify({ text: message }), // Send message as JSON string in the body
          body: JSON.stringify({ text: formattedMessage }), // Send formatted message as JSON string in the body

        }
      );
  // Parse response from the API
  const data = await response.json(); // Convert response to JSON format

  // Extract bot response from the received data
  let botMessage = data.generated_text;
  
  // Remove the user message from the beginning of the bot message
  const formattedBotMessage = botMessage.replace(formattedMessage, "");

  // Create a new message object for the bot's response
  const newBotMessage = { text: formattedBotMessage.trim(), sender: 'bot' };

  // Trim the bot message to stop when another token is received
  const regex = /<.*?>/;
  const match = newBotMessage.text.match(regex);
  const trimmedMessage = match ? newBotMessage.text.substring(0, newBotMessage.text.indexOf(match[0])) : newBotMessage.text;
  newBotMessage.text = trimmedMessage;
  
  // Update the messages state with the new bot message
  setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    };
    

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Wolcome to TherapAI</Text>
        <Icon name="heart" type="font-awesome" color="#2ecc71" size={28} />
      </View>
      
      {/* Add a line */}
      <View style={styles.line}></View>

      {/* Chat area */}
      <ScrollView style={styles.chatContainer}>
        {/* Display chat messages */}
        {messages.map((msg, index) => (
          <View key={index} style={[styles.message, msg.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}

      </ScrollView>


      {/* User input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.keyboardAvoidingContainer} // Add a new style for the KeyboardAvoidingView
      >
        <TextInput
          placeholder="Type your message..."
          style={styles.inputField}
          multiline
          value={textInputValue}
          onChangeText={(text) => setTextInputValue(text)}
          onSubmitEditing={(e) => {
            if (e.nativeEvent.text.trim() !== '') {
              sendMessage(e.nativeEvent.text);
            }
          }}
        />
        
        <TouchableOpacity style={styles.sendButton} onPress={() => {if (textInputValue.trim() !== '') {
              sendMessage(textInputValue);
            }
          }}
        >
        {/* <TouchableOpacity style={styles.sendButton}> */}
          <Icon name="send" type="font-awesome" color="#fff" size={18} />
          {/* <text type="font-awesome" color="#fff" size={18}>send</text> */}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    width: '100%',
  },
  header: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 24,
    // fontWeight: 'bold',
    // color: '#ccc',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 20,
  },
  message: {
    maxWidth: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  botMessage: {
    backgroundColor: '#cfeefc',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 5, // Add margin bottom to separate messages
  },
  userMessage: {
    backgroundColor: '#2ecc71',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'flex-end',
    marginBottom: 5, // Add margin bottom to separate messages
  },
  messageText: {
    fontSize: 16,
  },
  keyboardAvoidingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 20,
    padding: 10,
  },
});

export default HealthChatBot;
