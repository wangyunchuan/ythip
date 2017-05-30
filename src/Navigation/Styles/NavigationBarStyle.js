/**
 * Created by Administrator on 2016/12/25 0025.
 */
import {StyleSheet,Platform} from 'react-native'
import {Colors, Metrics, Fonts,} from '../../Themes/'
const fontSize=15.1
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Metrics.navBarHeight,
    width: Metrics.screenWidth,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor: '#EFEDED'
  },
  leftComponent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: Metrics.navBarHeight,
    paddingLeft:10,
    width:Metrics.screenWidth/4
  },
  centerComponent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.navBarHeight,
    width:Metrics.screenWidth/2,
  },
  rightComponent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.navBarHeight,
    width:Metrics.screenWidth/4,
    paddingRight: Metrics.doubleBaseMargin
  },
  title: {
    fontSize: fontSize,
    fontFamily:'NotoSansHans-DemiLight',
    margin: 0,
    padding: 0,
    //color:'rgb(0,0,0)'
  },
  text: {
    margin: 0,
    padding: 0,
    fontSize: fontSize,
    fontFamily:'NotoSansHans-DemiLight',
    //color:'#000000'
  }
})
