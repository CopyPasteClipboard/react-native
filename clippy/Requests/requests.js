





export default class Requests {

    //Base url for current ENV
    static baseURL = "http://54.162.248.95:4000"//"http://10.67.105.91:4000"//

    //Basic network error string
    static NETWORK_ERROR = "Unable to perform request"

    //Post request helper func
    static httpPOSTRequest(url, httpBody) {
        console.log('post request at:', this.baseURL + url)

        let request = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }

        if (httpBody != null) {
            request.body = httpBody;
        }
        console.log(request);
        return fetch(this.baseURL + url, request)
            .then(
                response => {
                    if (response.status == 200) {
                        return response.json()
                    }
                },
                rejected => {
                    console.error(rejected);
                    throw this.NETWORK_ERROR;
                }
            )
    };

    //GET request helper func
    static httpGETRequest(url) {
        console.log('get request at', this.baseURL + url)
        return fetch(this.baseURL + url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(
                response => {
                    if (response.status == 200) {
                        return response.json()
                    } else if (response.status == 204) {
                        return true;
                    } else {
                        console.log('error thrown at ', url, response);
                        return response.json()
                    }
                },
                rejected => {
                    console.error(rejected);
                    throw this.NETWORK_ERROR;
                }
            )
    };

}