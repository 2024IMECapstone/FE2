import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import {
  StatusBar,
  Box,
  HStack,
  IconButton,
  NativeBaseProvider,
} from 'native-base';
import Modal from 'react-native-modal';
// import { Octicons, AntDesign } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import * as S from '../../styles/MainStyle';

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
            icon={<AntDesign name="left" size={20} color="black" />}
          />
        </HStack>
        <HStack>
          {/*
          <IconButton
            icon={
              <Ionicons name="notifications-outline" size={20} color="black" />
            }
          />
          */}
        </HStack>
      </HStack>
    </>
  );
}

export default function DiaryDetail() {
  const navigation = useNavigation();
  const goToWriteDiary = () => {
    navigation.navigate('WriteDiary');
  };

  const route = useRoute();
  const {diaryId} = route.params;
  const [diary, setDiary] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await axios.get(
          `http://ec2-43-200-172-11.ap-northeast-2.compute.amazonaws.com:8080/api/diary/${diaryId}`,
        );
        console.log('Diary fetched:', response.data);
        setDiary(response.data);
      } catch (error) {
        console.error('Error fetching diary:', error);
      }
    };

    fetchDiary();
  }, [diaryId]);

  // 모달 열기 함수
  const openModal = () => {
    setIsModalVisible(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // 일기 삭제 함수
  const deleteDiary = async () => {
    try {
      // console.log(diaryId);
      const response = await axios.delete(
        `http://ec2-43-200-172-11.ap-northeast-2.compute.amazonaws.com:8080/api/diary/${diaryId}`,
      );
      console.log(response);
      console.log('Diary deleted');
      // 모달 닫기
      closeModal();
      // 일기 삭제 후 육아일기 페이지로 이동
      navigation.navigate('Diary'); // Main
    } catch (error) {
      console.error('Error deleting diary:', error);
    }
  };

  return (
    <NativeBaseProvider>
      <AppBar />
      <S.Container contentContainerStyle={{alignItems: 'center'}}>
        {/* 추후 Card는 get을 통해 data fetch 필요 */}
        {diary && (
          <S.Card style={{gap: 30}}>
            <S.DiaryHeader>
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
              <TouchableOpacity onPress={openModal}>
                <Octicons name="repo-deleted" size={24} color="black" />
              </TouchableOpacity>
            </S.DiaryHeader>
            <S.CardInnerBorder2>
              <Text>해당날짜사진 - url 이용</Text>
            </S.CardInnerBorder2>
            <S.DiaryContext
              textBreakStrategy="balanced"
              lineBreakStrategyIOS="hangul-word">
              {diary.content}
            </S.DiaryContext>
          </S.Card>
        )}
      </S.Container>
      {/* 모달 */}
      <Modal
        // animationType="slide"
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text>이 육아일기를 삭제하시겠습니까?</Text>
            <View style={styles.modalBtnBox}>
              <TouchableOpacity onPress={closeModal}>
                <Text>아니오</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteDiary}>
                <Text>예</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalBackground: {
    // flex: 1,
    height: '120%',
    // width: "120%",
    margin: -30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff', // White background for modal content
    padding: 20,
    borderRadius: 10,
    gap: 30,
    width: '80%', // Adjust width as needed
  },
  modalBtnBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 80,
  },
});
