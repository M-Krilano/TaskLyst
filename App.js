import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { Icon } from "native-base";

// Auth stack screen imports
import WelcomeScreen from "./src/components/screens/WelcomeScreen";
import SignUpScreen from "./src/components/screens/SignUpScreen";
import SignInScreen from "./src/components/screens/SignInScreen";
import ForgetPasswordScreen from "./src/components/screens/ForgetPasswordScreen";
import AuthLoadingScreen from "./src/components/screens/AuthLoadingScreen";

// App stack screen imports
import HomeScreen from "./src/components/screens/HomeScreen";
import SettingsScreen from "./src/components/screens/SettingsScreen";
import ProfileScreen from "./src/components/screens/ProfileScreen";

// Amplify imports and config
import Amplify from "@aws-amplify/core";
import config from "./src/aws-exports";
Amplify.configure(config);

// configurations for bottom navigation
const configurations = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" style={{ fontSize: 26, color: tintColor }} />
      )
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person" style={{ fontSize: 26, color: tintColor }} />
      )
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: "Settings",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-settings" style={{ fontSize: 26, color: tintColor }} />
      )
    }
  }
};

// option features for bottom tab navigator
const options = {
  tabBarPosition: "bottom",
  swipeEnabled: true,
  animationEnabled: true,
  navigationOptions: {
    tabBarVisible: true
  },
  tabBarOptions: {
    showLabel: true,
    activeTintColor: "#fff",
    inactiveTintColor: "#a8abaf",
    style: {
      backgroundColor: "#53C7B1",
      borderTopWidth: 1,
      borderTopColor: "#ff99", //'#667292',
      paddingBottom: 0
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 12,
      marginTop: 12
    },
    indicatorStyle: {
      height: 0
    },
    showIcon: true
  }
};

// creates bottom App tab navigator
const AppTabNavigator = createMaterialTopTabNavigator(configurations, options);

// Makes the common header title dynamic in AppTabNavigator
AppTabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let headerTitle = routeName;
  return {
    headerTitle
  };
};

// App stack
const AppStackNavigator = createStackNavigator({
  Header: {
    screen: AppTabNavigator,
    // set the header icon
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-menu" size={24} />
          </View>
        </TouchableOpacity>
      )
    })
  }
});

// App Stack (drawer)
const AppDrawerNavigator = createDrawerNavigator({
  Tabs: AppStackNavigator,
  Home: HomeScreen,
  Profile: ProfileScreen,
  Settings: SettingsScreen
});

// Auth stack
const AuthStackNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      title: `Welcome to TaskLyst`,
      headerBackTitle: `Back`
    })
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: `Create an Account`
    })
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Sign In`
    })
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: `Create a New Password`
    })
  }
});

export default createSwitchNavigator({
  // screen: name
  AuthLoading: AuthLoadingScreen, // loading
  Auth: AuthStackNavigator, // Auth Stack (Welcome, SignIn, SignUp, ForgetPassword)
  App: AppDrawerNavigator // App Stack (Home, Profile, Settings)
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    backgroundColor: "#53C7B1",
    alignItems: "center",
    justifyContent: "center"
  }
});
