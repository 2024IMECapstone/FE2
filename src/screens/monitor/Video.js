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
import axios from 'axios';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Video = ({navigation, route}) => {
  const [localView, setLocalView] = useState('');
  const [remoteView, setRemoteView] = useState('');
  const [selected, setSelected] = useState('none'); // none, cctv, viewer
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [statusMessage, setStatusMessage] = useState('역할 선택하기');
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
            .get('http://192.168.219.104:5000/process_audio')
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
    setStatusMessage('아기의 상태를 분석중입니다...');
    navigation.setOptions({setOn: true});
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
    } else if (message === '아기의 상태를 분석중입니다...') {
      return 'rgba(255, 255, 0, 0.2)'; // Light Yellow with transparency
    } else {
      return 'rgba(255, 192, 203, 0.9)'; // Light Red (Pink) with transparency
    }
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
              onPress={() => {
                startViewer(
                  localView,
                  setLocalView,
                  remoteView,
                  setRemoteView,
                  setSelected,
                );
                setSelected('viewer');
                navigation.setOptions({setOn: true});
              }}>
              <Text
                style={[
                  styles.btnText,
                  selected === 'viewer' && styles.activeText,
                ]}>
                뷰어
              </Text>
            </Pressable>
          </View>
          <Pressable
            style={[styles.stop, selected !== 'none' && styles.active]}
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
    // width: '80%',
    // alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
    // borderWidth: 1,
    // borderColor: '#FFFACD',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 24,
    // borderStyle: 'dashed',
  },
});

export default Video;
