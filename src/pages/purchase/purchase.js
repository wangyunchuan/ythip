import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  NativeModules,
  RefreshControl
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import NavigationBar from '../../Navigation/NavigationBar'
import Style from '../../pages/purchase/Styles/ProfileStyle'
//import Barcode from './barcode';
import MaterialApply from '../../pages/purchase/materialApply';
import materialList from '../../pages/purchase/materialList';
import LoginButton from '../../lib/LoginButton';
import userInfo from '../../ui/UserInfo'
import postData from '../../ui/postData'
const {width,height}= Dimensions.get('window');
var newsize=width/375;
var inputMap = new Map();
var inputName = '';
var inputValue = '';
var barCode = "";
var outNo = "";
var itemNo = "";
var serverIp = "";
var addnum = 0;
class PurchaseMain extends Component {
  constructor(props) {
      super(props);
      this.rowname = '';
      this.rowid = '';
      this.field01 = '';
      this.field02 = '';
      this.state = {
        serverIp:'',
        flag:false,
        username:'无名氏',
        keywords:'',
        text: '',
        msgbox:'',
        types:[],
        vals:[],
        nickname:"",
        results:[],
        saveInfoResults:[],
        barcodeResult:''
      };
  }
    renderList(barcode){
        if(this.state.results){
            console.log("您扫描的条码："+barcode)
            this.modifyResults(barcode)
            return this.state.results.map(row => this.renderItem(row, barcode));
        }
    }

    modifyResults(barcode){
        let temp = [];

        if(this.state.results){
            this.state.results.map(function(row){
                if(row.name === 'barCode'){
                    row.value = barcode;
                }
                temp.push(row);
            });
        }
        console.log("修改后的数据")
        console.log(temp)
        this.state.results = temp;
    }

    renderInitList(barcode){
        if(this.state.results){
            return this.state.results.map(row => this.renderItem(row, barcode));
        }else {
            return (<View style={{height:0,width:60}}></View>);
        }
    }

    renderList1(barcode,serverIP){
        let {itemNo,barcodeResult}=this.props;
        let formData = new FormData();

        userInfo.AsyncGetUserInfo("usertoken", (userinfo) => {
            let json = JSON.parse(userinfo);
            this.setState({
                username: json.userinfo.userName
            });
        });


        formData.append("物资条码：",barcode);
        formData.append("登陆者工号：",this.state.username);
        formData.append("行项目号：", itemNo);

        let url = serverIP+"/ythip/mobileController.do?getMaterialInfo";
        postData.AsyncGetDataByUri(formData,url,(datalist) => {

            if(datalist !== null){
                this.setState({
                    flag : true,
                    results: datalist
                });
            }else{
                ToastAndroid.show("没有找到物资信息，请重新扫码！",ToastAndroid.LONG);
            }
        });
    }

    addData(a){
        inputMap.set(inputName,inputValue);
    }


    renderItem(row,barcode) {
        let backgroundColor,fontColor,Divider;
        fontColor='#000';
        Divider='rgb(221,221,221)'
        if (row.type === 'Text') {
            return (
                <View style={Style.ViewList} key={"key"+row.orderid}>
                    <Text style={Style.Texts}>{row.desc}</Text>
                    <Text style={Style.Titles} numberOfLines={3}>{row.value}</Text>
                </View>
            );
        }

        if (row.type === 'Hidden') {
            return (
                null
            );
        }

        if (row.type === 'TextInput') {
            return (
                <View style={[Style.ViewList,{borderBottomColor:Divider,height:54}]} key={"key"+row.orderid}>
                    <Text style={[Style.Texts,{color:fontColor,marginTop:20}]}>{row.desc}</Text>
                    <TextInput
                        style={{flex:1,padding:0,fontSize:15*newsize, color:'rgb(143,143,143)',textAlign:'right'}}
                        underlineColorAndroid="transparent"
                        placeholder={"请输入"+row.desc}
                        onBlur={this.addData}
                        onChangeText={
                           (text) => {
                             inputName = row.name;
                             inputValue = text;
                           }
                        }
                    />
                </View>
            );
        }

        if (row.type === 'TextArea') {
            return (
                <View style={[Style.SignaView,{borderBottomColor:Divider,height:100}]} key={"key"+row.orderid}>
                    <Text style={[Style.Texts,{color:fontColor,marginTop:20}]}>{row.desc}</Text>
                    <TextInput
                        ref={(ref) => this._textInput = ref}
                        style={{height:this.state.line,fontSize:15*newsize,padding:0,marginTop:11.5,color:'rgb(143,143,143)',fontFamily:'NotoSansHans-DemiLight'}}
                        underlineColorAndroid="transparent"
                        placeholder={"请输入"+row.desc}
                        maxLength={300}
                        onSubmitEditing={()=>{this._textInput.blur()}}
                        blurOnSubmit = {true}
                        //returnKeyLabel="done"
                        //onChangeText={(text)=>{this.setState({note:text})}}
                        value=''
                    />
                </View>
            );
        }
    }

  componentDidMount() {
      userInfo.AsyncGetUserInfo("usertoken", (userinfo) => {
          let json = JSON.parse(userinfo);
          let username = json.userinfo.userName;
          let serverIP  = json.serverIP;
          let formData = new FormData();
          let barcode = '';
          this.setState({
              serverIp : serverIP,
              username: username
          });
          userInfo.AsyncGetUserInfo("userClickItem", (item) => {
              let json = JSON.parse(item);
              console.log(json)
              itemNo = json.itemNo;
              outNo = json.outNo;
              username = json.username;
              serverIp = json.serverIp;
              formData.append("barcode",barcode);
              formData.append("userName",username);
              formData.append("id", itemNo);
              formData.append("fid", outNo);
              console.log("条形码："+barcode)
              console.log("行项目号："+itemNo)
              console.log("领用单号："+outNo)
              console.log("登陆用户："+username)

              let url = serverIp+"/ythip/mobileController.do?getMaterialInfo";
              console.log("请求地址："+url)
              postData.AsyncGetDataByUri(formData,url,(datalist) => {
                  this.setState({
                      flag : true,
                      serverIp: serverIp,
                      results: datalist
                  });
                  console.log(datalist)
              });
          });
      });
    }
  render() {
      let backgroundColor;
          backgroundColor='#fff';
      if(this.state.barcodeResult === '') {
          return (
              <View style={{height:height,width:width,backgroundColor:backgroundColor}}>
                  <NavigationBar
                      leftComponent={{type:'text',text:'返回',onPress:this.returnMain.bind(this)}}
                      centerComponent="领用出库"
                      rightComponent={{type:'text',text:'扫一扫',onPress:this.toBarCodePage.bind(this)}}
                  />
                  <ScrollView>
                      {this.renderInitList(this.state.barcodeResult)}
                  </ScrollView>
              </View>
          );
      }else{
          return (
              <View style={{height:height,width:width,backgroundColor:backgroundColor}}>
                  <NavigationBar
                      leftComponent={{type:'text',text:'返回',onPress:this.returnMain.bind(this)}}
                      centerComponent={this.rowname}
                      rightComponent={{type:'text',text:'扫一扫',onPress:this.toBarCodePage.bind(this)}}
                  />
                  <ScrollView>
                      {this.renderList(this.state.barcodeResult)}
                      <View style={{paddingLeft:30,paddingRight:30}}>
                            <LoginButton  name='提交' onPressCallback={this.onPressCallback}/>
                      </View>
                  </ScrollView>
              </View>
          );
      }
  }

    onPressCallback = () => {
        let {navigator}=this.props;
        let formData = new FormData();

        if(this.state.results){
             this.state.results.map(function(row){
                 if (row.type === 'Text') {
                     inputMap.set(row.name, row.value);
                 }
             });
        }

        var entries = inputMap.entries();//遍历实体
        for(let [key,value] of entries){
            formData.append(key,value);
        }
        console.log(formData);

        userInfo.AsyncGetUserInfo("userClickItem", (userinfo) => {
            let json = JSON.parse(userinfo);
            let itemNo = json.itemNo;
            let username = json.username;
            let serverIp = json.serverIp;
            formData.append("itemNo",itemNo);
            formData.append("username",username);
            let url = serverIp+"/ythip/mobileController.do?saveMaterialInfo";
            console.log(url)
            console.log(username)
            postData.AsyncGetDataByUri(formData,url,(datalist) => {
                this.setState({
                    flag : true,
                    saveInfoResults: datalist
                });
                console.log(datalist)
            });
        });
    };

    returnMain=()=>{
        let serverIp = '';
        const {navigator}=this.props;
        userInfo.AsyncGetUserInfo("usertoken", (userinfo) => {
            let json = JSON.parse(userinfo);
            if (navigator) {
                navigator.push({
                    name:'materialList',
                    component:materialList,
                    params : {
                        navigator : navigator,
                        rowname : '领用出库',
                        outNo : outNo,
                        serverIp : json.serverIP
                    }
                });
            }
        });
    }

    async onClick(){
        const {navigator}=this.props;
        const self = this;
        console.log('ok')
        var data = await NativeModules.SendBroadcast.pickData().catch((err)=>{
            console.log(err);
        });
        console.log(data);
        self.renderList1(url,this.state.serverIp);
    }

  toBarCodePage=()=>{

    const {navigator}=this.props;
    const self = this;
    this.onClick();
   /* var data = await NativeModules.SendBroadcast.pickData().catch((err)=>{
       if(err !== ''){
            console.log(err);
            let code = err;
             userInfo.AsyncGetUserInfo("usertoken", (userinfo) => {
                  let json = JSON.parse(userinfo);
                  self.renderList1(code,json.serverIP);
             });
       }
    });*/
    /*
      userInfo.AsyncGetUserInfo("usertoken", (userinfo) => {
          let json = JSON.parse(userinfo);
          console.log("服务器："+json.serverIP)
          if (navigator) {
              navigator.push({
                  name:'barcode',
                  component:Barcode,
                  params:{
                      //从详情页获取扫描的结果url
                      getUrl:(url)=>{
                          console.log('barcode:'+url);
                          console.log('缓存中：'+self.state.barcodeResult);
                          if(url==='扫描二维码'){
                              self.setState({
                                  msgbox:'无法加载数据'
                              })
                          }else {
                              if(url===self.state.barcodeResult){
                                  console.log('请不要重复扫描');
                                  self.setState({
                                      flag : false
                                  });
                              }else{
                                  self.setState({
                                      barcodeResult:url
                                  });
                                  if(!self.state.flag) {
                                      self.renderList1(url,json.serverIP);
                                  }
                              }
                          }
                      }
                  }
              })
          }
      });
*/
  }
}

export default class Purchase extends Component{
  render(){
    return(
      <Navigator
      initialRoute={{name:'purchase',component:PurchaseMain}}
      renderScene={
            (route, navigator) =>
             {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator}  {...route.passProps}/>
             }
      }/>
    )
  }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#EFEFF4',
    },
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  top:{
    position:'absolute',
    marginTop:-20,
    top:0,
    left:0,
    justifyContent:'center',
    alignItems:'center',
  },
  topimage:{
    resizeMode:'contain',
    height:height/3,
    width:width,
    marginBottom:10
  },
  centerbg:{
    position:'absolute',
    bottom:(width-150)/2,
    left:(width-150)/2,
    backgroundColor:'#ec6638',
    width:150,
    height:150,
    borderRadius:75,
    justifyContent:'center',
    alignItems:'center',

  },
  center:{
    width:60,
    height:60,
    marginBottom:10
  }
});
