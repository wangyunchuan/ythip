
import React, { Component } from 'react';
import {
    ScrollView,
    RefreshControl,
    ToolbarAndroid,
    AppRegistry,
    Modal,
    StyleSheet,
    Text,
    View,
    Image,
    AsyncStorage,
    ToastAndroid,
    NativeModules,
    Dimensions,
    TouchableHighlight,
    TextInput,
    NetInfo,
    TouchableOpacity
} from 'react-native';
import EditView from '../lib/EditView';
import LoginButton from '../lib/LoginButton';
import LoginSuccess from '../ui/LoginSuccess';
import netUitl from '../lib/NetUtil';
import userConfig from '../ui/UserConfig';
import NetWorkTool from '../utils/NetWorkTool';

var {width, height,scale}=Dimensions.get('window');
//临时测试用的账号
var ythip  = 'http://10.1.2.35:8080';
var loginName = '10000231';
var password = '123456';
export default class LoginActivity extends Component {
    constructor(props) {
        super(props);
        NetWorkTool.checkNetworkState((isConnected)=>{
            if(!isConnected){
                //Toast.show(NetWorkTool.NOT_NETWORK);
            }
        });
        this.userName = "";
        this.serverIp = "";
        this.passWord = "";
        this.state = {
            show:false,
            netInfo:'',
            msgbox:'',
        };
    }

    handleMethod(isConnected){
        console.log('test', (isConnected ? 'online' : 'offline'));
    }
    componentWillMount() {
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }
    componentDidMount() {
        AsyncStorage.setItem("serverIp" ,ythip,
            function(err){
                if (err) {
                    console.log(err);
                }
            });
        this.setState({
            serverIp : ythip
        });
       NativeModules.SendBroadcast.getDataFromIntent(
            (successMsg)=>{
                console.log(successMsg)
            },
            (erroMsg)=>{
                console.log(erroMsg)
            }
        );
    }
    componentWillUnmount() {
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }

    render() {
        return (

            <View style={LoginStyles.loginview}>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.show}
                    onShow={() => {}}
                    onRequestClose={() => {}} >
                    <View style={LoginStyles.modalStyle}>
                        <View style={LoginStyles.subView}>
                            <Text style={LoginStyles.titleText}>
                                温馨提示
                            </Text>
                            <View style={LoginStyles.horizontalLine} />
                            <Text style={LoginStyles.contentText}>
                                {this.state.msgbox}
                            </Text>
                            <View style={LoginStyles.horizontalLine} />
                            <View style={LoginStyles.buttonView}>
                                <TouchableHighlight underlayColor='transparent'
                                                    style={LoginStyles.buttonStyle}
                                                    onPress={this._setModalVisible.bind(this)}>
                                    <Text style={LoginStyles.buttonText}>
                                        确定
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View   style={{flexDirection: 'column',height:80,marginTop:20,
        justifyContent: 'center',
        alignItems: 'center',}}>
                    <Image source={require('../images/header-logo2.png')}/>
                    <Text style={{color:"#4A90E2",textAlign:'center',fontSize:25,fontWeight:"bold",marginTop:20}} >云天化智能工厂系统</Text>
                </View>
                <View style={{marginTop:80}}>
                    <EditView  name='输入服务器地址' defaultValue={this.state.serverIp} type="readonlyInput" onChangeText={(text) => {
                        this.serverIp = text;
                    }}/>
                    <EditView  name='输入用户名/注册手机号'  type="input" onChangeText={(text) => {
                        this.userName = text;
                    }}/>
                    <EditView name='输入密码'  type="password" onChangeText={(text) => {
                        this.passWord = text;
                    }}/>
                    <LoginButton name='登录' onPressCallback={this.onPressCallback}/>
                    <Text style={{color:"#4A90E2",textAlign:'center',marginTop:10}} onPress={ () => {
                          //ToastAndroid.show("加载中",ToastAndroid.LONG);
                          NativeModules.SendBroadcast.sendBroadcast();
                          //NativeModules.SendBroadcast.startActivityByString("com.first.wxapi.WXEntryActivity");
                            //this.onClick();
                        }}>ZEBRA75红外线调用</Text>
                </View>
            </View>
        )
    }

   async onClick(){
          console.log('ok1')
           var data = await NativeModules.SendBroadcast.pickData().catch((err)=>{
               console.log(err);
           });
          console.log(data);
    }

    onPressCallback = () => {
        let formData = new FormData();
        //formData.append("userName",this.userName);
        //formData.append("passWord",this.passWord);
        if(loginName !== '')
            formData.append("userName",loginName);
        else
            formData.append("userName",this.userName);

        if(password !== '')
            formData.append("passWord",password);
        else
            formData.append("passWord",this.passWord);

        console.log("当前服务器IP："+this.state.serverIp)
        let url = this.state.serverIp+"/ythip/loginController.do?applogin";
        netUitl.AppcLogin(url,formData,(responseText) => {
            console.log(responseText);
            let json = JSON.parse(responseText);
            if (json.code === "0") {
                console.log('登录成功');
                //AsyncStorage 存储用户信息
                AsyncStorage.setItem("usertoken" ,JSON.stringify(json),
                    function(err){
                        if (err) {
                            console.log(err);
                        }
                    });
                this.onLoginSuccess();
            }
            if(json.code === "202"){
                //alert(json.msg)
                this.setState({
                    msgbox : json.msg,
                });
                //this.onLoginSuccess();
                this.rightButtonClick();
            }
        })
    };

    rightButtonClick() {
        //
        //console.log('右侧按钮点击了');
        this._setModalVisible();
    }

    // 显示/隐藏 modal
    _setModalVisible() {
        let isShow = this.state.show;
        this.setState({
            show:!isShow,
        });
    }
    //跳转到第二个页面去
    onLoginSuccess(){
       const {navigator}=this.props;
        if (navigator) {
            navigator.push({
                name:'loginSuccess',
                component:LoginSuccess,
                params : {
                    navigator : navigator
                }
            });
        }
    }

}

class loginLineView extends Component {
    render() {
        return (
            <Text >
                没有帐号
            </Text>
        );
    }
}

const LoginStyles = StyleSheet.create({
    loginview: {
        flex: 1,
        padding: 30,
        backgroundColor: '#ffffff',
    },
    container:{
        flex:1,
        backgroundColor: '#fff',
    },
    ImageBk: {
        flex: 1,
        position: 'absolute',
        height: height
    },
    Line:{
        width:width-20
    },
    ButtonM: {
        marginTop: 20
    },
    LoginContainer:{
        //marginLeft: width / 2 - 50,
        //marginTop:  height / 2 - 50 ,
        width: 350,
        height: 400
    },
    ImageHeadCenter: {
        marginLeft: width / 2 - 50,
        marginTop:50,
        borderRadius: 50,
        width: 100,
        height: 100
    },
    // modal的样式
    modalStyle: {
        //backgroundColor:'#ccc',
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
    },
    // modal上子View的样式
    subView:{
        marginLeft:60,
        marginRight:60,
        backgroundColor: '#ECECF0',
        alignSelf: 'stretch',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        //borderColor:'#ccc',
    },
    // 标题
    titleText:{
        marginTop:15,
        marginBottom:10,
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
        backgroundColor: '#3281DD',
    },
    // 内容
    contentText:{
        margin:8,
        fontSize:14,
        textAlign:'center',
    },
    // 水平的分割线
    horizontalLine:{
        marginTop:5,
        height:0.5,
        backgroundColor:'#ccc',
    },
    // 按钮
    buttonView:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonStyle:{
        flex:1,
        height:44,
        alignItems: 'center',
        justifyContent:'center',
    },
    // 竖直的分割线
    verticalLine:{
        width:0.5,
        height:44,
        backgroundColor:'#ccc',
    },
    buttonText:{
        fontSize:16,
        color:'#3393F2',
        textAlign:'center',
    },
});
