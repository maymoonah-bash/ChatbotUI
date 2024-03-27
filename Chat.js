import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const messages = snapshot.docs.map(doc => ({
          _id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt.toDate(),
          user: doc.data().user,
        }));
        setMessages(messages);
      });

    return () => unsubscribe();
  }, []);

  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));
    newMessages.forEach(message => {
      firebase.firestore().collection('messages').add({
        ...message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{ _id: 1 }} // User ID, you can change as needed
    />
  );
};

export default Chat;
