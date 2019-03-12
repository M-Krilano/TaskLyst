import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  Animated
} from "react-native";

import { Button, Card, CardSection } from "../common";

// native-base
import { Container, Item, Input, Icon } from "native-base";

// AWS Amplify
import Auth from "@aws-amplify/auth";

const logo = require("../images/logo.png");

class SignInScreen extends Component {
  state = {
    username: "",
    password: "",
    fadeIn: new Animated.Value(0),
    fadeOut: new Animated.Value(0),
    isHidden: false
  };

  componentDidMount() {
    this.fadeIn();
  }
  fadeIn() {
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
    this.setState({ isHidden: true });
  }
  fadeOut() {
    Animated.timing(this.state.fadeOut, {
      toValue: 0, // 1 in the SignInScreen component
      duration: 700,
      useNativeDriver: true
    }).start();
    this.setState({ isHidden: false });
  }

  onChangeText(key, value) {
    this.setState({ [key]: value });
  }

  async signIn() {
    const { username, password } = this.state;
    await Auth.signIn(username, password)
      .then(user => {
        this.setState({ user });
        this.props.navigation.navigate("AuthLoading");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error when signing in: ", err);
          Alert.alert("Error when signing in: ", err);
        } else {
          console.log("Error when signing in: ", err.message);
          Alert.alert("Error when signing in: ", err.message);
        }
      });
  }

  render() {
    let { fadeOut, fadeIn, isHidden } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.container}>
              {/******************** App Logo ********************/}
              <View style={styles.logoContainer}>
                {isHidden ? (
                  <Animated.Image source={logo} style={{ opacity: fadeIn }} />
                ) : (
                  <Animated.Image
                    source={logo}
                    style={{ opacity: fadeOut, width: 113.46, height: 117 }}
                  />
                )}
              </View>
              {/******************** Info ********************/}

              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="person" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Username"
                      placeholderTextColor="#53C7B1"
                      keyboardType={"email-address"}
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("username", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#53C7B1"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      ref="SecondInput"
                      onChangeText={value =>
                        this.onChangeText("password", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>

                  <CardSection>
                    <Button onPress={this.signIn.bind(this)}>Sign In</Button>
                  </CardSection>
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "column"
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "#5a52a5"
  },
  infoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 200,
    bottom: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#fff"
  },
  itemStyle: {
    marginBottom: 20
    //borderColor: "#553C7B1"
  },
  iconStyle: {
    color: "#53C7B1",
    fontSize: 28,
    marginLeft: 15
  },

  logoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 400,
    bottom: 180,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});

export default SignInScreen;
