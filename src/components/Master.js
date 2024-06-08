import React from 'react';
import {StyleSheet} from 'react-native';
import {RTCView} from 'react-native-webrtc';

const Master = ({localView}) => {
  return (
    <RTCView
      style={styles.cctv}
      zOrder={20}
      objectFit={'cover'}
      mirror={false}
      streamURL={localView.toURL()}
    />
  );
};

const styles = StyleSheet.create({
  cctv: {
    // flexBasis: '50%',
    width: '100%', // 화면의 가로 길이를 100%로 설정
    height: '60%', // 화면의 세로 길이를 70%로 설정
  },
});

export default Master;
