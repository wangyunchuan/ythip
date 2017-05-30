/**
 * Created by luojian on 2016/7/14.
 *
 */
import React, {PropTypes, Component} from 'react';
import {Text, ScrollView, Dimensions,View, AsyncStorage,TouchableOpacity} from 'react-native'
import NavigationBar from '../../Navigation/NavigationBar'
import Style from './Styles/ProfileStyle'
import userInfo from '../../ui/UserInfo'
import userConfig from '../../ui/UserConfig'
import LoginSuccess from '../../ui/LoginSuccess';
import postData from '../../ui/postData'
import Purchase from '../../pages/purchase/purchase';
import MaterialInventory from './MaterialInventory';

export default class MaterialInventoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outNo:'',
            serverIp:'',
            username:'',
            results:[]
        };
    }

    componentDidMount() {
        let {outNo,serverIp}=this.props;
        let formData = new FormData();
        userInfo.AsyncGetUserInfo("usertoken", (userinfo) => {
            let json = JSON.parse(userinfo);

            this.setState({
                serverIp : serverIp,
                username: json.userinfo.userName
            });
            let serverIp =json.serverIP;
            formData.append("userName",json.userinfo.userName);
            //console.log("领用单号："+outNo)
            //formData.append("id",outNo);
            let url = serverIp+"/ythip/mobileController.do?getTaskList";
            postData.AsyncGetDataByUri(formData,url,(datalist) => {
                console.log(datalist)
                this.setState({
                    results: datalist
                });
            });
        });

    }


    renderList(){
        return this.state.results.map((row)=>this.renderItem(row))
    }

    renderItem(row) {
            return (
                <TouchableOpacity onPress={this.onItemClick.bind(this,row.id,row.checkName)} key={"key"+row.id} style={Style.carSpace}>
                    <View style={Style.ViewList}>
                        <Text style={Style.Texts} numberOfLines={3}>{row.checkName}</Text>
                        <Text style={Style.Texts}>{row.startDate}</Text>
                        <Text style={Style.Texts}>{row.endDate}</Text>
                        <Text style={Style.Texts}>{row.status}</Text>
                    </View>
                </TouchableOpacity>
            );
    }

    returnMain=()=>{
        const {navigator}=this.props;
        if (navigator) {
            navigator.push({
                name:'LoginSuccess',
                component:LoginSuccess,
                params : {
                    navigator : navigator,
                    serverIp : this.state.serverIp
                }
            });
        }
    }

    onItemClick(itemNo,checkName) {
        console.log("行项目号："+itemNo)
        const { navigator } = this.props;
        if (navigator) {
            AsyncStorage.setItem("userClickItem" ,JSON.stringify({"itemNo":itemNo,"checkName":checkName,"outNo":this.state.outNo,"serverIp":this.state.serverIp,"username":this.state.username}),
                function(err){
                    if (err) {
                        console.log(err);
                    }
                });
            navigator.push({
                name : 'MaterialInventory',
                component : MaterialInventory,
                params : {
                    navigator : navigator,
                    itemNo : itemNo,
                    outNo : this.state.outNo,
                    serverIp : this.state.serverIp
                }
            });
        }
    }
    render() {

        return (
            <View style={Style.background}>
                <NavigationBar
                    leftComponent={{type:'text',text:'返回',onPress:this.returnMain.bind(this)}}
                    centerComponent='列表'
                />
                <View style={Style.ViewList}>
                    <Text style={Style.Titles} >物料名称</Text>
                    <Text style={Style.Titles}>开始时间</Text>
                    <Text style={Style.Titles}>结束时间</Text>
                    <Text style={Style.Titles}>状态</Text>
                </View>
                <ScrollView>
                    {this.renderList()}
                </ScrollView>
            </View>
        )
    }
}
