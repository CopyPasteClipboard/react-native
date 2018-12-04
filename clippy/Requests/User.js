import Requests from "./requests";





export default class User {
    static getUserByUsername(username) {

    }

    static createUser(username, password, phoneNumber) {

    }

    static getUserByID(id) {
        Requests.httpGETRequest('/v1/users/' + id).then(response => console.log(response));
    }
}