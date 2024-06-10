import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {RTCView} from 'react-native-webrtc';

const Viewer = ({localView, remoteView}) => {
  if (remoteView !== '') {
    return (
      <RTCView
        style={styles.viewer}
        zOrder={20}
        objectFit={'cover'}
        mirror={false}
        streamURL={remoteView.toURL()}
      />
    );
  }
  if (localView !== '') {
    return (
      <View style={styles.video}>
        <Text style={styles.guide}>CCTV화면이 아직 없습니다.</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  viewer: {
    // flexBasis: '50%',
    width: '100%', // 화면의 가로 길이를 100%로 설정
    height: '60%', // 화면의 세로 길이를 70%로 설정
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
});

export default Viewer;
