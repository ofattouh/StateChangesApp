/**
 * StateChangesApp React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {AppState, StyleSheet, Text, View} from 'react-native';

export default class App extends Component {
  previousAppState = null;
  currentAppState = 'active';

  state = {
    statusMessage: 'Hello, welcome!',
  };

  constructor(props) {
    super(props);
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = appState => {
    let statusMessage;
    this.previousAppState = this.currentAppState;
    this.currentAppState = appState;

    switch (appState) {
      case 'inactive': // app is unloaded from memory
        statusMessage = 'Please rate us on the app store. Good bye!';
        break;
      case 'background': // app is in memory and backgrounded
        statusMessage = 'App is running in the background...';
        break;
      case 'active': // app is foregrounded
        statusMessage = 'Welcome Back!';
        break;
    }

    this.setState({statusMessage});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.state.statusMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
});

// npx react-native init MyApp
// cd ios // pod install
