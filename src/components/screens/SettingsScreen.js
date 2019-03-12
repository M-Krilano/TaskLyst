import React, { Component } from "react";
import {
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert
} from "react-native";

import { Button, Card, CardSection } from "../common";

import { Container, Item, Input, Icon } from "native-base";

// AWS Amplify
import Auth from "@aws-amplify/auth";

export default class SettingsScreen extends Component {
  state = {
    password1: "", // old password
    password2: "" // new password
  };

  onChangeText(key, value) {
    this.setState({ [key]: value });
  }

  // Sign out from the app
  signOutAlert = async () => {
    await Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out from the app?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Canceled"),
          style: "cancel"
        },
        // Calling signOut
        { text: "OK", onPress: () => this.signOut() }
      ],
      { cancelable: false }
    );
  };
  // Confirm sign out
  signOut = async () => {
    await Auth.signOut()
      .then(() => {
        console.log("Sign out complete");
        this.props.navigation.navigate("AuthLoading");
      })
      .catch(err => console.log("Error while signing out!", err));
  };

  changePassword = async () => {
    const { password1, password2 } = this.state;
    await Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, password1, password2);
      })
      .then(data => console.log("Password changed successfully", data))
      .catch(err => {
        if (!err.message) {
          console.log("Error changing password: ", err);
          Alert.alert("Error changing password: ", err);
        } else {
          console.log("Error changing password: ", err.message);
          Alert.alert("Error changing password: ", err.message);
        }
      });
  };

  render() {
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
              {/*Infos*/}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <CardSection>
                    <Text
                      style={{
                        color: "#1E1E1E",
                        fontSize: 18,
                        fontWeight: "bold"
                      }}
                    >
                      Change password
                    </Text>
                  </CardSection>

                  {/* Old password */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Old password"
                      placeholderTextColor="#adb4bc"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("password1", value)
                      }
                    />
                  </Item>
                  {/* New password */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="New password"
                      placeholderTextColor="#adb4bc"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      ref="SecondInput"
                      onChangeText={value =>
                        this.onChangeText("password2", value)
                      }
                    />
                  </Item>
                  <CardSection>
                    <Button onPress={this.changePassword.bind(this)}>
                      Submit
                    </Button>
                  </CardSection>

                  <TouchableOpacity
                    style={[
                      styles.buttonStyle,
                      {
                        flexDirection: "row",
                        justifyContent: "center"
                      }
                    ]}
                    onPress={this.signOutAlert}
                  >
                    <Icon
                      name="md-power"
                      style={{ color: "#fff", paddingRight: 10 }}
                    />
                    <Text style={styles.buttonText}>Sign out</Text>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "column",
    paddingBottom: 50
    //marginBottom: 10
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
    //marginBottom: 20,
    borderRadius: 24,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
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
    bottom: 180,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
