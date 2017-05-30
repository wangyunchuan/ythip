/**
 * Created by Melon on 2016/12/28.
 */
import { StyleSheet,Dimensions } from 'react-native'
import { ApplicationStyles, Metrics, Colors,Fonts } from '../../../Themes/index'

const {width, height} = Dimensions.get('window');
var newsize=width/375;
export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#EFEFF4',
    },
    ViewList:{
        flexDirection:'row',
        justifyContent:'space-between',
        //paddingLeft:22.5,
        //paddingRight:24,
        paddingLeft:Metrics.doubleBaseMargin,
        paddingRight:Metrics.doubleBaseMargin,
        paddingTop:Metrics.baseMargin+1,
        paddingBottom:Metrics.doubleBaseMargin-1,
        borderBottomWidth:1,
        flexWrap:'wrap',
        borderBottomColor:'#DFDFDF'
    },
    carSpace: {
        flex: 1,
        backgroundColor: '#CDCDB4',
    },
    Titles:{
        fontSize:15.1*newsize,
        //flexWrap:'wrap'
    },
    Texts:{
        fontSize:15.1*newsize,
        backgroundColor:'#CDCDB4'
    },
    ImageSize:{
        borderRadius:25,
        width:50,
        height:50
    },
    Divider:{
        width:width/2,
        height:1,
        backgroundColor:'#CDCDB4',
        marginTop:Metrics.smallMargin
    },
    SignaView:{
        flexDirection:'column',
        //paddingBottom:Metrics.doubleBaseMargin-4,
        //paddingTop:Metrics.baseMargin+7,
        //paddingLeft:Metrics.doubleBaseMargin,
        paddingLeft:22.5,
        paddingRight:24,
        borderBottomWidth:1,
        //borderBottomColor:'#DFDFDF'
    }
})
