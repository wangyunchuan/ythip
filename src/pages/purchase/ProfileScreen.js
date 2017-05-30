/**
 * Created by luojian on 2016/7/14.
 *
 */
import React, {PropTypes, Component} from 'react';
import {Text, ScrollView, RefreshControl, Image,Screen, Dimensions,View, ListView, TouchableOpacity} from 'react-native'
import NavigationBar from '../../Navigation/NavigationBar'
import Style from './Styles/ProfileStyle'
import Barcode from './barcode';
import LoginSuccess from '../../ui/LoginSuccess';
const {width,height}= Dimensions.get('window');

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.rowname = '';
    this.rowid = '';
    this.state = {
      image: {},
      images:{},
      username:'无名氏',
      barcodeResult:'',
      gender:false
    };
  }
    componentDidMount() {
        let {rowname,rowid,barcodeResult}=this.props;
        if(barcodeResult) {
            this.setState({
                barcodeResult: barcodeResult
            })
        }
        if(rowname)
            this.rowname = rowname;
        if(rowid)
            this.rowid = rowid;
        console.log(this.rowname);
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

    toBarCodePage=()=>{
        const {navigator}=this.props;
        const self = this;
        if (navigator) {
            navigator.push({
                name:'barcode',
                component:Barcode,
                params:{
                    //从详情页获取扫描的结果url
                    getUrl:(url)=>{
                        console.log('barcode'+url);
                        self.setState({
                            barcodeResult:url
                        })
                    }
                }
            })
        }
    }

  render() {

    return (
      <View>
        {/*<NavigationBar
          leftComponent={{type:'icon',iconName:'ios-arrow-back',onPress:()=>Actions.pop()}}
          centerComponent='领用出库'
        />*/}
        <NavigationBar
            leftComponent={{type:'text',text:'返回',onPress:this.returnMain.bind(this)}}
            centerComponent={this.rowname}
            rightComponent={{type:'text',text:'扫一扫',onPress:this.toBarCodePage.bind(this)}}
        />
        <ScrollView>

          <View style={Style.ViewList}>
            <Text style={Style.Texts}>物资编码</Text>
            <Text style={Style.Texts}>{this.state.barcodeResult}</Text>
          </View>
          <TouchableOpacity onPress={()=>this.setState({gender:!this.state.gender})}>
          <View  style={Style.ViewList}>
            <Text style={Style.Texts}>性别</Text>
            <Text style={Style.Texts}>女</Text>
          </View>
            </TouchableOpacity>
          <TouchableOpacity onPress={()=>Actions.phone()}>
            <View  style={Style.ViewList}>
              <Text style={Style.Texts}>手机号码</Text>
              <Text style={Style.Texts}>13310120202</Text>
            </View>
          </TouchableOpacity>
          <View  style={Style.ViewList}>
            <Text style={Style.Texts}>所在地区</Text>
            <Text style={Style.Texts}>昆明</Text>
          </View>
          <View style={Style.SignaView}>
            <Text style={Style.Texts}>个性签名</Text>
            <Text style={{fontSize:10,paddingTop:5,color:'#6C6B6B'}}>用我三生烟火换你一世迷离</Text>
          </View>
        </ScrollView>
        {/*<PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' })}
          dialogStyle={{marginBottom:-500}}
          height={100}
        >
          <View>
           <DialogButton text="本 地 相 册" align="center" buttonStyle={{height:50}} onPress={this.pickSingle.bind(this,true)}/>
            <DialogButton text="拍 照" align="center" buttonStyle={{height:50}} onPress={this.pickSingle.bind(this,false)}/>
          </View>
        </PopupDialog>*/}
      </View>
    )
  }
}
