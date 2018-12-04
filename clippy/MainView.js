
import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Requests from './requests';


export default class MainView extends React.Component {


    constructor(props) {
        super(props)
    
        this.state = {
          recentContent: null,
          pasteText: null
        }
      }
    
    
      render() {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'white', height: 44, justifyContent: 'center', alignItems: 'center', elevation: 3 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Clippy</Text>
            </View>
            <Text style={styles.welcome}>Welcome to Clippy! Paste some text</Text>
            <View flex={1}>
              <View flexDirection='row'>
                <TextInput
                  style={{
                    elevation: 3,
                    backgroundColor: 'white',
                    flex: 1,
                    margin: 24,
                    borderRadius: 10,
                    paddingHorizontal: 12
                  }}
                  value={this.state.pasteText}
                  onChangeText={(text) => this.setState({ pasteText: text })}
                  placeholderTextColor='grey'
                  placeholder='Content'
                ></TextInput>
              </View>
              <TouchableOpacity
                onPress={() => { this.saveContent(this.state.pasteText) }}
                style={{ elevation: 3, borderColor: 'gray', backgroundColor: 'white', margin: 24, paddingVertical: 12, alignItems: 'center', borderRadius: 10 }}>
                <Text>Paste</Text>
              </TouchableOpacity>
              <View elevation={3} backgroundColor='white' alignItems='center' style={{ borderRadius: 5, marginHorizontal: 24 }}>
                <Text style={{ fontSize: 17, marginVertical: 8, fontWeight: 'bold' }}>Current Content</Text>
                <Text style={{ marginVertical: 8 }}>{this.state.recentContent === null ? "No recent items. (try refreshing)" : this.state.recentContent.text_content}</Text>
              </View>
              <TouchableOpacity
                onPress={() => { this.refreshContent() }}
                style={{ elevation: 3, borderColor: 'gray', margin: 24, backgroundColor: 'white', paddingVertical: 12, alignItems: 'center', borderRadius: 10 }}>
                <Text>Refresh</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    
    
      refreshContent() {
        Requests.httpGETRequest('v1/clipboard/0').then(response => {
          this.setState({ recentContent: response[0] })
        })
      }
    
      saveContent(text) {
        Requests.httpPOSTRequest('v1/clipboard/0/boarditem', JSON.stringify({ new_item: text }))
          .then(response => {
            console.log(response);
          })
        this.setState({ pasteText: "" })
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