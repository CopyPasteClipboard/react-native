import Requests from "./requests";


export default class Board {
    
    //Board related API requests
    
    static getMostRecentBoardItem(board_id) {
        return Requests.httpGETRequest('/v1/clipboard/' + board_id + '?type=most_recent')
    }

    static saveBoardItem(board_id, text) {
        return Requests.httpPOSTRequest('/v1/clipboard/' + board_id + '/boarditem', JSON.stringify({ board_item: text }))
    }
}