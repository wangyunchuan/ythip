/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/*
import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';

import App from './src/app';
class ythip extends Component{
  render(){
    return(
      <App />
    )
  }
}
AppRegistry.registerComponent('ythip', () => ythip);*/
'use strict';

import React from 'react-native';
import Root from './app/root';

const {
    AppRegistry,
} = React;

AppRegistry.registerComponent('ythip', () => Root);'use strict';
