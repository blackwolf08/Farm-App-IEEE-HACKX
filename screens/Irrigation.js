import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  Linking
} from 'react-native';
import soil from '../assets/images/soil.png';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Irrigation extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: true
    };
  };
  state = {
    inputt: null,
    result: null,
    final: null
  };
  handleInput = text => {
    this.setState({ inputt: text });
  };
  predictor = async () => {
    await axios
      .get(
        'https://us-central1-jiitlolupload.cloudfunctions.net/moisture?city=' +
          this.state.inputt
      )
      .then(res => {
        const answer = res.data;
        this.setState({
          result: answer
        });
      });
    this.setState({
      final:
        'According to our data, the moisture in your soil is' +
        '  ' +
        this.state.result['data']['moisture'] +
        '  ' +
        'we suggest you to follow' +
        '  ' +
        this.state.result['data']['irri_type']
    });
  };
  render() {
    return (
      <View>
        <ScrollView>
          <Image
            style={{
              height: 0.5 * HEIGHT,
              width: 0.6 * WIDTH,
              resizeMode: 'contain',
              marginLeft: 0.2 * WIDTH
            }}
            source={soil}
          />
          <TextInput
            onChangeText={this.handleInput}
            style={{ width: WIDTH, textAlign: 'center' }}
            placeholder='Enter Your City'
            placeholderTextColor='#000000'
            autoCapitalize='none'
          />
          <TouchableOpacity>
            <Text
              onPress={this.predictor}
              style={{
                backgroundColor: '#49e1d2',
                textAlign: 'center',
                height: 0.08 * HEIGHT,
                fontWeight: 'bold',
                color: '#f9f9f9',
                fontSize: 22,
                marginTop: 15,
                marginLeft: 20,
                marginRight: 20,
                borderRadius: 40,
                paddingTop: 12
              }}
            >
              Predict Irrigation Method
            </Text>
          </TouchableOpacity>
          {this.state.final && (
            <View
              style={{
                width: 0.8 * WIDTH,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 0.05 * HEIGHT
              }}
            >
              <Text style={{ fontSize: 18, textAlign: 'center' }}>
                {this.state.final}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(this.state.result.data.readmore).catch(err =>
                    console.error('An error occurred', err)
                  );
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'blue',
                    textAlign: 'center'
                  }}
                >
                  Read More ...
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
