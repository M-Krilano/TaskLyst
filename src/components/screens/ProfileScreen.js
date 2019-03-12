import React from "react";
import { StyleSheet, View, Text } from "react-native";

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

export default ProfileScreen;

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#54E3Bf",
    alignItems: "center",
    justifyContent: "center"
  }
});
