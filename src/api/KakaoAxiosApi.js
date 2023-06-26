import axios from "axios";

const KH_DOMAIN = `${process.env.REACT_APP_API_DOMAIN}`;

const KakaoAxiosApi = {
  // 💀 인가코드 서버에 전송
  kakaoAuthCode : async(authorizationCode) => {
    try {
      const kakaoLogin = {
      authorizationCode : authorizationCode
    };
    return await axios.post(KH_DOMAIN + "/kakao", kakaoLogin);
    } catch (error) {
      throw error;
    }
  },
  // 🍉 결제 요청
  readyPay: async(token) => {
    try {
      return await axios.post(KH_DOMAIN + "/payment/ready", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });    
    } catch (error) {
      throw error;
    }
  },
  // 🍉 결제 성공
  successPay: async(pgToken, token) => {
    try {
      return await axios.get(KH_DOMAIN + "/payment/success", {
        params: {
          pg_token: pgToken
        },
        headers: {
          Authorization: "Bearer " + token
        }
      });
    } catch (error) {
      throw error;
    }
  }
};

export default KakaoAxiosApi;