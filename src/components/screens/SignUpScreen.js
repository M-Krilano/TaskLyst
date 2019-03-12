import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  Modal,
  FlatList,
  Animated
} from "react-native";

import { Button, CardSection, Card } from "../common";

import { Container, Item, Input, Icon } from "native-base";

// AWS Amplify
import Auth from "@aws-amplify/auth";

const logo = require("../images/logo.png");

class SignUpScreen extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    authCode: "",
    fadeIn: new Animated.Value(0), // Initial value for opacity: 0
    fadeOut: new Animated.Value(1), // Initial value for opacity: 1
    isHidden: false,
    // users will receive a confirmation code
    authCode: ""
  };

  // Sign up user with AWS Amplify Auth
  async signUp() {
    const { username, password, email, phoneNumber } = this.state;
    // rename variable to conform with Amplify Auth field phone attribute
    const phone_number = phoneNumber;
    await Auth.signUp({
      username,
      password,
      attributes: { email, phone_number }
    })
      .then(() => {
        console.log("sign up successful!");
        Alert.alert("Enter the confirmation code you received.");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error when signing up: ", err);
          Alert.alert("Error when signing up: ", err);
        } else {
          console.log("Error when signing up: ", err.message);
          Alert.alert("Error when signing up: ", err.message);
        }
      });
  }

  // Confirm users and redirect them to the SignIn page
  async confirmSignUp() {
    const { username, authCode } = this.state;
    await Auth.confirmSignUp(username, authCode)
      .then(() => {
        this.props.navigation.navigate("SignIn");
        console.log("Confirm sign up successful");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error when entering confirmation code: ", err);
          Alert.alert("Error when entering confirmation code: ", err);
        } else {
          console.log("Error when entering confirmation code: ", err.message);
          Alert.alert("Error when entering confirmation code: ", err.message);
        }
      });
  }

  // Resend code if not received already
  async resendSignUp() {
    const { username } = this.state;
    await Auth.resendSignUp(username)
      .then(() => console.log("Confirmation code resent successfully"))
      .catch(err => {
        if (!err.message) {
          console.log("Error requesting new confirmation code: ", err);
          Alert.alert("Error requesting new confirmation code: ", err);
        } else {
          console.log("Error requesting new confirmation code: ", err.message);
          Alert.alert("Error requesting new confirmation code: ", err.message);
        }
      });
  }

  // helper methods
  // get user input
  onChangeText(key, value) {
    this.setState({ [key]: value });
  }
  // logo animation
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
              {/* App Logo */}
              <View style={styles.logoContainer}>
                {isHidden ? (
                  <Animated.Image
                    source={logo}
                    style={{
                      opacity: fadeIn,
                      width: 80,
                      height: 80
                    }}
                  />
                ) : (
                  <Animated.Image
                    source={logo}
                    style={{
                      opacity: fadeOut,
                      width: 80,
                      height: 80
                    }}
                  />
                )}
              </View>

              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  {/* username section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="person" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Username"
                      placeholderTextColor="#adb4bc"
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
                  {/*  password section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#adb4bc"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      // ref={c => this.SecondInput = c}
                      ref="SecondInput"
                      onSubmitEditing={event => {
                        this.refs.ThirdInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("password", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* email section */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="mail" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#adb4bc"
                      keyboardType={"email-address"}
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref="ThirdInput"
                      onSubmitEditing={event => {
                        this.refs.FourthInput._root.focus();
                      }}
                      onChangeText={value => this.onChangeText("email", value)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* phone section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="call" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="+44766554433"
                      placeholderTextColor="#adb4bc"
                      keyboardType={"phone-pad"}
                      returnKeyType="done"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref="FourthInput"
                      value={this.state.phoneNumber}
                      onChangeText={val =>
                        this.onChangeText("phoneNumber", val)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* End of phone input */}
                  {/* Sign Up Button */}
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.signUp.bind(this)}
                  >
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>

                  {/* code confirmation section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="md-apps" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Confirmation code"
                      placeholderTextColor="#adb4bc"
                      keyboardType={"numeric"}
                      returnKeyType="done"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      onChangeText={value =>
                        this.onChangeText("authCode", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>

                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.confirmSignUp.bind(this)}
                  >
                    <Text style={styles.buttonText}>Confirm Sign Up</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.resendSignUp.bind(this)}
                  >
                    <Text style={styles.buttonText}>Resend code</Text>
                  </TouchableOpacity>
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "column",
    paddingBottom: 20
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "#53C7B1"
  },
  infoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 370,
    bottom: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#fff"
  },
  itemStyle: {
    marginBottom: 10
  },
  iconStyle: {
    color: "#53C7B1",
    fontSize: 28,
    marginLeft: 15
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#53C7B1",
    padding: 14,
    marginBottom: 10,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  logoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 600,
    bottom: 270,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    flex: 1
  },
  textStyle: {
    padding: 5,
    fontSize: 18
  },
  countryStyle: {
    flex: 1,
    backgroundColor: "#99ff",
    borderTopColor: "#211f",
    borderTopWidth: 1,
    padding: 12
  },
  closeButtonStyle: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#211f",
    backgroundColor: "#fff3"
  }
});

export default SignUpScreen;
