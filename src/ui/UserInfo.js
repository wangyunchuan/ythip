import { AsyncStorage} from 'react-native'

let UserInfo = {
  AsyncGetUserInfo(userName, callback) {
      return AsyncStorage.getItem(
        userName,
        (error,result)=>{
          if (error){
            console.log(error);
          }
          else
          {
            console.log(result);
            callback(result);
          }
        }).done();
  }
}
export default UserInfo;
