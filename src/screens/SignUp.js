import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as O from "../styles/Onboard";

export default function SignUp() {
  const navigation = useNavigation();
  const goToMain = () => {
    navigation.navigate("Main");
  };
  return (
    <O.LoginContainer>
      <O.LoginLogo source={require("../assets/images/logo.png")}></O.LoginLogo>
      <Text>회원가입 페이지입니다.</Text>
    </O.LoginContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
  },
});
