
import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Requests from './Requests/requests';


export default class MainView extends React.Component {


    constructor(props) {
        super(props)
    
        this.state = {
          recentContent: null,
          pasteText: null
        }

        this.refreshContent();
      }
    
    
      render() {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#fed330', justifyContent: 'center', alignItems: 'center', elevation: 3 }}>
              <Text style={{fontFamily: 'Montserrat-ExtraBold', fontSize: 24, paddingVertical: 12 }}>Clippy</Text>
            </View>
            <Text style={[styles.welcome, {fontFamily: 'Montserrat-Bold', fontSize: 14, paddingVertical: 16}]}>Welcome to Clippy! Paste some text</Text>
            <View flex={1}>
              <View flexDirection='row'>
                <TextInput
                  style={{
                    elevation: 3,
                    backgroundColor: 'white',
                    flex: 1,
                    margin: 4,
                    marginHorizontal: 24,
                    borderRadius: 5,
                    paddingHorizontal: 12,
                    height: 44
                  }}
                  value={this.state.pasteText}
                  onChangeText={(text) => this.setState({ pasteText: text })}
                  placeholderTextColor='grey'
                  placeholder='Content'
                ></TextInput>
              </View>
              <TouchableOpacity
                onPress={() => { this.saveContent(this.state.pasteText) }}
                style={{ elevation: 3, borderColor: 'gray', backgroundColor: '#4b6584', margin: 16, marginHorizontal: 24, paddingVertical: 12, alignItems: 'center', borderRadius: 5, marginBottom: 48 }}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Paste</Text>
              </TouchableOpacity>
              <View elevation={3} backgroundColor='white' alignItems='center' style={{ borderRadius: 5, marginHorizontal: 24, paddingHorizontal: 8}}>
                <Text style={{ fontSize: 17, marginVertical: 8, fontWeight: 'bold', borderBottomWidth: 1 }}>Current Content</Text>
                <Text style={{ marginVertical: 8, fontSize: 15, alignContent: 'center', textAlign: 'center' }}>{this.state.recentContent === null ? "No recent items. (try refreshing)" : this.state.recentContent.text_content}</Text>
              </View>
              <TouchableOpacity
                onPress={() => { this.refreshContent() }}
                style={{ elevation: 3, borderColor: 'gray', margin: 24, backgroundColor: '#4b6584', paddingVertical: 12, alignItems: 'center', borderRadius: 5 }}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Refresh</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    
    
      refreshContent() {
        Requests.httpGETRequest('v1/clipboard/1?type=most_recent').then(response => {
          this.setState({ recentContent: response[0] })
        })
      }
    
      saveContent(text) {
        Requests.httpPOSTRequest('v1/clipboard/1/boarditem', JSON.stringify({ board_item: text }))
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
        margin: 8,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
    });