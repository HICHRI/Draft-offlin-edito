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
    WebView
} from 'react-native';
import { List, ListItem } from 'react-native-elements'



export default class draftEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {showText: "test1", list:[]};
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onSelectUser = this.onSelectUser.bind(this)
    }
    onSelectUser(user) {
        this.refs.WebView.postMessage(user);
    }
    onSearchChange(event) {
        // when onSearchChange envocked from draft the webview call window.postMessage as a trigger to this method .
        // Parse and display seggestions .
        let receivedData = typeof event.nativeEvent.data
        this.setState({list: JSON.parse(event.nativeEvent.data), showText : ""} );
    }
  render() {
      console.log("test")
      const webapp = require('./webapp/index.html');
    return (

      <View style={styles.container}>
        <Text style={styles.welcome}>


            {this.state.showText}
        </Text>
          <WebView
              ref={"WebView"}
              source={webapp}
              style={{width: 400, height: 20}}
              javaScriptEnabled={true}
              onMessage={this.onSearchChange}
              domStorageEnabled={true}

          />
          <List containerStyle={{marginBottom: 20, width: 400}}>
              {
                  this.state.list.map((l, i) => (
                      <ListItem
                          onPress = {() => { this.refs.WebView.postMessage(i); }} // send notif to draft to add mention and remove the siggustions list
                          roundAvatar
                          avatar={{uri:l.avatar}}
                          key={i}
                          title={l.name}
                      />
                  ))
              }
          </List>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('draftEditor', () => draftEditor);
