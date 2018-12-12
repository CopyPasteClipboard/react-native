
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, AsyncStorage, Keyboard } from 'react-native';
import User from './Requests/User';
import Board from './Requests/Board';


export default class MainView extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			recentContent: null,
			pasteText: null,
			boards: [],
			activeBoard: null
		}

		this.refreshBoards();
	}

	//Load in the most recent item
	refreshContent() {
		if (this.state.activeBoard == null) return

		Board.getMostRecentBoardItem(this.state.activeBoard.id)
			.then(response => {
				this.setState({ recentContent: response[0] })
			})
			.catch(error => console.log(error))
	}

	//Load in a fresh list of boards
	refreshBoards() {
		User.getUserBoards()
			.then(response => {
				if (response.length != 0) {
					this.state.activeBoard = response[0]
					this.setState({ boards: response})
					this.refreshContent()
				}
			})
			.catch(error => console.log(error))
	}

	//Save content to API
	saveContent(text) {
		Keyboard.dismiss()
		if (this.state.activeBoard == null) return

		Board.saveBoardItem(this.state.activeBoard.id, text)
			.then(response => {
				console.log(response);
				this.refreshContent();
			})
			.catch(response => console.log(response))
		this.setState({ pasteText: "" })
	}

	//Logs out the user and removes from persistant storage
	logout() {
		AsyncStorage.removeItem('username')
			.then(response => {
				this.props.navigation.navigate('LogIn')
			})
			.catch(error => console.log(error));
	}

	//Render main view
	render() {
		return (
			<View style={{ flex: 1 }}>
				<View flex={1}>
					<View style={{ backgroundColor: '#fed330', justifyContent: 'center', alignItems: 'center', elevation: 3 }}>
						<Text style={{ fontFamily: 'Montserrat-ExtraBold', fontSize: 20, paddingVertical: 8 }}>Clippy</Text>
					</View>
					<Text style={[styles.welcome, { fontFamily: 'Montserrat-Bold', fontSize: 18, paddingVertical: 8 }]}>Welcome to Clippy! Paste some text</Text>
					<View marginHorizontal={24} marginBottom={12} backgroundColor='clear' alignItems='center'>
						<Text style={{fontSize: 15, fontWeight: 'bold'}}>using board named: {this.state.activeBoard == null ? 'Loading' : this.state.activeBoard.board_name}</Text>
					</View>
					{this.state.activeBoard != null ? this.boardInteractions() : null}

				</View>
				<View height={40} backgroundColor='gray' alignItems='center' justifyContent='center'>
					<TouchableOpacity
						onPress={() => { this.logout() }}>
						<Text style={{ color: 'white', fontWeight: 'bold' }}>Logout</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	//Render the board interactions
	boardInteractions() {
		return (
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
					style={{ elevation: 3, borderColor: 'gray', backgroundColor: '#4b6584', margin: 16, marginHorizontal: 24, paddingVertical: 12, alignItems: 'center', borderRadius: 5, marginBottom: 24 }}>
					<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Paste</Text>
				</TouchableOpacity>
				<View elevation={3} backgroundColor='white' alignItems='center' style={{ borderRadius: 5, marginHorizontal: 24, paddingHorizontal: 8 }}>
					<Text style={{ fontSize: 17, marginVertical: 8, fontFamily: 'Montserrat-ExtraBold', borderBottomWidth: 1 }}>Most Recent Item</Text>
					<Text selectable={true} style={{ marginVertical: 8, fontSize: 15, fontFamily: 'Montserrat-Regular', alignContent: 'center', textAlign: 'center' }}>{this.state.recentContent === null ? "No recent items. (try refreshing)" : this.state.recentContent.text_content}</Text>
				</View>
				<TouchableOpacity
					onPress={() => { this.refreshContent() }}
					style={{ elevation: 3, borderColor: 'gray', margin: 24, backgroundColor: '#4b6584', paddingVertical: 12, alignItems: 'center', borderRadius: 5 }}>
					<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Refresh</Text>
				</TouchableOpacity>
			</View>
		)
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