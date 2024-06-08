import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import Header from '../../components/Header';
import Master from '../../components/Master';
import Viewer from '../../components/Viewer';
import {startMaster, stopMaster} from '../../utils/master';
import {startViewer, stopViewer} from '../../utils/viewer';
import {LogBox} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import axios from 'axios';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

PushNotification.createChannel(
  {
    channelId: 'id-babystar', // (required)
    channelName: 'ch-babystar', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    // playSound: true, // (optional) default: true
    // soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const Video = ({navigation, route}) => {
  const [localView, setLocalView] = useState('');
  const [remoteView, setRemoteView] = useState('');
  const [selected, setSelected] = useState('none'); // none, cctv, viewer
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [statusMessage, setStatusMessage] = useState('역할 선택하기');
  const [videoProcessResult, setVideoProcessResult] = useState(null); // 추가된 상태 변수
  const captureViewRef = useRef(null);

  useEffect(() => {
    if (route.params.data) {
      console.log(route.params.data);
      setLocalView(route.params.data.localView);
      setRemoteView(route.params.data.remoteView);
      setSelected(route.params.data.selected);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (selected === 'cctv') {
      interval = setInterval(() => {
        if (!isRequestInProgress) {
          setIsRequestInProgress(true);
          axios
            .get('http://172.19.17.109:5000/process_audio')
            .then(response => {
              console.log('Response from local server:', response.data);
              if (response.data.status === 'not_detected') {
                setStatusMessage('아기는 평온합니다 :)');
              } else if (response.data.status === 'detected') {
                setStatusMessage(response.data.cryingType);
              }
            })
            .catch(error => {
              console.error('Error fetching from local server:', error);
            })
            .finally(() => {
              setIsRequestInProgress(false);
            });
        }
      }, 5000); // 5000 ms = 5 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [selected, isRequestInProgress]);

  const handleStartCCTV = async () => {
    await startMaster(
      localView,
      setLocalView,
      remoteView,
      setRemoteView,
      setSelected,
    );
    setSelected('cctv');
    setStatusMessage('아기의 울음소리를 분석중입니다...');
    navigation.setOptions({setOn: true});

    // 8초 후에 axios GET 요청 보내기
    console.log('Sending GET request to video process server...');
    // axios
    //   .get(
    //     'http://ec2-54-180-79-37.ap-northeast-2.compute.amazonaws.com:5000/process_video',
    //   )
    //   .then(response => {
    //     console.log('Response from video process server:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching from video process server:', error);
    //   });
  };

  const handleStop = () => {
    stopMaster(localView, setLocalView, remoteView, setRemoteView, setSelected);
    stopViewer(localView, setLocalView, remoteView, setRemoteView, setSelected);
    setSelected('none');
    setStatusMessage('역할 선택하기');
    navigation.setOptions({setOn: false});
  };

  const getStatusBackgroundColor = message => {
    if (message === '역할 선택하기') {
      return 'transparent';
    } else if (message === '아기는 평온합니다 :)') {
      return 'rgba(144, 238, 144, 0.5)'; // Light Green with transparency
    } else if (message === '아기의 울음소리를 분석중입니다...') {
      return 'rgba(255, 255, 0, 0.2)'; // Light Yellow with transparency
    } else {
      return 'rgba(255, 192, 203, 0.9)'; // Light Red (Pink) with transparency
    }
  };

  const handleStartViewer = () => {
    startViewer(
      localView,
      setLocalView,
      remoteView,
      setRemoteView,
      setSelected,
    );
    setSelected('viewer');
    navigation.setOptions({setOn: true});
    // Schedule push notification
    console.log('Scheduling push notification...');
    PushNotification.localNotificationSchedule({
      channelId: 'id-babystar',
      title: '🚨아기 낙상 위험',
      message: '아기가 위험한 상태에 있어요! 확인해주세요!',
      date: new Date(Date.now() + 1 * 1000), // 3 seconds after button press
      largeIcon: 'logo_44x44', // (우측)알림 아이콘 설정
      smallIcon: 'logo', // (좌측)알림 아이콘 설정
    });
  };

  return (
    <SafeAreaView style={styles.Video}>
      <Header
        title="영상 보기 "
        back
        navigation={navigation}
        data={{localView, remoteView, selected}}
      />
      <View style={styles.main} ref={captureViewRef} collapsable={false}>
        {selected === 'none' && (
          <View style={styles.video}>
            <Text style={styles.guide}>아래의 역할을 선택해주세요</Text>
          </View>
        )}
        {selected === 'cctv' &&
          (localView === '' ? (
            <ActivityIndicator size="large" />
          ) : (
            <Master localView={localView} />
          ))}
        {selected === 'viewer' &&
          (localView === '' ? (
            <ActivityIndicator size="large" />
          ) : (
            <Viewer remoteView={remoteView} />
          ))}
        <View style={styles.select}>
          <View style={styles.statusContainer}>
            <LinearGradient
              colors={['transparent', getStatusBackgroundColor(statusMessage)]}
              style={styles.gradient}
            />
            <Text style={styles.text}>{statusMessage}</Text>
          </View>
          {selected === 'none' && (
            <View style={styles.selectView}>
              <Pressable
                style={[
                  styles.button,
                  styles.right,
                  selected === 'cctv' && styles.active,
                ]}
                disabled={selected !== 'none'}
                onPress={handleStartCCTV}>
                <Text
                  style={[
                    styles.btnText,
                    selected === 'cctv' && styles.activeText,
                  ]}>
                  CCTV
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, selected === 'viewer' && styles.active]}
                disabled={selected !== 'none'}
                onPress={handleStartViewer}>
                <Text
                  style={[
                    styles.btnText,
                    selected === 'viewer' && styles.activeText,
                  ]}>
                  뷰어
                </Text>
              </Pressable>
            </View>
          )}
          <Pressable
            style={[
              styles.stop,
              selected !== 'none' && styles.active,
              selected === 'none' ? styles.stopMarginTop : null,
            ]}
            disabled={selected === 'none'}
            onPress={handleStop}>
            <Text
              style={[
                styles.btnText,
                selected !== 'none' && styles.activeText,
              ]}>
              종료하기
            </Text>
          </Pressable>
        </View>
        {/* 비디오 처리 결과를 표시하는 부분 추가 */}
        {videoProcessResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              비디오 분석 결과: {videoProcessResult}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Video: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  main: {
    display: 'flex',
    flexGrow: 1,
  },
  video: {
    flexBasis: '50%',
    backgroundColor: '#969696',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guide: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  select: {
    flexBasis: '50%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 20,
    zIndex: 1, // Ensure text is above the gradient
  },
  selectView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#969696',
    paddingVertical: 10,
    flexGrow: 1,
  },
  right: {
    marginRight: 10,
  },
  btnText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#969696',
    textAlign: 'center',
  },
  stop: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#969696',
    paddingVertical: 12,
    width: '50%',
  },
  stopMarginTop: {
    marginTop: 50,
  },
  active: {
    backgroundColor: '#FFF27F',
    borderWidth: 0,
  },
  activeText: {
    color: 'white',
  },
  statusContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 24,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  resultText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Video;
