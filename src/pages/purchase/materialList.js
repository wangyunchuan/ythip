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
import materialApply from './materialApply';

export default class materialList extends Component {
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
                username: json.userinfo.userName
            });
            formData.append("userName",this.state.username);
        });
        this.setState({
            serverIp : serverIp,
            outNo : outNo
        });

        console.log("领用单号："+outNo)
        formData.append("id",outNo);
        let url = serverIp+"/ythip/mobileController.do?materialList";
        postData.AsyncGetDataByUri(formData,url,(datalist) => {
            this.setState({
                results: datalist
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
                        <Text style={Style.Texts}>{row.materialNo}</Text>
                        <Text style={Style.Texts}>{row.materialDescription}</Text>
                        <Text style={Style.Texts}>{row.unit}</Text>
                        <Text style={Style.Texts}>{row.applyNum}</Text>
                        <Text style={Style.Texts}>{row.status}</Text>
                    </View>
                </TouchableOpacity>
            );
    }

    returnMain=()=>{
        const {navigator}=this.props;
        if (navigator) {
            navigator.push({
                name:'materialApply',
                component:materialApply,
                params : {
                    navigator : navigator,
                    serverIp : this.state.serverIp
                }
            });
        }
    }

    onItemClick(itemNo) {
        console.log("行项目号："+itemNo)
        const { navigator } = this.props;
        if (navigator) {
            AsyncStorage.setItem("userClickItem" ,JSON.stringify({"itemNo":itemNo,"outNo":this.state.outNo,"serverIp":this.state.serverIp,"username":this.state.username}),
                function(err){
                    if (err) {
                        console.log(err);
                    }
                });
            navigator.push({
                name : 'purchase',
                component : Purchase,
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
                    <Text style={Style.Titles}>物料号</Text>
                    <Text style={Style.Titles} numberOfLines={3}>物料名称</Text>
                    <Text style={Style.Titles}>计量单位</Text>
                    <Text style={Style.Titles}>申报数量</Text>
                    <Text style={Style.Titles}>状态</Text>
                </View>
                <ScrollView>
                    {this.renderList()}
                </ScrollView>
            </View>
        )
    }
}
