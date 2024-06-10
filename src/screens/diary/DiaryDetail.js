import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  StatusBar,
  Box,
  HStack,
  IconButton,
  NativeBaseProvider,
} from 'native-base';
import Modal from 'react-native-modal';
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
      </HStack>
    </>
  );
}

export default function DiaryDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const {diaryId} = route.params;
  const [diary, setDiary] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [meal, setMeal] = useState(null);
  const [poo, setPoo] = useState(null);
  const [sleep, setSleep] = useState(null);
  const [growth, setGrowth] = useState(null);


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

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(
          `http://ec2-43-200-172-11.ap-northeast-2.compute.amazonaws.com:8080/api/meal?diaryId=${diaryId}`
        );
        console.log('Meal fetched:', response.data);
        if (response.data.length > 0) {
          setMeal(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching meal:', error);
      }
    };

    fetchMeal();
  }, [diaryId]);

  useEffect(() => {
      const fetchPoo = async () => {
        try {
          const response = await axios.get(
            `http://ec2-43-200-172-11.ap-northeast-2.compute.amazonaws.com:8080/api/poo?diaryId=${diaryId}`
          );
          console.log('Poo fetched:', response.data);
          if (response.data.length > 0) {
            setPoo(response.data[0]);
          }
        } catch (error) {
          console.error('Error fetching Poo:', error);
        }
      };

      fetchPoo();
    }, [diaryId]);

   useEffect(() => {
       const fetchSleep = async () => {
         try {
           const response = await axios.get(
             `http://ec2-43-200-172-11.ap-northeast-2.compute.amazonaws.com:8080/api/sleep?diaryId=${diaryId}`
           );
           console.log('Sleep fetched:', response.data);
           if (response.data.length > 0) {
             setSleep(response.data[0]);
           }
         } catch (error) {
           console.error('Error fetching Sleep:', error);
         }
       };

       fetchSleep();
     }, [diaryId]);

     useEffect(() => {
         const fetchGrowth = async () => {
           try {
             const response = await axios.get(
               `http://ec2-43-200-172-11.ap-northeast-2.compute.amazonaws.com:8080/api/growth?diaryId=${diaryId}`
             );
             console.log('Growth fetched:', response.data);
             if (response.data.length > 0) {
               setGrowth(response.data[0]);
             }
           } catch (error) {
             console.error('Error fetching Growth:', error);
           }
         };

         fetchGrowth();
       }, [diaryId]);



  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const deleteDiary = async () => {
    try {
      const response = await axios.delete(
        `http://ec2-43-200-172-11.ap-northeast-2.compute.amazonaws.com:8080/api/diary/${diaryId}`,
      );
      console.log(response);
      console.log('Diary deleted');
      closeModal();
      navigation.navigate('Diary');
    } catch (error) {
      console.error('Error deleting diary:', error);
    }
  };

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
        {diary && (
          <S.Card style={{gap: 30}}>
            <S.DiaryHeader>
              <Text style={{fontSize: 18, color: '#615C5C'}}>
                {formatDate(diary.created)}
              </Text>
              <TouchableOpacity onPress={openModal}>
                <Octicons name="repo-deleted" size={24} color="black" />
              </TouchableOpacity>
            </S.DiaryHeader>
            <S.DiaryContext
              textBreakStrategy="balanced"
              lineBreakStrategyIOS="hangul-word">
              {diary.content}
            </S.DiaryContext>
          </S.Card>
        )}
        {meal && (
          <>
            <Text style={{fontSize: 16, color: '#615C5C', paddingLeft:10, marginTop: 20, alignSelf: 'flex-start'}}>[키워드] 식사</Text>
            <S.Card style={{gap: 30, marginTop: 10}}>
              <Text>{meal.content === '()' ? '관련 내용이 없습니다.' : meal.content}</Text>
            </S.Card>
          </>
        )}

        {poo && (
          <>
            <Text style={{fontSize: 16, color: '#615C5C', paddingLeft:10, marginTop: 20, alignSelf: 'flex-start'}}>[키워드] 배변</Text>
            <S.Card style={{gap: 30, marginTop: 10}}>
              <Text>{poo.content === '()' ? '관련 내용이 없습니다.' : poo.content}</Text>
            </S.Card>
          </>
        )}

        {sleep && (
          <>
            <Text style={{fontSize: 16, color: '#615C5C', paddingLeft:10, marginTop: 20, alignSelf: 'flex-start'}}>[키워드] 잠</Text>
            <S.Card style={{gap: 30, marginTop: 10}}>
              <Text>{sleep.content === '()' ? '관련 내용이 없습니다.' : sleep.content}</Text>
            </S.Card>
          </>
        )}

        {growth && (
          <>
            <Text style={{fontSize: 16, color: '#615C5C', paddingLeft:10, marginTop: 20, alignSelf: 'flex-start'}}>[키워드] 성장</Text>
            <S.Card style={{gap: 30, marginTop: 10}}>
              <Text>{growth.content === '()' ? '관련 내용이 없습니다.' : growth.content}</Text>
            </S.Card>
          </>
        )}
      </S.Container>
      <Modal
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.text}>이 육아일기를 삭제하시겠습니까?</Text>
            <View style={styles.modalBtnBox}>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.text}>아니오</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteDiary} style={{marginLeft: 50}}>
                <Text style={styles.text}>예</Text>
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
  text: {
    color: 'gray',
  },
  modalBackground: {
    height: '120%',
    margin: -30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    color: 'black',
  },
  modalBtnBox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
});
