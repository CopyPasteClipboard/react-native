
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import User from './Requests/User';

export default class LogInView extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: ""
        }

        //Try to auto login if we already have a username
        AsyncStorage.getItem('username')
        .then(success => {
            if (success !== null) {
                this.state.username = success
                this.logIn()
            }
        })
        .catch(error => console.log(error, "caught"))
    }

    //Switch to signup
    signUp() {
        this.props.navigation.navigate('SignUp', {})
    }

    //Attempt to log in the user
    logIn() {
        User.getUserByUsername(this.state.username)
        .then(response => {
            if (response.id != undefined) {
                User.user = response
                return AsyncStorage.setItem('username', User.user.username)
            } else {
                throw "Unsuccessful"
            }
        })
        .then(_ => {
            this.props.navigation.navigate('Main')
        })
        .catch(_ => {
            console.log("unsuccessful");
        })
        
    }


    render() {
        return <View backgroundColor='white' alignItems='center' justifyContent='center' flex={1}>
            <Text style={{ fontSize: 40, fontWeight: 'bold', marginVertical: 16 }}>Clippy</Text>
            <View flexDirection='row' marginHorizontal={36} paddingHorizontal={4} marginVertical={24} >
                <TextInput
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                    flex={1}
                    placeholder='Email'
                    style={{ backgroundColor: 'white', paddingHorizontal: 16, borderRadius: 5, elevation: 3, height: 44 }} />
            </View>
            <View flexDirection='row' marginHorizontal={36} marginVertical={16} paddingHorizontal={4} >
                <TouchableOpacity
                    onPress={() => { this.logIn() }}
                    flex={1}
                    style={{ padding: 12, elevation: 3, backgroundColor: 'white', width: 128, alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>Log In</Text>
                </TouchableOpacity>
            </View>
            <Text marginVertical={16}>OR</Text>
            <View flexDirection='row' marginHorizontal={36} marginVertical={16} paddingHorizontal={4} >
                <TouchableOpacity
                    onPress={() => { this.signUp() }}
                    flex={1}
                    style={{ padding: 12, elevation: 3, backgroundColor: 'white', width: 128, alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>Sign Up</Text>
                </TouchableOpacity>
            </View>

        </View>
    }
}