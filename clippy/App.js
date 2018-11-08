import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{ backgroundColor: 'white', height: 44, justifyContent: 'center', alignItems: 'center', elevation: 3 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Clippy</Text>
        </View>
        <Text style={styles.welcome}>Welcome to Clippy! Paste some text</Text>
        <View flex={1}>
          <View flexDirection='row'>
            <TextInput 
            style={{ elevation: 3, 
            backgroundColor: 'white', 
            flex: 1,
             margin: 24, 
             borderRadius: 10,
            paddingHorizontal: 12 }}
             placeholderTextColor='grey'
             placeholder='Content'
             ></TextInput>
          </View>
          <TouchableOpacity style={{ elevation: 3, borderColor: 'gray', margin: 24, paddingVertical: 12, alignItems: 'center', borderRadius: 10 }}>
            <Text>Paste</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
