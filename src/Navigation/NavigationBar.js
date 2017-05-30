/**
 * Created by luojian on 2016/12/25 0025.
 */
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import style from './Styles/NavigationBarStyle'
import Empty from './emptyUtils'

class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        leftComponent: React.PropTypes.object,
        centerComponent: React.PropTypes.string.isRequired,
        rightComponent: React.PropTypes.object
    };

    handleLeftComponent(obj) {
        if (typeof obj !== 'undefined') {
            if (obj.type === 'icon') {
                return (
                    <TouchableOpacity style={style.touchableOpacity} onPress={obj.onPress}>
                      <View style={style.leftComponent}>
                        <Icon name={obj.iconName} color="#000" size={24}/>
                      </View>
                    </TouchableOpacity>
                )
            }
            if (obj.type === 'text') {
                return (
                    <TouchableOpacity style={style.touchableOpacity} onPress={obj.onPress}>
                      <View style={style.leftComponent}>
                        <Text style={style.text}>{obj.text}</Text>
                      </View>
                    </TouchableOpacity>
                )
            }
            if (obj.type === 'img') {
                return (
                    <View style={style.leftComponent}>
                      <Image
                          source={require('../images/header-logo2.png')}/>
                        {/* <Icon name={obj.iconName} color="#000" size={24}/>*/}
                    </View>
                )
            }
        } else {
            return (<View style={{height:0,width:60}}></View>);
        }
    }

    handleRightComponent(obj) {
        if (typeof obj !== 'undefined') {
            if (obj.type === 'icon') {
                return (
                    <TouchableOpacity style={style.touchableOpacity} onPress={obj.onPress}>
                      <View style={style.rightComponent}>
                        <Icon name={obj.iconName} color="#000" size={24}/>
                      </View>
                    </TouchableOpacity>
                )
            }
            if (obj.type === 'text') {
                return (
                    <TouchableOpacity style={style.touchableOpacity} onPress={obj.onPress}>
                      <View style={style.rightComponent}>
                        <Text style={style.text}>{obj.text}</Text>
                      </View>
                    </TouchableOpacity>
                )
            }
        } else {
            return (<View style={{height:0,width:60}}></View>);
        }
    }

    render() {
        const {
            leftComponent,
            rightComponent,
            centerComponent,
        } = this.props;

        return (
            <View style={style.container}>
                {this.handleLeftComponent(leftComponent)}
              <View style={style.centerComponent}>
                <Text style={style.title}>{centerComponent}</Text>
              </View>
                {this.handleRightComponent(rightComponent)}
            </View>
        )
    }
}

export default NavigationBar
