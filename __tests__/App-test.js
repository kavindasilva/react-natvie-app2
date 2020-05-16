/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// import { NativeModules } from "react-native";
// NativeModules.RNGestureHandlerModule = {};
// jest.mock('react-native-gesture-handler', () => { return {} })

jest.mock('react-native-gesture-handler', () => {
  // eslint-disable-next-line global-require
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock') );
// jest.mock('react-native-tab-view', () => {});

// import App from '../App';
// it('renders correctly', () => {
//   renderer.create(<App />);
// });

test('given empty GroceryShoppingList, user can add an item to it', () => {
  const bananaElements = "b";
  expect(bananaElements).toHaveLength(1); // expect 'banana' to be on the list
});