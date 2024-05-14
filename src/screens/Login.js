import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as O from '../styles/Onboard';

export default function Login() {
  const navigation = useNavigation();
  const [id, setId] = React.useState('');
  const [pw, setPw] = React.useState('');
  const goToMain = () => {
    navigation.navigate('Main');
  };
  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <O.LoginContainer>
      <O.LoginLogo source={require('../assets/images/logo.png')}></O.LoginLogo>
      <O.LoginInputContainer>
        <TextInput
          style={styles.input}
          placeholderTextColor="gray"
          placeholder="아이디(이메일)"
          onChangeText={setId}
          value={id}
          className="mt-1 px-3 py-3 bg-white border-b shadow-sm  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full  sm:text-sm focus:ring-1"
          autoCapitalize="none"
          // autoFocus
          inputMode="email"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="gray"
          placeholder="비밀번호"
          onChangeText={setPw}
          value={pw}
          secureTextEntry
          className="mt-5 px-3 py-3 bg-white border-b shadow-sm  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full  sm:text-sm focus:ring-1"
        />
      </O.LoginInputContainer>
      <O.LoginBtn onPress={goToMain}>
        <O.LoginButtonText>로그인</O.LoginButtonText>
      </O.LoginBtn>
      <O.LoginBottomContainer>
        <Text className="text-gray-600 text-xs" style={styles.text}>
          아직 회원이 아니신가요?
        </Text>
        <TouchableOpacity onPress={goToSignUp}>
          <Text className="ml-7 border-b text-xs" style={styles.text}>
            회원가입
          </Text>
        </TouchableOpacity>
      </O.LoginBottomContainer>
      {/* flow : 로그인 토큰 유무 확인하고, 토큰 존재 시 메인으로 바로 이동.
      지금은 편의상 메인으로의 편리한 이동을 위해 버튼으로 구현해놓음.*/}
      {/* <Button title="메인으로 가기" onPress={goToMain}></Button> */}
    </O.LoginContainer>
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
    color: 'gray',
  },
  input: {
    color: 'black',
  },
});
