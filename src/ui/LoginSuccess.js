import React, { Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Image,
    Navigator,
    TouchableOpacity,
    ToolbarAndroid,
    ScrollView,
    AsyncStorage,
    NativeModules,
    Platform,
    Text
} from 'react-native';
import userInfo from './UserInfo'
import userConfig from '../ui/UserConfig'
import NavigationBar from '../Navigation/NavigationBar'
import Purchase from '../pages/purchase/purchase';
//物资领用
import MaterialApply from '../pages/purchase/materialApply';
//物资盘点
import MaterialInventoryList from '../pages/purchase/MaterialInventoryList';
//物资移库
import MaterialMovement from '../pages/purchase/MaterialMovement';
//物资档案
import MaterialBarCode from '../pages/purchase/MaterialBarCode';
//寄售转自有
import MaterialConsignment from '../pages/purchase/MaterialConsignment';
var imageStoreMap;
const WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').width/3-11;
const ITEM_ICON = ITEM_HEIGHT*0.6;
const top = Platform.OS === 'ios' ? 20 : 0;
//静态效果
{
    imageStoreMap = new Map();
    imageStoreMap.set(1, require('../images/office_expense.png'));
    imageStoreMap.set(2, require('../images/office_attendance.png'));
    imageStoreMap.set(3, require('../images/office_overtime.png'));
    imageStoreMap.set(4, require('../images/office_cost.png'));
    imageStoreMap.set(5, require('../images/office_off.png'));
    imageStoreMap.set(6, require('../images/office_marriage.png'));
    imageStoreMap.set(7, require('../images/office_onbusiness.png'));
    imageStoreMap.set(8, require('../images/office_leave.png'));
    imageStoreMap.set(9, require('../images/office_sickleave.png'));
    imageStoreMap.set(10, require('../images/icon-add.png'));
}

var OFFICE_ITEM_DATA = [];

export default class LoginSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverIp:'',
            username: '',
            userMenu: []
        };
    }
/*
    qq(){
        NativeModules.AllureThirdLoginModule.thirdLogin(
            NativeModules.AllureThirdLoginModule.PLATFORM_QQ,
            (msg) => {
                console.log(msg);
               // ToastAndroid.show(msg, ToastAndroid.SHORT);
            }
        );
    }

    weChat(){
        NativeModules.AllureThirdLoginModule.thirdLogin(
            NativeModules.AllureThirdLoginModule.PLATFORM_WECHAT,
            (msg) => {
                console.log(msg);
                //ToastAndroid.show(msg, ToastAndroid.SHORT);
            }
        );
    }*/

    componentDidMount() {
        //初始化react-native-storage

        userInfo.AsyncGetUserInfo("usertoken", (userinfo) => {
            let json = JSON.parse(userinfo);
            console.log(json)
            this.setState({
                username: json.userinfo.realName,
                serverIp: json.serverIP,
                userMenu: json.menuList
            });
        });
        AsyncStorage.setItem("scanbarcode", JSON.stringify({"barcode": "nodata"}),//把扫描后的条码存入
            function (err) {
                if (err) {
                    console.log(err);
                }
        });
    }

    renderList() {
        return this.state.userMenu.map(row => this.renderItem(row));
    }

    renderItem(row) {
        return (
            <TouchableOpacity onPress={this.onItemClick.bind(this,row.id,row.name)} key={"key"+row.id}>
                <View style={styles.item}>
                    <Image style={styles.itemIcon} source={{uri:this.state.serverIp+'/ythip/images/'+row.priority}}/>
                    <Text style={styles.itemText}>{row.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    onItemClick(rowid, rowname) {
        console.log(rowname + '____' + rowid);
        console.log("服务器IP："+this.state.serverIp)
        const {navigator} = this.props;
        if (navigator) {
            if (rowid === '1'){
                navigator.push({
                    name: 'materialApply',
                    component: MaterialApply,
                    params: {
                        navigator: navigator,
                        rowname: rowname,
                        serverIp:this.state.serverIp,
                        rowid: rowid
                    }
                });
            } else if (rowid === '2') {
                navigator.push({
                    name: 'MaterialMovement',
                    component: MaterialMovement,
                    params: {
                        navigator: navigator,
                        rowname: rowname,
                        rowid: rowid
                    }
                });
            } else if (rowid === '3') {
                navigator.push({
                    name: 'MaterialInventoryList',
                    component: MaterialInventoryList,
                    params: {
                        navigator: navigator,
                        rowname: rowname,
                        rowid: rowid
                    }
                });
            } else if (rowid === '4') {
                navigator.push({
                    name: 'MaterialBarCode',
                    component: MaterialBarCode,
                    params: {
                        navigator: navigator,
                        rowname: rowname,
                        rowid: rowid
                    }
                });
            } else if (rowid === '5') {
                navigator.push({
                    name: 'MaterialConsignment',
                    component: MaterialConsignment,
                    params: {
                        navigator: navigator,
                        rowname: rowname,
                        rowid: rowid
                    }
                });
            } else {
                this.qq();
            }
        }
    }

    render(){
        return (
			<View style={styles.background}>
				<NavigationBar
					leftComponent={{type:'img',iconName:'md-person-add',onPress:()=>Actions.pop()}}
					centerComponent={'首页'}
                    rightComponent={{type:'text',text:this.state.username,onPress:()=>{}}}
				/>
				<ScrollView>
					<View style={styles.scrollBg}>
                        {this.renderList()}
					</View>
				</ScrollView>
			</View>

        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#EFEFF4',
    },
    mainBack: {
        height: 200,
        elevation: 5,
    },
    topBg: {
        flex: 1,
        width: WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    topItem: {
        width: ITEM_HEIGHT,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    item: {
        width: ITEM_HEIGHT,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        margin: 5,
    },
    itemIcon: {
        width: ITEM_ICON,
        height: ITEM_ICON,
    },
    itemText: {
    },
    scrollBg: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'flex-start',
    }
});