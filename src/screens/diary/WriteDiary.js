import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {StatusBar, Box, HStack, NativeBaseProvider} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import * as S from '../../styles/MainStyle';
import ImagePick from '../../components/ImagePick';
import axios from 'axios';

const getFormattedDate = () => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const month = months[today.getMonth()];
  const day = today.getDate();

  return `${month} ${day}일 ${dayOfWeek}요일`;
};

function AppBar() {
  return (
    <>
      <StatusBar bg="#FFFACD" barStyle="light-content" />
      <Box safeAreaTop bg="#ffffff" />
      <HStack
        bg="#ffffff"
        px="1"
        py="2"
        // justifyContent="space-between"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="16"
        // maxW="350"
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#DFDFDF',
          backdropFilter: 'blur(8px)',
        }}>
        <HStack alignItems="center" w="10"></HStack>
        <HStack>
          <Text
            fontSize="20"
            fontWeight="bold"
            style={{color: '#000', marginLeft: -24}}>
            오늘의 육아일기
          </Text>
        </HStack>
        <HStack>
          {/* <S.submitBtn>
            <S.submitBtnText>완료</S.submitBtnText>
          </S.submitBtn> */}
        </HStack>
      </HStack>
    </>
  );
}

export default function WriteDiary() {
  const [photo, setPhoto] = useState(undefined);
  const [text, setText] = useState('');
  // console.log("text: ", text);

  const navigation = useNavigation();
  // const goToFinish = () => {
  //   navigation.navigate("WriteFinish");
  // };

  const sendData = async () => {
    try {
      const response = await axios.post(
        'http://ec2-43-200-172-11.ap-northeast-2.compute.amazonaws.com:8080/api/post',
        {
          content: text,
          baby_id: 12,
        },
        // 추후 post 요청에 사용자의 baby_id 도 같이 넣어줘야함.
      );
      console.log(response);
      console.log('Data sent successfully!');
      // API 요청 성공 후 다음 화면으로 이동하거나, 다른 작업 수행
      navigation.navigate('WriteFinish');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  return (
    <NativeBaseProvider>
      <AppBar />
      <S.Container contentContainerStyle={{alignItems: 'center'}}>
        <S.Card>
          <S.CardTitle>{getFormattedDate()}</S.CardTitle>
          <S.CardInnerBorder2>
            {/* <ImagePick
              url={photo}
              onChangePhoto={(newPhoto) => setPhoto(newPhoto)}
            /> */}
          </S.CardInnerBorder2>
          <S.CardTextarea
            value={text}
            onChangeText={newText => setText(newText)}></S.CardTextarea>
          <S.submitBtn onPress={sendData} style={{width: '100%'}}>
            <S.submitBtnText>완료</S.submitBtnText>
          </S.submitBtn>
        </S.Card>
      </S.Container>
    </NativeBaseProvider>
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
  bold: {
    fontWeight: 'bold',
  },
  innerbox: {
    marginBottom: 12,
  },
  btn: {
    marginTop: 12,
  },
});
