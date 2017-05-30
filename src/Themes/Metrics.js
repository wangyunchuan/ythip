// @flow
import {Dimensions, Platform, PixelRatio} from 'react-native'

const {width, height} = Dimensions.get('window');

// Used via Metrics.baseMargin
const Metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  paddingHorizontal: 10,
  paddingVertical: 10,
  section: 25,
  baseMargin: 5,
  doubleBaseMargin: 5,
  smallMargin: 5,
  horizontalLineHeight: 1,
  searchBarHeight: 30,
  screenWidth: width < height ? width : height,
  screenPiexlWidth: width < height ? PixelRatio.getPixelSizeForLayoutSize(width) : PixelRatio.getPixelSizeForLayoutSize(height),
  screenHeight: width < height ? height : width,
  screenPiexlHeight: width < height ? PixelRatio.getPixelSizeForLayoutSize(height) : PixelRatio.getPixelSizeForLayoutSize(width),
  navBarHeight: 34,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 60
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 300
  }
};

export default Metrics
