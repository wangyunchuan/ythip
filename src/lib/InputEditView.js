import React, { Component } from 'react';
import {
  ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { Metrics} from '../Themes/index'

export default class InputEditView extends Component {
  constructor(props) {
   super(props);
   this.state = {text: ''};
 }

  render() {
      if (this.props.type === 'input') {
          return (
              <View style={LoginStyles.TextInputView}>
                  <TextInput style={LoginStyles.TextInput}
                             underlineColorAndroid='transparent'
                             placeholder={this.props.name}
                             onChangeText={
           (text) => {
             this.setState({text});
             this.props.onChangeText(text);
           }
        }
                  />
              </View>
          );
      }

      if (this.props.type === 'password') {
          return (
              <View style={LoginStyles.TextInputView}>
                  <TextInput style={LoginStyles.TextInput}
                             underlineColorAndroid='transparent'
                             placeholder={this.props.name}
                             secureTextEntry={true}
                             onChangeText={
           (text) => {
             this.setState({text});
             this.props.onChangeText(text);
           }
        }
                  />
              </View>
          );
      }
  }
}


const LoginStyles = StyleSheet.create({
  TextInputView: {
      flexDirection:'row',
      justifyContent:'space-between',
      paddingLeft:Metrics.doubleBaseMargin,
      paddingRight:Metrics.doubleBaseMargin,
      paddingTop:Metrics.baseMargin+1,
      paddingBottom:Metrics.doubleBaseMargin-10,
      borderBottomWidth:1,
      borderBottomColor:'#DFDFDF'
  },

  TextInput: {
    backgroundColor: '#ffffff',
    height:45,
    margin:18,
  },
});
