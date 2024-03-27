import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text} from 'react-native';

import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

import React from 'react';
import HealthChatBot from './HealthChatBot'; // Import the HealthChatBot component

const App = () => {
  return (
    <View style={styles.container}>
      <HealthChatBot /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

// Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }




