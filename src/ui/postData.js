import netUitl from '../lib/NetUtil'
let postData = {
  AsyncGetDataByUri(formData, url,callback) {
      if(typeof formData === 'undefined'){
          formData  = new FormData();
      }
      return netUitl.AppcLogin(url,formData,(responseText) => {
          console.log(responseText)
          let json = null;
          if(responseText.startsWith('{') && responseText.endsWith('}')){//正确的json格式返回
              json = JSON.parse(responseText);
              if (json.code === "0") {
                  console.log('数据获取成功');
                  callback(json.dataList);
              }
              if(json.code === "202"){
                  let ret = [];
                  callback(ret);
              }
          }else{//非正确格式返回
              let ret = [];
              callback(ret);
          }
      });
  }
}
export default postData;
