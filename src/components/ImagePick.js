// import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
// import React, { useState, useEffect } from "react";
// // import * as ImagePicker from "expo-image-picker";
// import * as S from "../styles/MainStyle";
// // import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const ImagePick = ({ url, onChangePhoto }) => {
//   const _handlePhotoBtnPress = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       onChangePhoto(result.assets[0].uri);
//     }
//   };
//   console.log("url:", url);

//   return (
//     <View style={styles.container}>
//       {url !== undefined ? ( // 선택한 사진이 존재하는지 확인
//         <View style={styles.container}>
//           <Image source={{ uri: url }} style={styles.image} />
//           {/* <S.submitBtn onPress={_handlePhotoBtnPress}>
//             <S.submitBtnText>변경</S.submitBtnText>
//           </S.submitBtn> */}
//           <TouchableOpacity onPress={_handlePhotoBtnPress}>
//             <AntDesign name="retweet" size={24} color="black" />
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View style={styles.container}>
//           <Text>육아일기에 담을 사진을 </Text>
//           <Text>선택해주세요😊</Text>
//           <TouchableOpacity
//             onPress={_handlePhotoBtnPress}
//             style={{ marginTop: 12 }}
//           >
//             <MaterialCommunityIcons
//               name="file-image-plus-outline"
//               size={24}
//               color="black"
//             />
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 12,
//   },
//   image: {
//     width: 250,
//     height: 250,
//     resizeMode: "cover", // 이미지가 컨테이너에 맞게 조절되도록 함
//   },
// });

// export default ImagePick;
