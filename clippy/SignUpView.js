
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import User from './Requests/User';

export default class SignUpView extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            usernameText: "",
            passwordText: "",
            phoneText: ""
        }
    }

    //Attempt to sign up the user
    signUp() {
        User.createUser(this.state.usernameText, this.state.passwordText, this.state.phoneText).then(response => {
            if (response.id != undefined) {
                User.user = response
                return AsyncStorage.setItem('username', User.user.username)
            } else {
                throw "Unsuccessful"
            }
        })
        .then(success => {
            this.props.navigation.navigate('Main')
        })
        .catch(error => console.log(error));
    }

    //Switch to log in view
    logIn() {
        this.props.navigation.navigate('LogIn', {})
    }


    render() {
        return <View backgroundColor='white' alignItems='center' justifyContent='center' flex={1}>
            <Text style={{ fontSize: 40, fontWeight: 'bold', marginVertical: 16 }}>Clippy</Text>
            <Text style={{ fontSize: 20, fontWeight: '100', marginVertical: 16 }}>Create an account</Text>
            <View flexDirection='row' marginHorizontal={36} paddingHorizontal={4} >
                <TextInput
                    value={this.state.usernameText}
                    onChangeText={(text) => this.setState({ usernameText: text })}
                    flex={1}
                    placeholder='Username'
                    style={{ backgroundColor: 'white', paddingHorizontal: 16, borderRadius: 5, elevation: 3, height: 44 }} />
            </View>
            <View flexDirection='row' marginHorizontal={36} marginVertical={16} paddingHorizontal={4} >
                <TextInput
                    value={this.state.passwordText}
                    onChangeText={(text) => this.setState({ passwordText: text })}
                    flex={1}
                    placeholder='Password'
                    style={{ backgroundColor: 'white', paddingHorizontal: 16, borderRadius: 5, elevation: 3, height: 44 }} />
            </View>
            <View flexDirection='row' marginHorizontal={36} paddingHorizontal={4} >
                <TextInput
                    value={this.state.phoneText}
                    onChangeText={(text) => this.setState({ phoneText: text })}
                    flex={1}
                    placeholder='Phone number'
                    style={{ backgroundColor: 'white', paddingHorizontal: 16, borderRadius: 5, elevation: 3, height: 44 }} />
            </View>
            <View flexDirection='row' marginHorizontal={36} marginVertical={16} paddingHorizontal={4} >
                <TouchableOpacity
                    onPress={() => { this.signUp() }}
                    flex={1}
                    style={{ padding: 12, elevation: 3, backgroundColor: 'white', width: 128, alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <Text marginVertical={16}>OR</Text>
            <View flexDirection='row' marginHorizontal={36} marginVertical={16} paddingHorizontal={4} >
                <TouchableOpacity
                    onPress={() => { this.logIn() }}
                    flex={1}
                    style={{ padding: 12, elevation: 3, backgroundColor: 'white', width: 128, alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Log in</Text>
                </TouchableOpacity>
            </View>

        </View>
    }
}