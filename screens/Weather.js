import React, { Component } from "react";
import { Text, StyleSheet, View, Image, Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Weatherr from "../assets/images/Weatherr.png";
import axios from "axios";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default class Weather extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: true
    };
  };
  state = {
    res: null,
    today: null,
    tom: null,
    tom1: null,
    tom2: null,
    tom3: null,
    weather: null,
    weather1: null,
    weather2: null,
    weather3: null,
    weather4: null
  };
  predictor = async () => {
    this.setState({
      res: "loading.."
    });
    console.log(this.state.res);
    await axios
      .get(
        "http://api.agromonitoring.com/agro/1.0/weather/forecast?polyid=5e1f4cef4fcefd5403f9101d&appid=1e747d20859e4583fe202c9a38b1d709"
      )

      .then(res => {
        const result = res.data;
        this.setState({
          weather: res.data[0]["weather"][0]["description"],
          weather1: res.data[1]["weather"][0]["description"],
          weather2: res.data[2]["weather"][0]["description"],
          weather3: res.data[3]["weather"][0]["description"],
          weather4: res.data[4]["weather"][0]["description"]
        });
      });
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    var tom = new Date();
    tom.setDate(currentDate.getDate() + 1);
    var tom1 = new Date();
    tom1.setDate(currentDate.getDate() + 2);
    var tom2 = new Date();
    tom2.setDate(currentDate.getDate() + 3);
    var tom3 = new Date();
    tom3.setDate(currentDate.getDate() + 4);
    console.log(tom3.toString().substring(4, 15));
    this.setState({
      today: currentDate.toString().substring(4, 15),
      tom: tom.toString().substring(4, 15),
      tom1: tom1.toString().substring(4, 15),
      tom2: tom2.toString().substring(4, 15),
      tom3: tom3.toString().substring(4, 15)
    });

    console.log("hello");
  };
  render() {
    return (
      <View>
        <ScrollView>
          <View>
            <Image
              style={{
                resizeMode: "contain",
                height: 200,
                width: 400,
                marginTop: 0.15 * HEIGHT
              }}
              source={Weatherr}
            ></Image>
          </View>
          <TouchableOpacity>
            <Text
              onPress={this.predictor}
              style={{
                marginTop: 0.04 * HEIGHT,
                fontSize: 20,
                fontWeight: "bold",
                backgroundColor: "#6c63ff",
                height: 0.07 * HEIGHT,
                borderRadius: 40,
                marginLeft: "auto",
                marginRight: "auto",
                width: 0.7 * WIDTH,
                textAlign: "center",
                color: "#f9f9f9",
                paddingTop: 0.015 * HEIGHT
              }}
            >
              Predict Weather!
            </Text>
          </TouchableOpacity>
          {this.state.weather4 && (
            <View
              style={{
                width: 0.9 * WIDTH,
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#6c63ff",
                marginTop: 0.1 * HEIGHT,
                height: 0.2 * HEIGHT,
                borderRadius: 40,
                paddingTop: 0.025 * HEIGHT,
                paddingLeft: 0.16 * WIDTH
              }}
            >
              <Text style={{ color: "#f9f9f9", fontSize: 15 }}>
                {this.state.today}
                {"    "}
                {this.state.weather}
              </Text>
              <Text style={{ color: "#f9f9f9", fontSize: 15 }}>
                {this.state.tom}
                {"     "}
                {this.state.weather1}
              </Text>
              <Text style={{ color: "#f9f9f9", fontSize: 15 }}>
                {this.state.tom1}
                {"   "}
                {this.state.weather2}
              </Text>
              <Text style={{ color: "#f9f9f9", fontSize: 15 }}>
                {this.state.tom2}
                {"    "}
                {this.state.weather3}
              </Text>
              <Text style={{ color: "#f9f9f9", fontSize: 15 }}>
                {this.state.tom3}
                {"    "}
                {this.state.weather4}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
