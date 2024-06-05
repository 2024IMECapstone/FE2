import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  StatusBar,
  Box,
  HStack,
  IconButton,
  NativeBaseProvider,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as S from '../../styles/MainStyle';
import createSignalingChannel from '../../components/CreateChannel';
import Timeline from 'react-native-timeline-flatlist';
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
        <HStack></HStack>
        <HStack>
          <Text
            color="white"
            fontSize="20"
            fontWeight="bold"
            style={{ color: '#000', marginLeft: 24 }}>
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

const TimelineAPI = ({ data, showAll, onShowMore }) => {
  const renderDetail = (rowData) => {
    const { title, description } = rowData;
    return (
      <View style={styles.rowDetail}>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.descriptionStyle}>{description}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.timelineContainer, { height: showAll ? data.length * 42 + 2 : data.length * 42 + 20 }]}>
      <Timeline
        style={styles.timeline}
        showTime={false}
        data={showAll ? data.slice(0, data.length) : data.slice(0, 4)}
        circleSize={14}
        circleColor='#FFFACD'
        lineColor='#D9D9D9'
        lineWidth={3}
        descriptionStyle={{ color: 'black' }}
        renderDetail={renderDetail}
      />
      {data.length > 4 && !showAll && (
        <TouchableHighlight
          style={styles.buttonContainer}
          underlayColor="#DDDDDD"
          onPress={onShowMore}
        >
          <Text style={styles.buttonText}>오늘의 타임라인 보기</Text>
        </TouchableHighlight>
      )}
    </View>
  );
}

export default function Monitoring() {
  const [on, setOn] = useState(false);
  const [monitoring, setMonitoring] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://ec2-43-200-172-11.ap-northeast-2.compute.amazonaws.com:8080/api/monitoring'
        );
        const mappedData = response.data.map(item => {
          return {
            title: item.content,
            description: item.created
          };
        });
        setMonitoring(mappedData);
      } catch (error) {
        console.error('Error fetching Monitoring data:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowMore = () => {
    setShowAll(true);
  };

  return (
    <NativeBaseProvider>
      <View>
        <AppBar />
        <View style={styles.container}>
          {on ? (
            <S.Btn2
              style={styles.text}
              onPress={() => {
                navigation.navigate({
                  name: 'Video',
                  params: { setOn, data: route.params?.data || null },
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
              onPress={() => {
                createSignalingChannel();
                setOn(true);
                navigation.navigate({
                  name: 'Video',
                  params: { setOn, data: null },
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
          <TimelineAPI data={monitoring} showAll={showAll} onShowMore={handleShowMore} />
        </View>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: '90%',
    width: '100%', // Add width: 100% to ensure it takes full width
  },
  text: {
    color: 'black',
  },
  timelineContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    margin: 16,
    width: '100%', // Ensure the container takes full width
  },
  timeline: {
    width: '100%', // Ensure the timeline takes full width
  },
  rowDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionStyle: {
    color: 'gray',
    fontSize: 10,
    textAlign: 'right',
    flex: 1,
    marginRight: 16,
  },
  titleStyle: {
    color: 'black',
    fontSize: 12,
    marginRight: 10,
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 0.2,
    marginTop: 10,
  },
  buttonText: {
    color: '#000000',
  },
});
