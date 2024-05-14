import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  StatusBar,
  Box,
  HStack,
  IconButton,
  NativeBaseProvider,
} from 'native-base';
// import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as S from '../../styles/MainStyle';
import createSignalingChannel from '../../components/CreateChannel';

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
        {/* <HStack>
          <IconButton
            onPress={goToMain}
            icon={<FontAwesome5 name="home" size={20} color="black" />}
          />
        </HStack> */}
        <HStack></HStack>
        <HStack>
          <Text
            color="white"
            fontSize="20"
            fontWeight="bold"
            style={{color: '#000', marginLeft: 24}}>
            기기 추가
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

export default function Monitoring() {
  const [on, setOn] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <NativeBaseProvider>
      <View>
        {/* <Header title="모니터링" back={false} /> */}
        <AppBar />
        <View style={styles.container}>
          {on ? (
            <S.Btn2
              style={styles.text}
              onPress={() => {
                navigation.navigate({
                  name: 'Video',
                  params: {setOn, data: route.params?.data || null},
                });
              }}>
              <Text style={styles.text}>
                CCTV 작동 중{' '}
                <MaterialCommunityIcons
                  name="cellphone-check"
                  size={20}
                  color="black"
                />
              </Text>
            </S.Btn2>
          ) : (
            <S.Btn2
              // style={styles.button}
              onPress={() => {
                createSignalingChannel();
                setOn(true);
                navigation.navigate({
                  name: 'Video',
                  params: {setOn, data: null},
                });
              }}>
              <Text style={styles.text}>
                기기 추가{' '}
                <MaterialCommunityIcons
                  name="cellphone"
                  size={20}
                  color="black"
                />
              </Text>
            </S.Btn2>
          )}
        </View>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: '90%',
  },
  text: {
    color: 'black',
  },
});
