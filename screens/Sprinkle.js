import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TextInput
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import Sprink from '../assets/images/sprink.png';

export default class Sprinkle extends Component {
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
    console.log(this.state.inputt);
  };
  predictor = async () => {
    console.log('hello');
    await axios
      .get(
        'https://us-central1-jiitlolupload.cloudfunctions.net/sprinkleWater?city=' +
          this.state.inputt
      )
      .then(res => {
        const answer = res.data;
        this.setState({
          result: answer
        });
      });
    console.log(this.state.result.data.reason.climate);
    this.setState({
      final:
        'The Current Climate in your region is' +
        ' ' +
        this.state.result.data.reason.climate +
        ' So' +
        '  ' +
        this.state.result.data.recommended
    });
    console.log(this.state.final);
  };
  render() {
    return (
      <View>
        <ScrollView>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 23,
              marginTop: 0.1 * HEIGHT
            }}
          >
            Is it a Sprinkling Day?
          </Text>
          <Image
            source={Sprink}
            style={{
              height: 300,
              width: 400,
              resizeMode: 'contain',
              marginTop: 25,
              marginBottom: 25
            }}
          />
          <TextInput
            onChangeText={this.handleInput}
            style={{
              width: WIDTH,
              textAlign: 'center',
              marginBottom: 20
            }}
            placeholder='Enter Your City'
            placeholderTextColor='#000000'
            autoCapitalize='none'
          />
          <TouchableOpacity>
            <Text
              onPress={this.predictor}
              style={{
                textAlign: 'center',
                backgroundColor: '#6c63ff',
                height: 0.07 * HEIGHT,
                fontSize: 22,
                color: '#f9f9f9',
                fontWeight: 'bold',
                paddingTop: 8,
                marginLeft: 40,
                marginRight: 40,
                borderRadius: 40
              }}
            >
              Tap to Know!
            </Text>
          </TouchableOpacity>
          {this.state.final && (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                marginTop: 0.03 * HEIGHT
              }}
            >
              {this.state.final}
            </Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
