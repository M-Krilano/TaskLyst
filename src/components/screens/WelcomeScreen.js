import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import { Button, Card, CardSection } from "../common";

const logo = require("../images/logo.png");

class WelcomeScreen extends Component {
  handleRoute = async destination => {
    await this.props.navigation.navigate(destination);
  };

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <Card>
          <CardSection>
            <Image
              style={{ paddingTop: 100, width: 80, height: 80 }}
              source={logo}
            />
          </CardSection>
          <CardSection>
            <Button onPress={() => this.props.navigation.navigate("SignUp")}>
              Sign Up
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => this.props.navigation.navigate("SignIn")}>
              Sign In
            </Button>
          </CardSection>
          <CardSection>
            <Button
              onPress={() => this.props.navigation.navigate("ForgetPassword")}
            >
              Forgot Password
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default WelcomeScreen;
