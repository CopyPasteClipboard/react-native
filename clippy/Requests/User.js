import Requests from "./requests";


export default class User {

    //The current logged in user.
    static user = null

    //User related API methods.

    static getUserByUsername(username) {
        return Requests.httpPOSTRequest('/v1/login', JSON.stringify({ username: username }))
    }

    static createUser(username, password, phoneNumber) {
        return Requests.httpPOSTRequest('/v1/user', JSON.stringify({ username: username, password: password, phone_number: phoneNumber }))
    }

    static getUserByID(id) {
        return Requests.httpGETRequest('/v1/users/' + id)
    }

    static getUserBoards() {
        return Requests.httpGETRequest('/v1/user/' + User.user.id + '/clipboards')
    }
}