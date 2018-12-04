
import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';





export default class SignUpView extends React.Component {

    constructor(props) {
        super(props)
    }

    touched() {
        console.log("touched")
        this.props.navigation.navigate('Main', { params: 'lol' })
    }


    render() {
        return <View backgroundColor='white' alignItems='center' justifyContent='center' flex={1}>
            <Text style={{ fontSize: 40, fontWeight: 'bold', marginVertical: 16 }}>Clippy</Text>
            <Text style={{ fontSize: 20, fontWeight: '100', marginVertical: 16 }}>Create an account</Text>
            <View flexDirection='row' marginHorizontal={36} paddingHorizontal={4} >
                <TextInput
                    flex={1}
                    placeholder='Email'
                    style={{ backgroundColor: 'white', paddingHorizontal: 16, borderRadius: 5, elevation: 3, height: 44 }} />
            </View>
            <View flexDirection='row' marginHorizontal={36} marginVertical={16} paddingHorizontal={4} >
                <TextInput
                    flex={1}
                    placeholder='Password'
                    style={{ backgroundColor: 'white', paddingHorizontal: 16, borderRadius: 5, elevation: 3, height: 44 }} />
            </View>
            <View flexDirection='row' marginHorizontal={36} marginVertical={16} paddingHorizontal={4} >
                <TouchableOpacity
                    onPress={() => { this.touched() }}
                    flex={1}
                    style={{ padding: 12, elevation: 3, backgroundColor: 'white', width: 128, alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <Text marginVertical={16}>OR</Text>
            <View flexDirection='row' marginHorizontal={36} marginVertical={16} paddingHorizontal={4} >
                <TouchableOpacity
                    onPress={() => { this.touched() }}
                    flex={1}
                    style={{ padding: 12, elevation: 3, backgroundColor: 'white', width: 128, alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>Log in</Text>
                </TouchableOpacity>
            </View>

        </View>
    }

}