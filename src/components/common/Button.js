import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    //alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: "#53C7B1",
    //borderRadius: 5,
    //borderWidth: 1,
    //borderColor: "#007aff",
    //marginLeft: 5,
    //marginRight: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,

    padding: 14,
    marginBottom: 20,
    borderRadius: 24
  }
};

export { Button };
