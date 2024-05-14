import styled from 'styled-components/native';

export const StartScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  /* gap: 12px; */
`;

export const StartScreenInnerContainer = styled.View`
  margin: 0 24px;
  width: 80%;
  /* height: 100vh; */
  height: 100%;
  /*background-color: aquamarine; */
  flex: 1;
  display: flex;
  justify-content: space-evenly;
`;

export const StartScreenLogo = styled.Image`
  width: 156px;
  height: 156px;
  border-radius: 40px; /* Make it circular */
`;

export const WriteFinishTextTitle = styled.Text`
  color: #000;
  font-size: 22px;
  font-weight: bold;
`;

export const WriteFinishTextTitle2 = styled.Text`
  color: #878787;
  font-size: 16px;
  font-weight: 500;
`;

export const StartScreenText1 = styled.Text`
  color: #000;
  font-size: 16px;
  /* margin-top: 10px; */
  /* font-family: "Inter"; */
  /* font-size: 12px;
  font-style: normal; */
  font-weight: 600;
  /* line-height: normal; */
`;

export const StartScreenText2 = styled.Text`
  color: #878787;
  text-align: center;
  /* font-family: Inter; */
  font-size: 14px;
  /* font-style: normal; */
  font-weight: 500;
  /* line-height: normal; */
`;

export const StartScreenBtn = styled.TouchableOpacity`
  background-color: #fffacd; /* Change the background color */
  height: 60px; /* Change the height */
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  margin-bottom: 24px;
`;

export const StartScreenButtonText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;

export const LoginContainer = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: space-evenly;
  /* gap: 12px; */
`;

export const LoginLogo = styled.Image`
  width: 107px;
  height: 107px;
  border-radius: 40px;
`;

export const LoginInputContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 70%;
  /* background-color: bisque; */
`;

export const LoginBtn = styled.TouchableOpacity`
  background-color: #fffacd;
  height: 60px;
  width: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-bottom: 10%;
`;

export const LoginButtonText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;

export const LoginBottomContainer = styled.View`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 5%;
`;
