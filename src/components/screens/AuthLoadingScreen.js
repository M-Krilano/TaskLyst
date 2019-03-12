import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  AsyncStorage
} from "react-native";

// AWS Amplify
import Auth from "@aws-amplify/auth";

class AuthLoadingScreen extends Component {
  // state
  state = {
    userToken: null
  };

  componentDidMount = async () => {
    await this.loadApp();
  };

  loadApp = async () => {
    await Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({
          userToken: user.signInUserSession.accessToken.jwtToken
        });
      })
      .catch(err => console.log(err));
    this.props.navigation.navigate(this.state.userToken ? "App" : "Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
}

export default AuthLoadingScreen;

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#FFFFFF",
    backgroundColor: "#53C7B1",
    alignItems: "center",
    justifyContent: "center"
  }
});
