import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Icon } from 'native-base';
import { Card, Badge, Button, Block, Text } from '../components';
import { theme, mocks } from '../constants';
import explore_3 from '../assets/icons/plants_1.png';

const { width } = Dimensions.get('window');
const isAndroid = Platform.OS == 'android' ? true : false;

class Browse extends Component {
  state = {
    active: 'Services',
    categories: []
  };

  componentDidMount() {
    this.setState({ categories: this.props.categories });
  }

  handleTab = tab => {
    const { categories } = this.props;
    const filtered = categories.filter(category =>
      category.tags.includes(tab.toLowerCase())
    );

    this.setState({ active: tab, categories: filtered });
  };

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { profile, navigation } = this.props;
    const { categories } = this.state;
    const tabs = ['Services'];

    return (
      <Block style={{ marginTop: isAndroid ? 50 : 30 }}>
        <Block flex={false} row center space='between' style={styles.header}>
          <Text h1 bold>
            Browse
          </Text>
          <Button
            style={{
              height: 80,
              borderRadius: 50,
              width: 80,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => navigation.navigate('Settings')}
          >
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>

        <Block flex={false} row style={styles.tabs}>
          {tabs.map(tab => this.renderTab(tab))}
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          <Block flex={false} row space='between' style={styles.categories}>
            <TouchableOpacity onPress={() => navigation.navigate('Weather')}>
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color='rgba(41,216,143,0.20)'
                >
                  <Image source={explore_3} />
                </Badge>
                <Text medium height={20}>
                  Weather
                </Text>
                <Text center gray caption>
                  4 days Weather prediction
                </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Irrigation')}>
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color='rgba(41,216,143,0.20)'
                >
                  <Image source={explore_3} />
                </Badge>
                <Text medium height={20}>
                  Irrigation
                </Text>
                <Text
                  style={{
                    textAlign: 'center'
                  }}
                  gray
                  caption
                >
                  Get the right method for you
                </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('RecommendedCrops')}
            >
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color='rgba(41,216,143,0.20)'
                >
                  <Image source={explore_3} />
                </Badge>
                <Text center medium height={20}>
                  What Crops?
                </Text>
                <Text center gray caption>
                  Crops
                </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Sprinkle')}>
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color='rgba(41,216,143,0.20)'
                >
                  <Image source={explore_3} />
                </Badge>
                <Text medium height={20}>
                  Sprinkler Today?
                </Text>
                <Text center gray caption>
                  City based
                </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('VR')}>
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color='rgba(41,216,143,0.20)'
                >
                  <Image source={explore_3} />
                </Badge>
                <Text medium height={20}>
                  VR
                </Text>
                <Text center gray caption>
                  Experience Crops diseases in VR
                </Text>
              </Card>
            </TouchableOpacity>
          </Block>
        </ScrollView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            height: 70,
            width: 70,
            bottom: 70,
            right: 30,
            backgroundColor: 'rgba(41,216,143,0.8)',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50
          }}
          onPress={() => {
            this.props.navigation.navigate('Chat');
          }}
        >
          <Icon
            style={{
              color: '#eee'
            }}
            name='ios-chatbubbles'
            type='Ionicons'
          />
        </TouchableOpacity>
      </Block>
    );
  }
}

Browse.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories
};

export default Browse;

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
