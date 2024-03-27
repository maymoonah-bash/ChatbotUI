import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import { Icon } from 'react-native-elements';

const HealthChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [textInputValue, setTextInputValue] = useState('');

    // Function to handle sending messages
    const sendMessage = (message) => {
      setTextInputValue(''); // Clear the text input after sending the message
      setMessages([...messages, { text: message, sender: 'user' }]);
      const lowercaseMessage = message.toLowerCase();
      
      if (lowercaseMessage.includes('hello')) { // Add logic here to handle bot response or other functionality
        respond(); // Respond to appointment-related inquiries
      } 
    };

      // Function to handle appointment-related inquiries
  const respond = () => {
    // You can implement your logic for handling messages here
    setMessages([...messages, { text: 'Hi. How are you feeling today? \nis there something you want to talk about?', sender: 'bot' }]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Your personal mental health chatbot</Text>
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
