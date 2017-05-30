/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  NavigationExperimental,
  Image,
  AsyncStorage,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
const {width,height}=Dimensions.get('window');
//import Swiper from 'react-native-swiper';
//import FirstLoad from './firstLoad';
//import Welcome from './welcome';
//import Navigator from 'NavigationExperimental.Navigator';
//var Navigator = NavigationExperimental.Navigator;
import Main from './pages/main';

var isFirstLoading = '';

export default class App extends Component {

    constructor(props) {
    super(props);
    this.state = {
      isFirst:''
    };
  }
  componentWillMount(){
  }
  _initdata(){
    const value = AsyncStorage.getItem('isFirstLoading')
                              .then((data)=>{
                                if(!data){
                                  AsyncStorage.setItem('isFirstLoading','1')
                                }
                                this.setState({ isFirst:data })
                              })
                              .catch((e)=>{ console.log(e) });
   
    
  }
  componentDidMount(){
    this._initdata()
    
  }
  render() {
      return (
          <Navigator
        initialRoute={{
          name:'main',
          component:Main
        }}
        configureScene={
          (route)=>{
          return Navigator.SceneConfigs.PushFromRight;
          }
        }
        renderScene={
              (route, navigator) =>
              {
              let Component = route.component;
              return <Component {...route.params} navigator={navigator} />
          }
        }/>
      );
  }
}

const styles = StyleSheet.create({
  wrapper: {
   },
   slide: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
   },
   images:{
     width:width,
     height:height,
     resizeMode:'contain'
   }

});
