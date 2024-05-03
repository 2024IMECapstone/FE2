import React, {useState, useRef} from 'react';
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
  Icon,
  MaterialIcons,
  NativeBaseProvider,
} from 'native-base';
// import { Ionicons, AntDesign } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import * as S from '../styles/MainStyle';
import MomIcon from '../assets/images/parent.png';
import DadIcon from '../assets/images/parent.png';
import NannyIcon from '../assets/images/babystroller.png';
import Baby from '../assets/images/baby.png';

function AppBar() {
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
        <HStack alignItems="center" w="10"></HStack>
        <HStack>
          <Text color="white" fontSize="20" fontWeight="bold">
            메인 홈
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

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  const goToWriteDiary = () => {
    navigation.navigate('WriteDiary');
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    // 부드러운 애니메이션 효과 적용
    if (!isExpanded) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }

    // 버튼을 누를 때마다 스크롤을 아래로 이동
    if (!isExpanded && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

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

  return (
    <NativeBaseProvider>
      {/* <Center> */}
      <AppBar />
      <S.Container
        contentContainerStyle={{alignItems: 'center'}}
        ref={scrollViewRef}>
        <S.Card>
          <S.CardTitle>{getFormattedDate()}</S.CardTitle>
          <S.CardInnerBorder>
            <S.goToDiaryBtn onPress={goToWriteDiary}>
              <Text>✍🏻</Text>
            </S.goToDiaryBtn>
          </S.CardInnerBorder>
        </S.Card>
        <S.Card>
          <View style={styles.innerbox}>
            <S.CardTitle>아기 정보</S.CardTitle>
            <S.CardInnerBox>
              <S.CardProfile>
                <S.Icon source={Baby}></S.Icon>
              </S.CardProfile>
              <S.InnerBoxTextContainer>
                <S.InnerBoxName>타로</S.InnerBoxName>
                <S.InnerBoxMonth>
                  <Text style={styles.bold}>6</Text>개월
                </S.InnerBoxMonth>
              </S.InnerBoxTextContainer>
            </S.CardInnerBox>
          </View>

          {/* -------------------------------- */}

          <S.CardTitle>양육자 정보</S.CardTitle>
          <TouchableOpacity onPress={toggleExpand} style={styles.btn}>
            {isExpanded ? (
              <Text></Text>
            ) : (
              <AntDesign name="down" size={24} color="black" />
            )}
          </TouchableOpacity>

          {isExpanded && (
            <View id="information">
              <S.CardInnerBox>
                <S.CardProfile>
                  <S.Icon source={MomIcon}></S.Icon>
                </S.CardProfile>
                <S.InnerBoxContainer>
                  <S.InnerBoxTagContainer>
                    <S.InnerBoxName>타로맘</S.InnerBoxName>
                    <S.Tag style={{backgroundColor: '#FFC0C0'}}>
                      <S.TagText>엄마</S.TagText>
                    </S.Tag>
                  </S.InnerBoxTagContainer>
                  {/* <S.Icon source={MomIcon}></S.Icon> */}
                </S.InnerBoxContainer>
              </S.CardInnerBox>
              <S.CardInnerBox>
                <S.CardProfile>
                  <S.Icon source={DadIcon}></S.Icon>
                </S.CardProfile>
                <S.InnerBoxContainer>
                  <S.InnerBoxTagContainer>
                    <S.InnerBoxName>타로아빠</S.InnerBoxName>
                    <S.Tag style={{backgroundColor: '#B2DAFF'}}>
                      <S.TagText>아빠</S.TagText>
                    </S.Tag>
                  </S.InnerBoxTagContainer>
                </S.InnerBoxContainer>
              </S.CardInnerBox>
              <S.CardInnerBox>
                <S.CardProfile>
                  <S.Icon source={NannyIcon}></S.Icon>
                </S.CardProfile>
                <S.InnerBoxContainer>
                  <S.InnerBoxTagContainer>
                    <S.InnerBoxName>김OO</S.InnerBoxName>
                    <S.Tag style={{backgroundColor: '#BBF3A1'}}>
                      <S.TagText>돌봄이</S.TagText>
                    </S.Tag>
                  </S.InnerBoxTagContainer>
                </S.InnerBoxContainer>
              </S.CardInnerBox>
            </View>
          )}
          <TouchableOpacity onPress={toggleExpand} style={styles.btn}>
            {isExpanded ? (
              <AntDesign name="up" size={24} color="black" />
            ) : (
              <Text></Text>
            )}
          </TouchableOpacity>
        </S.Card>
      </S.Container>
      {/* </Center> */}
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
