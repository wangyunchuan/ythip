import {myFetch} from '../utils/netUtils'
let NetUtil = {
    AppcLogin(url, data, callback) {
        return myFetch(url, {
            method: 'POST',
            body: data
        })
        .then((responseText) => {
            callback(responseText);
        }).done();

    }
}
export default NetUtil;
