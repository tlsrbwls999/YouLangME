import axios from 'axios';

// const config = {
//   headers: { "Content-Type": "application/json" },
// };
const user = JSON.parse(localStorage.getItem('user'));
const accessToken = user ? user.accessToken : null;
const getConfig = { headers: { 'X-Auth-Token': accessToken } };

const API_URL = 'http://127.0.0.1:8080/';
// 리덕스랑 관련없는 서버 통신 API들 모음

// 프로필 유저 레벨 불러오는 API
export const fetchLevelExp =  async (userId) =>  {
    
    console.log('fetch 레벨 & exp');

    try {
      const response = await axios.get(
        API_URL + `user/exp-level/${userId}`,
        // 엑세스 토큰이 필요하다.
        getConfig
      );   
      console.log(response.data.data)

      return [response.data.data.levelId, response.data.data.exp]

    } catch (err) {
      console.log('레벨 경험치 fetch 에러')
      return err.response;
    }
  };




// export const submitDescription = async (uploadedDescription) => {
//   // console.log('업로드 시작');
//   console.log('업로드 시작 api', uploadedDescription);

//   try {
//       await axios.put(
//         API_URL + `user/description`,
//         { 'description' : uploadedDescription },
//         // 엑세스 토큰이 필요하다.
//         {
//           headers: {
//             'X-Auth-Token': accessToken,
//             'Content-Type': 'application/json',
//           }
//         }
//       );
//       // alert('자기소개가 등록되었습니다!');
    
//   } catch (err) {
//     console.log('에러');
//     alert('자기소개를 등록하세요!');
//   }
// }
