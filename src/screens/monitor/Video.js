import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import Header from '../../components/Header';
import Master from '../../components/Master';
import Viewer from '../../components/Viewer';
import {startMaster, stopMaster} from '../../utils/master';
import {startViewer, stopViewer} from '../../utils/viewer';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Video = ({navigation, route}) => {
  const [localView, setLocalView] = useState('');
  const [remoteView, setRemoteView] = useState('');
  const [selected, setSelected] = useState('none'); // none, cctv, viewer
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
    let captureInterval;
    if (selected === 'cctv') {
      captureInterval = setInterval(() => {
        captureScreen();
      }, 1000);
    } else {
      if (captureInterval) clearInterval(captureInterval);
    }
    return () => clearInterval(captureInterval);
  }, [selected]);

  const captureScreen = async () => {
    try {
      const uri = await captureRef(captureViewRef, {
        format: 'png',
        quality: 0.8,
      });
      console.log('Captured image uri: ', uri);
      // Save or use the uri as needed
    } catch (error) {
      console.error('Failed to capture screenshot', error);
    }
  };

  const handleStop = () => {
    stopMaster(localView, setLocalView, remoteView, setRemoteView, setSelected);
    stopViewer(localView, setLocalView, remoteView, setRemoteView, setSelected);
    setSelected('none');
    navigation.setOptions({setOn: false});
  };

  return (
    <SafeAreaView style={styles.Video}>
      <Header
        title="영상 보기"
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
          <Text style={styles.text}>역할 선택하기</Text>
          <View style={styles.selectView}>
            <Pressable
              style={[
                styles.button,
                styles.right,
                selected === 'cctv' && styles.active,
              ]}
              disabled={selected !== 'none'}
              onPress={() => {
                startMaster(
                  localView,
                  setLocalView,
                  remoteView,
                  setRemoteView,
                  setSelected,
                );
                setSelected('cctv');
                navigation.setOptions({setOn: true});
              }}>
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
});

export default Video;
