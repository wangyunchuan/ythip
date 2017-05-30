/**
 * Created by luojian on 2016/7/14.
 *
 */
import React, {PropTypes, Component} from 'react';
import {Text, ScrollView, RefreshControl, Image,Screen, Dimensions,View, ListView, TouchableOpacity} from 'react-native'
import NavigationBar from '../../Navigation/NavigationBar'
import Style from './Styles/ProfileStyle'
import userInfo from '../../ui/UserInfo'
import userConfig from '../../ui/UserConfig'
import LoginSuccess from '../../ui/LoginSuccess';
import netUitl from '../../lib/NetUtil'
import postData from '../../ui/postData'
import Purchase from '../../pages/purchase/purchase';
import materialList from '../../pages/purchase/materialList'

export default class materialApply extends Component {
    constructor(props) {
        super(props);
        this.rowname = '';
        this.rowid = '';
        this.state = {
            serverIp:'',
            username:'',
            msgbox:'',
            results:[]
        };
    }

    componentDidMount() {
        let {rowname,rowid,serverIp}=this.props;
        this.setState({
            rowname : rowname,
            rowid : rowid,
            serverIp : serverIp
        });
        let formData = new FormData();
        userInfo.AsyncGetUserInfo("usertoken", (userinfo) => {
            let json = JSON.parse(userinfo);
            this.setState({
                username: json.userinfo.userName
            });
            console.log("参数："+json.userinfo.userName)
            formData.append("userName",json.userinfo.userName);
            let url = serverIp+"/ythip/mobileController.do?list";
            console.log("当前请求地址："+url)

            postData.AsyncGetDataByUri(formData,url,(datalist) => {
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
                <TouchableOpacity onPress={this.onItemClick.bind(this,row.id)} key={"key"+row.id} style={Style.carSpace}>
                    <View style={Style.ViewList}>
                        <Text style={Style.Titles}>申报部门：</Text>
                        <Text style={Style.Texts}>{row.applyDet}</Text>
                        <Text style={Style.Titles}>申报人：</Text>
                        <Text style={Style.Texts}>{row.appleMan}</Text>
                    </View>
                    <View style={Style.ViewList}>
                        <Text style={Style.Titles}>填写时间：</Text>
                        <Text style={Style.Texts}>{row.inputDate}</Text>
                        <Text style={Style.Titles}>出库时间：</Text>
                        <Text style={Style.Texts}>{row.outDate}</Text>
                    </View>
                    <View style={Style.ViewList}>
                        <Text style={Style.Titles}>出库单：</Text>
                        <Text style={Style.Texts}>{row.outNo}</Text>
                        <Text style={Style.Titles}>库管员：</Text>
                        <Text style={Style.Texts}>{row.storeKeeper}</Text>
                    </View>
                    <View style={Style.ViewList}>
                        <Text style={Style.Titles}>领用人工号：</Text>
                        <Text style={Style.Texts}>{row.collarManNo}</Text>
                        <Text style={Style.Titles}>领用人：</Text>
                        <Text style={Style.Texts}>{row.collarMan}</Text>
                    </View>
                    <View style={Style.SignaView}>
                        <Text style={Style.Titles}>备注：</Text>
                        <Text style={Style.Texts}>{row.remark}</Text>
                    </View>
                </TouchableOpacity>
            );
    }

    returnMain=()=>{
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

    onItemClick(outNo) {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name : 'materialList',
                component : materialList,
                params : {
                    navigator : navigator,
                    outNo : outNo,
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
                    centerComponent="领用出库"
                />
                <ScrollView>
                    {this.renderList()}
                </ScrollView>
            </View>
        )
    }
}
