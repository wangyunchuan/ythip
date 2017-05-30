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
export default class EditView extends Component {
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

      if (this.props.type === 'readonlyInput') {
          return (
              <View style={LoginStyles.TextInputView}>
                  <TextInput style={LoginStyles.TextInput}
                             underlineColorAndroid='transparent'
                             placeholder={this.props.name}
                             value={this.props.defaultValue}
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
    marginTop: 10,
    height:50,
    backgroundColor: '#ffffff',
    borderRadius:5,
    borderWidth:0.3,
    borderColor:'#000000',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  TextInput: {
    backgroundColor: '#ffffff',
    height:45,
    margin:18,
  },
});
