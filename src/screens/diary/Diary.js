import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  StatusBar,
  Box,
  HStack,
  IconButton,
  NativeBaseProvider,
} from 'native-base';
// import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import * as S from '../../styles/MainStyle';
import axios from 'axios';

function AppBar() {
  const navigation = useNavigation();
  const goToMain = () => {
    navigation.navigate('Main');
  };
  return (
    <>
      <StatusBar bg="#FFFACD" barStyle="light-content" />
      <Box safeAreaTop bg="#ffffff" />
      <HStack
        bg="#ffffff"
        px="1"
        py="2"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        // maxW="350"
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#DFDFDF',
          backdropFilter: 'blur(8px)',
        }}>
        <HStack>
          <IconButton
            onPress={goToMain}
            icon={<FontAwesome5 name="home" size={20} color="black" />}
          />
        </HStack>
        <HStack>
          <Text
            color="white"
            fontSize="20"
            fontWeight="bold"
            style={styles.text}>
            육아일기
          </Text>
        </HStack>
        <HStack>
          <IconButton
            icon={
              <Ionicons name="notifications-outline" size={20} color="black" />
            }
          />
        </HStack>
      </HStack>
    </>
  );
}

export default function Diary() {
  /* 다른페이지로 이동 연결 */
  const navigation = useNavigation();
  const goToWriteDiary = () => {
    navigation.navigate('WriteDiary');
  };
  const goToDiaryDetail = diaryId => {
    navigation.navigate('DiaryDetail', {diaryId: diaryId});
  };

  /* 다이어리 데이터 가져오기 */
  const [diaries, setDiaries] = useState([]);
  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행되는 부분
    const fetchData = async () => {
      try {
        // axios를 이용하여 데이터를 가져오는 작업 수행
        const response = await axios.get(
          'http://ec2-43-200-172-11.ap-northeast-2.compute.amazonaws.com:8080/api/diary',
        );
        // 가져온 데이터를 state에 저장
        // console.log(response.data);
        setDiaries(response.data);
      } catch (error) {
        console.error('Error fetching diary data:', error);
      }
    };

    fetchData();
  }, [diaries]);
  return (
    <NativeBaseProvider>
      <AppBar />
      <S.Container contentContainerStyle={{alignItems: 'center'}}>
        {/* 오늘의 육아일기가 이미 작성이 되었다면, 버튼 숨기기. or 중복작성가능 */}
        <S.Btn onPress={goToWriteDiary} style={{width: '100%'}}>
          <S.BtnText>오늘의 육아일기 쓰러가기 ✍🏻</S.BtnText>
        </S.Btn>
        {/* 추후 Card는 get을 통해 data fetch 필요 */}
        {/* Display fetched diaries */}
        {diaries.map((diary, index) => (
          <S.Card key={index} style={{gap: 30}}>
            <S.DiaryHeader>
              {/* Format the date */}
              <Text style={{fontSize: 18, color: '#615C5C'}}>
                {new Date(diary.created)
                  .toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replace(/\./g, '/')
                  .replace(/\s/g, '')
                  .replace(/\/$/, '')}
                {'('}
                {new Date(diary.created).toLocaleDateString('ko-KR', {
                  weekday: 'short',
                })}
                {')'}
              </Text>
              <TouchableOpacity onPress={() => goToDiaryDetail(diary.id)}>
                <AntDesign name="right" size={20} color="black" />
              </TouchableOpacity>
            </S.DiaryHeader>
            <S.DiaryContext numberOfLines={2}>{diary.content}</S.DiaryContext>
          </S.Card>
        ))}
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
});
