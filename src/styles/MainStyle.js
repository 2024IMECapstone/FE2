import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  /* height: 100vh; */
  height: 100%;
  /* background-color: aquamarine; */
  /* align-items: center; */
  /* justify-content: center; */
  /* gap: 12px; */
  margin: 24px 24px;
`;

export const Card = styled.View`
  display: flex;
  align-items: center;
  padding: 24px 24px;
  margin-bottom: 24px;
  width: 98%;
  border-radius: 24px;
  background-color: #fff;
  elevation: 2; /* drop-shadow 대신 사용 */
  /* filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1)); */
`;

export const CardTitle = styled.Text`
  display: flex;
  align-self: flex-start;
  font-size: 16px;
  margin-bottom: 18px;
  color: #000;
`;

export const CardInnerBorder = styled.TouchableOpacity`
  width: 100%;
  padding: 48px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  border: 1px solid #d7d7d7;
  background: #fff;
`;

export const CardInnerBorder2 = styled.View`
  width: 100%;
  padding: 24px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  border: 1px solid #d7d7d7;
  background: #d7d7d7;
`;

export const CardTextarea = styled.TextInput.attrs({
  multiline: true, // 여러 줄 입력을 가능하게 함
  numberOfLines: 4, // 입력란의 높이를 설정할 수 있음 (선택 사항)
  placeholder: '오늘의 육아일기를 작성해볼까요?', // placeholder 설정
  placeholderTextColor: '#d7d7d7', // placeholder 텍스트 색상 설정 (선택 사항)
})`
  width: 100%;
  padding: 48px 24px;
  margin: 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  border: 1px solid #d7d7d7;
  background: #fff;
`;

export const CardInnerBox = styled.View`
  width: 100%;
  padding: 12px 12px;
  //margin-bottom: 24px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 24px;
  background: #fffacd;
  backdrop-filter: blur(5px);
`;

export const InnerBoxTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  margin: 0 24px;
`;

export const InnerBoxContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export const InnerBoxTagContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin: 0 24px;
  gap: 8px;
`;

export const Icon = styled.Image`
  width: 45px;
  height: 45px;
`;

export const TagText = styled.Text`
  font-size: 10px;
  color: #000;
`;

export const InnerBoxName = styled.Text`
  font-size: 16px;
  color: #000;
`;

export const InnerBoxMonth = styled.Text`
  font-size: 16px;
  flex-shrink: 0;
  color: #000;
`;

export const CardProfile = styled.View`
  height: 70px;
  width: 70px;
  border-radius: 50px;
  background-color: #fff495;
  /* 아이콘 임시 적용---- */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Tag = styled.View`
  width: 70px;
  height: 30px;
  border-radius: 50px;
  /* background-color: #ffc0c0; */
  margin-left: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const goToDiaryBtn = styled.TouchableOpacity`
  background-color: #fffacd; /* Change the background color */
  height: 50px; /* Change the height */
  width: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  elevation: 1;
`;

export const Btn = styled.TouchableOpacity`
  background-color: #fffacd; /* Change the background color */
  height: 60px;
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  /* margin-left: -26px; */
`;

export const Btn2 = styled.TouchableOpacity`
  display: flex;
  gap: 50px;
  justify-content: center;
  background-color: #fffacd; /* Change the background color */
  height: 100px;
  width: 50%;
  padding: 12px 20px;
  /* margin: 24px 0; */
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  /* margin-left: -26px; */
`;

export const BtnText = styled.Text`
  font-size: 14px;
  color: #000;
  /* font-weight: 500; */
`;

export const submitBtn = styled.TouchableOpacity`
  background-color: #fffacd; /* Change the background color */
  height: 50px;
  width: 100%;
  padding: 12px 40px;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  /* margin-left: -26px; */
`;

export const submitBtnText = styled.Text`
  font-size: 12px;
  color: #000;
`;

export const DiaryHeader = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
`;

export const DiaryContext = styled.Text`
  width: 100%;
  font-size: 14px;
  color: #615c5c;
  line-height: 24px;
`;
