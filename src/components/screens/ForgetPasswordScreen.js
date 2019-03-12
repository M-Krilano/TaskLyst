import React, { Component } from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  Animated
} from "react-native";

import { Container, Item, Input, Icon } from "native-base";

// AWS Amplify
import Auth from "@aws-amplify/auth";

const logo = require("../images/logo.png");

class ForgetPasswordScreen extends Component {
  // state
  state = {
    username: "",
    authCode: "",
    newPassword: "",
    fadeIn: new Animated.Value(0), // Initial value for opacity: 0
    fadeOut: new Animated.Value(1), // Initial value for opacity: 1
    isHidden: false
  };

  // Request a new password
  async forgotPassword() {
    const { username } = this.state;
    await Auth.forgotPassword(username)
      .then(data => console.log("New code sent", data))
      .catch(err => {
        if (!err.message) {
          console.log("Error while setting up the new password: ", err);
          Alert.alert("Error while setting up the new password: ", err);
        } else {
          console.log("Error while setting up the new password: ", err.message);
          Alert.alert("Error while setting up the new password: ", err.message);
        }
      });
  }

  // Upon confirmation redirect the user to the Sign In page
  async forgotPasswordSubmit() {
    const { username, authCode, newPassword } = this.state;
    await Auth.forgotPasswordSubmit(username, authCode, newPassword)
      .then(() => {
        this.props.navigation.navigate("SignIn");
        console.log("the New password submitted successfully");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error while confirming the new password: ", err);
          Alert.alert("Error while confirming the new password: ", err);
        } else {
          console.log("Error while confirming the new password: ", err.message);
          Alert.alert("Error while confirming the new password: ", err.message);
        }
      });
  }

  onChangeText(key, value) {
    this.setState({ [key]: value });
  }

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
          keyboardVerticalOffset={23}
        >
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.container}>
              {/* App Logo */}
              <View style={styles.logoContainer}>
                {isHidden ? (
                  <Animated.Image source={logo} style={{ opacity: fadeIn }} />
                ) : (
                  <Animated.Image source={logo} style={{ opacity: fadeOut }} />
                )}
              </View>
              {/* Infos */}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  {/* Username */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="person" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Username"
                      placeholderTextColor="#adb4bc"
                      keyboardType={"email-address"}
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={value =>
                        this.onChangeText("username", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={this.forgotPassword.bind(this)}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Send Code</Text>
                  </TouchableOpacity>
                  {/* the New password section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="New password"
                      placeholderTextColor="#53C7B1"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("newPassword", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* Code confirmation section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="md-apps" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Confirmation code"
                      placeholderTextColor="#53C7B1"
                      keyboardType={"numeric"}
                      returnKeyType="done"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref="SecondInput"
                      onChangeText={value =>
                        this.onChangeText("authCode", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={this.forgotPasswordSubmit.bind(this)}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>
                      Confirm the new password
                    </Text>
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

// Styling
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
    color: "#fff"
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
    backgroundColor: "#fff",
    paddingBottom: 20
  },
  itemStyle: {
    marginBottom: 20
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
    marginBottom: 20,
    paddingBottom: 20,
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
    height: 400,
    bottom: 250,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingBottom: 30
  }
});

export default ForgetPasswordScreen;
