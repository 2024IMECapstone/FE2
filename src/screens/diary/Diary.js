import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  StatusBar,
  Box,
  HStack,
  IconButton,
  NativeBaseProvider,
} from 'native-base';
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
  const navigation = useNavigation();
  const goToWriteDiary = () => {
    navigation.navigate('WriteDiary');
  };
  const goToDiaryDetail = diaryId => {
    navigation.navigate('DiaryDetail', {diaryId: diaryId});
  };

  const [diaries, setDiaries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://ec2-43-200-172-11.ap-northeast-2.compute.amazonaws.com:8080/api/diary',
        );
        setDiaries(response.data);
      } catch (error) {
        console.error('Error fetching diary data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' });
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <NativeBaseProvider>
      <AppBar />
      <S.Container contentContainerStyle={{alignItems: 'center'}}>
        <S.Btn onPress={goToWriteDiary} style={{width: '100%'}}>
          <S.BtnText>오늘의 육아일기 쓰러가기 ✍🏻</S.BtnText>
        </S.Btn>
        {diaries.map((diary, index) => (
          <S.Card key={index} style={{gap: 30}}>
            <S.DiaryHeader>
              <Text style={{fontSize: 18, color: '#615C5C'}}>
              {formatDate(diary.created)}
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
