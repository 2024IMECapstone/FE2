import React, {useState, useRef} from 'react';
// import {StatusBar} from 'expo-status-bar';
import {AppRegistry, Platform, StyleSheet, Text, View} from 'react-native';
import {
  Home,
  Monitoring,
  Sound,
  Diary,
  DiaryDetail,
  WriteDiary,
  WriteFinish,
  MyPage,
  StartScreen,
} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
// import {
//   Ionicons,
//   MaterialCommunityIcons,
//   FontAwesome5,
// } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {NativeBaseProvider} from 'native-base';
// import App from "./App";
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Video from './src/screens/monitor/Video';

const primary = '#FFF495';
const gray = '#ACACAC';
const black = '#000';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  contentStyle: {
    backgroundColor: '#fff',
  },
  tabBarStyle: {
    height: 60,
    backgroundColor: '#fff',
    tabBarActiveTintColor: black,
    headerShown: false,
  },
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      initialRouteName="Home"
      //backBehavior="initialRoute"
    >
      <Tab.Screen
        name="Monitoring"
        component={Monitoring}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.tabBarView}>
                <MaterialCommunityIcons
                  name="monitor-cellphone"
                  size={24}
                  color={focused ? black : gray}
                />
                <Text style={[styles.NavText, {color: focused ? black : gray}]}>
                  모니터링
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Sound"
        component={Sound}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.tabBarView}>
                <Ionicons
                  name="ear-outline"
                  size={24}
                  color={focused ? black : gray}
                />
                <Text style={[styles.NavText, {color: focused ? black : gray}]}>
                  울음소리
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.tabBarView2}>
                <FontAwesome5
                  name="home"
                  size={24}
                  color={focused ? black : gray}
                />
                {/* <Text style={styles.NavText}>홈</Text> */}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Diary"
        component={Diary}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.tabBarView}>
                <MaterialCommunityIcons
                  name="notebook-outline"
                  size={24}
                  color={focused ? black : gray}
                />
                <Text style={[styles.NavText, {color: focused ? black : gray}]}>
                  육아일기
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.tabBarView}>
                <Ionicons
                  name="person-circle-outline"
                  size={24}
                  color={focused ? black : gray}
                />
                <Text style={[styles.NavText, {color: focused ? black : gray}]}>
                  내정보
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {/* <StatusBar style="auto" hidden={true} /> */}
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Diary"
          component={Diary}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DiaryDetail"
          component={DiaryDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WriteDiary"
          component={WriteDiary}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WriteFinish"
          component={WriteFinish}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Video"
          component={Video}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarView2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: Platform.OS == 'ios' ? -10 : -20,
    width: Platform.OS == 'ios' ? 50 : 60,
    height: Platform.OS == 'ios' ? 50 : 60,
    borderRadius: Platform.OS == 'ios' ? 25 : 30,
    backgroundColor: primary,
  },
  NavText: {
    fontSize: 12,
    color: gray,
  },
});
