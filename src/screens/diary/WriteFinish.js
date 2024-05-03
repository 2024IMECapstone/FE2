import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as O from "../../styles/Onboard";

export default function WriteFinish() {
  const navigation = useNavigation();
  const goToDiary = () => {
    navigation.navigate("Diary");
  };
  const goToMain = () => {
    navigation.navigate("Main");
  };
  return (
    <O.StartScreenContainer>
      <O.StartScreenInnerContainer>
        <View style={styles.topcontainer}>
          <O.WriteFinishTextTitle>오늘의 육아일기</O.WriteFinishTextTitle>
          <O.WriteFinishTextTitle>작성 완료!</O.WriteFinishTextTitle>
        </View>
        <View style={styles.middlecontainer}>
          <O.WriteFinishTextTitle2>오늘도 아이와 함께</O.WriteFinishTextTitle2>
          <O.WriteFinishTextTitle2>
            소중한 순간을 만들었어요!
          </O.WriteFinishTextTitle2>
        </View>
        <View style={styles.bottomcontainer}>
          <O.StartScreenBtn onPress={goToDiary}>
            <O.StartScreenButtonText>
              다른 육아일기 보러가기
            </O.StartScreenButtonText>
          </O.StartScreenBtn>
          <O.StartScreenBtn onPress={goToMain}>
            <O.StartScreenButtonText>메인으로 이동</O.StartScreenButtonText>
          </O.StartScreenBtn>
        </View>
      </O.StartScreenInnerContainer>
    </O.StartScreenContainer>
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
  topcontainer: {
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    // gap: 10,
    marginTop: "30%",
  },
  middlecontainer: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: "-10%",
  },
  textbold: {
    fontWeight: "800",
  },
  bottomcontainer: {
    // marginTop: "-10%",
    display: "flex",
    gap: 12,
  },
});
