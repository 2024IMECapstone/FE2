import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as O from '../styles/Onboard';

export default function StartScreen() {
  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <O.StartScreenContainer>
      <O.StartScreenInnerContainer>
        <View style={styles.topcontainer}>
          <O.StartScreenLogo
            source={require('../assets/images/logo.png')}></O.StartScreenLogo>
          <O.StartScreenText1>나만의 AI 육아 파트너, 아기별</O.StartScreenText1>
        </View>
        <View style={styles.middlecontainer}>
          <O.StartScreenText2>
            <Text style={styles.textbold}>AI</Text> 육아 파트너 아기별을 통해
          </O.StartScreenText2>
          <O.StartScreenText2>
            아기의 움직임을 편리하게{' '}
            <Text style={styles.textbold}>모니터링</Text>
            하고
          </O.StartScreenText2>
          <O.StartScreenText2>
            상황에 따른 <Text style={styles.textbold}>울음 소리 알림</Text>을
            받아보세요!
          </O.StartScreenText2>
        </View>
        <View style={styles.bottomcontainer}>
          <O.StartScreenBtn onPress={goToLogin}>
            <O.StartScreenButtonText>시작하기</O.StartScreenButtonText>
          </O.StartScreenBtn>
        </View>
      </O.StartScreenInnerContainer>
    </O.StartScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },
  topcontainer: {
    display: 'flex',
    // justifyContent: "center",
    alignItems: 'center',
    gap: 14,
    marginTop: '30%',
  },
  middlecontainer: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: "center",
    alignItems: 'center',
    gap: 5,
    marginTop: '-10%',
  },
  textbold: {
    fontWeight: '800',
  },
  bottomcontainer: {
    marginTop: '-10%',
  },
});
