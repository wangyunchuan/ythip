import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  Dimensions,
  NativeModules,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  RefreshControl
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import NavigationBar from '../../Navigation/NavigationBar'
import Style from '../../pages/purchase/Styles/ProfileStyle'
//import Barcode from './barcode';
import MaterialApply from '../../pages/purchase/materialApply';
import LoginButton from '../../lib/LoginButton';
import netUitl from '../../lib/NetUtil';
import userInfo from '../../ui/UserInfo'
import userConfig from '../../ui/UserConfig'
import postData from '../../ui/postData'
import LoginSuccess from '../../ui/LoginSuccess';
const {width,height}= Dimensions.get('window');
var newsize=width/375;
var inputMap = new Map();
var inputName = '';
var inputValue = '';
class MaterialConsignmentMain extends Component {
  constructor(props) {
      super(props);
      this.state = {
        serverIp:'',
        username:'',
        userid:'',
        results:[],
        barcodeResult:''
      };
  }
  /*
   *界面渲染之前加载
   *
   */
  componentDidMount() {
      console.log("页面初始化前加载")
  }

  async onClick(){
    const {navigator}=this.props;
    const self = this;
    let formData = new FormData();
    //调用条码扫描程序
    var barcode = await NativeModules.SendBroadcast.pickData().catch((err)=>{
        console.log(err);
    });
    //获取条码信息后保存到用户缓存中
    console.log(barcode);
    if(barcode) {//正确扫描后有数据执行
        if( barcode !== 'nodata'){
            //读取登陆者用户信息
            userInfo.AsyncGetUserInfo("usertoken", (userinfo) => {
                let json = JSON.parse(userinfo);
                let serverIp = json.serverIP;//获取服务器IP地址
                let username = json.userinfo.realName;//获取用户姓名
                let userid = json.userinfo.userName;//获取登陆者ID
                formData.append("barcode",barcode);
                formData.append("userName",userid);
                //通过制定URL获取数据
                let url = serverIp+"/ythip/mobileController.do?getzConsignmentprivate";
                postData.AsyncGetDataByUri(formData,url,(datalist) => {
                    if(datalist !== []){//执行成功
                        //向状态参量中写入值
                        this.setState({
                            serverIp : serverIp,
                            username : username,
                            userid : userid,
                            results : datalist,
                            barcodeResult : barcode
                        });
                    }else{//执行失败
                        console.log("没有找到物资信息，请重新扫码！")
                        ToastAndroid.show("没有找到物资信息，请重新扫码！",ToastAndroid.LONG);
                    }
                });
            });
        }
    }
  }

    renderList(results){
        console.log("渲染界面")
        console.log(results)
        if(results){
            return results.map(row => this.renderItem(row, this.state.barcodeResult));
        }else {
            return (<View style={{height:0,width:60}}></View>);
        }
    }

    renderList1(barcode){
        let {rowname,rowid,itemNo,barcodeResult}=this.props;
        let formData = new FormData();

        userInfo.AsyncGetUserInfo("usertoken", (userinfo) => {
            let json = JSON.parse(userinfo);
            this.setState({
                username: json.userinfo.userName
            });
        });
        userConfig.AsyncGetServerUrl("serverIp", (serverIp) => {
            this.setState({
                serverIp: serverIp
            });
            formData.append("barcode",barcode);
            formData.append("userName",this.state.username);
            formData.append("itemNo", itemNo);

            let url = serverIp+"/ythip/mobileController.do?getzConsignmentprivate";
            console.log("访问地址："+url)
            postData.AsyncGetDataByUri(formData,url,(datalist) => {
                if(datalist !== null){
                    this.setState({
                        flag : true,
                        results: datalist
                    });
                }else{
                    ToastAndroid.show("没有找到物资信息，请重新扫码！",ToastAndroid.LONG);
                }

                this.state.returnHtml = this.renderList(barcode);
            });
        });
    }

    addData(a){
        inputMap.set(inputName,inputValue);
        //myformData.append(inputName, inputValue);
    }

    renderItem(row,barcode) {
        let backgroundColor,fontColor,Divider;
        fontColor='#000';
        Divider='rgb(221,221,221)'
        if (row.type === 'Hidden') {
            return (
                null
            );
        }

        if (row.type === 'Text') {
            return (
                <View style={Style.ViewList} key={"key"+row.orderid}>
                    <Text style={Style.Texts}>{row.desc}</Text>
                    <Text style={Style.Titles}>{row.value}</Text>
                </View>
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

  render() {
      let backgroundColor;
      backgroundColor='#fff';
          return (
              <View style={{height:height,width:width,backgroundColor:backgroundColor}}>
                  <NavigationBar
                      leftComponent={{type:'text',text:'返回',onPress:this.returnMain.bind(this)}}
                      centerComponent="寄售转自有"
                      rightComponent={{type:'text',text:'扫一扫',onPress:this.toBarCodePage.bind(this)}}
                  />
                  <ScrollView>
                      {this.renderList(this.state.results)}
                       <View style={{paddingLeft:30,paddingRight:30}}>
                          <LoginButton  name='提交' onPressCallback={this.onPressCallback}/>
                      </View>
                  </ScrollView>
              </View>
          );
  }

    onPressCallback = () => {
        let {navigator}=this.props;
        let formData = new FormData();

        if(this.state.results){
            this.state.results.map(function(row){
                if (row.type !== 'TextInput') {
                    inputMap.set(row.name, row.value);
                }
            });
        }

        var entries = inputMap.entries();//遍历实体
        for(let [key,value] of entries){
            formData.append(key,value);
        }
        console.log(formData);

        userInfo.AsyncGetUserInfo("userClickItem", (item) => {
            let json = JSON.parse(item);
            formData.append("taskId",json.itemNo);
            formData.append("taskName",json.checkName);
        });

        userInfo.AsyncGetUserInfo("usertoken", (userinfo) => {
            let json = JSON.parse(userinfo);
            let username = json.userinfo.userName;
            let serverIp = json.serverIP;
            let name = json.userinfo.realName;
            formData.append("userName",username);
            formData.append("name",name);
            console.log("盘点人[name]："+name)
            console.log("盘点人工号[name]："+username)
            let url = serverIp+"/ythip/mobileController.do?savezConsignmentprivate";
            console.log(url)
            console.log(username)
            postData.AsyncGetDataByUri(formData,url,(datalist) => {
                this.setState({
                    flag : true,
                    saveInfoResults: datalist
                });

            });
        });
    };

    returnMain=()=>{
        const {navigator}=this.props;
        console.log("服务器IP："+this.state.serverIp)
        if (navigator) {
            navigator.push({
                name:'LoginSuccess',
                component:LoginSuccess,
                params : {
                    navigator : navigator,
                    serverIp:this.state.serverIp,
                    rowname : '寄售转自有'
                }
            });
        }
    }

  toBarCodePage=()=>{
      this.onClick();
      //强制刷新本页面
      console.log("强制刷新本页")
      this.forceUpdate();
  }
}
export default class MaterialConsignment extends Component{
  render(){
    return(
      <Navigator
      initialRoute={{name:'MaterialConsignment',component:MaterialConsignmentMain}}
      renderScene={
            (route, navigator) =>
             {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} />
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
