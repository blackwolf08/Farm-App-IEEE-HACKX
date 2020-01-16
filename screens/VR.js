import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { ScreenOrientation } from 'expo';

export default class VR extends Component {
  async componentDidMount() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.Orientation.LANDSCAPE_LEFT
    );
  }
  async componentWillUnmount() {
    await ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
  }
  render() {
    return (
      <WebView
        source={{ uri: 'https://vr-farmapp.netlify.com/' }}
        style={{ marginTop: 20, flex: 1 }}
      />
    );
  }
}

const styles = StyleSheet.create({});
