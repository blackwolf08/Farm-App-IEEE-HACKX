import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { Card, Badge, Block, Text } from '../components';
import { theme } from '../constants';
const { width, height } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android' ? true : false;
import axios from 'axios';

export default class RecommendedCrops extends Component {
  state = {
    loading: true,
    data: {},
    text: ''
  };
  async componentDidMount() {
    let res = await axios.get(
      'https://us-central1-jiitlolupload.cloudfunctions.net/recommendedCrops?city=del'
    );
    this.setState({
      data: res.data.data,
      loading: false
    });
  }
  handleInput = text => {
    this.setState({ text });
  };
  renderCrops = () => {
    let { data } = this.state;
    let crops = data.recommendedCrops.map((crop, i) => (
      <TouchableOpacity key={i} onPress={() => navigation.navigate('Weather')}>
        <Card center middle shadow style={styles.category}>
          <Badge margin={[0, 0, 15]} size={50} color='rgba(41,216,143,0.20)'>
            <Image
              style={{
                height: 70,
                width: 70,
                borderRadius: 50
              }}
              source={{ uri: data.cropsPhotoLink[i] }}
            />
          </Badge>
          <Text medium height={20}>
            {crop}
          </Text>
        </Card>
      </TouchableOpacity>
    ));
    return crops;
  };
  predictor = async () => {
    this.setState({
      loading: true
    });
    let res = await axios.get(
      'https://us-central1-jiitlolupload.cloudfunctions.net/recommendedCrops?city=' +
        this.state.text
    );
    this.setState({
      data: res.data.data,
      loading: false
    });
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={{
          marginTop: isAndroid ? 50 : 20
        }}
        behavior='padding'
      >
        <Text
          style={{
            paddingHorizontal: 30
          }}
          h1
          bold
          center
        >
          What crops to sow this season?
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          <Block flex={false} row space='between' style={styles.categories}>
            {!this.state.loading && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    paddingHorizontal: 30
                  }}
                  h4
                  bold
                  center
                >
                  Climate: {this.state.data.currentWeather.climate}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 30
                  }}
                  h4
                  bold
                  center
                >
                  Climate: {this.state.data.currentWeather.temperature}
                </Text>
              </View>
            )}

            {!this.state.loading && this.renderCrops()}
            {this.state.loading && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    paddingHorizontal: 30
                  }}
                  h3
                  bold
                  center
                >
                  Loading
                </Text>
              </View>
            )}
          </Block>
        </ScrollView>
        <Text
          style={{
            paddingHorizontal: 30,
            marginTop: -70
          }}
          h4
          bold
          center
        >
          Somewhere Else?
        </Text>
        <TextInput
          onChangeText={this.handleInput}
          style={{
            width: width,
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
              height: 0.07 * height,
              fontSize: 22,
              color: '#f9f9f9',
              fontWeight: 'bold',
              paddingTop: 8,
              marginLeft: 40,
              marginRight: 40,
              borderRadius: 40,
              marginBottom: 20
            }}
          >
            Tap to Know!
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: 60,
    width: 60
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  }
});
