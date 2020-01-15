import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import AccessoryBar from './AccessoryBar';
import firebaseSDK from './firebaseSDK';
import { mocks } from '../constants';

export default class Chat extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Help Desk',
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerTintColor: '#000'
    };
  };

  state = {
    messages: [],
    loading: true,
    loadEarlier: true,
    isLoadingEarlier: false
  };
  get user() {
    return {
      name: this.state.profile.username,
      email: this.state.profile.email,
      avatar:
        'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png',
      id: firebaseSDK.uid,
      _id: firebaseSDK.uid
    };
  }

  renderAccessory = () => <AccessoryBar onSend={firebaseSDK.uploadImage} />;

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0'
          }
        }}
      />
    );
  };

  async componentDidMount() {
    let { profile } = this.props;
    this.setState({ profile, loading: true });
    try {
      await firebaseSDK.createAccount(profile.username);
      firebaseSDK.refOn(message => {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
          loading: false
        }));
      });
    } catch (err) {
      console.log(err);
    }
  }
  componentWillUnmount() {
    firebaseSDK.refOff();
  }

  loginSuccess = () => {
    console.log('login successful, navigate to chat.');
  };

  loginFailed = err => {
    alert('Login failure. Please tried again.');
    console.log(err);
  };
  onLoadEarlier = () => {
    console.log('loading');
    this.setState({
      isLoadingEarlier: true
    });
    firebaseSDK.earlierMessages(message => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
        loading: false,
        loadEarlier: false,
        isLoadingEarlier: false
      }));
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1
        }}
        behavior='padding'
        enabled
      >
        <GiftedChat
          messages={this.state.messages}
          onSend={firebaseSDK.send}
          user={this.user}
          alwaysShowSend
          isAnimated
          renderUsernameOnMessage
          showUserAvatar
          keyboardShouldPersistTaps='never'
          scrollToBottom
          renderAccessory={Platform.OS === 'web' ? null : this.renderAccessory}
          renderBubble={this.renderBubble}
        />
      </KeyboardAvoidingView>
    );
  }
}

Chat.defaultProps = {
  profile: mocks.profile
};
