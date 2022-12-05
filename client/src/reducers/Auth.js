// reducers/counter.js

// reducer가 많아지면 action상수가 중복될 수 있으니
// 액션이름 앞에 파일 이름을 넣습니다.
export const LOGIN = "AUTH/LOGIN";
export const LOGOUT = "AUTH/LOGOUT";

const initalState = {
  User: {
    uniqueid: '',
    user_role: '',
    user_img: '',
  }
};

const userChecker = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        User: {
          ...state.User,
          uniqueid: action.payload.uniqueid,
          user_role: action.payload.user_role,
          user_img: action.payload.user_img
        }

      };
    case LOGOUT:
      return {
        ...state,
        User: {
          ...state.User,
          uniqueid: '',
          user_role: '',
          user_img: ''
        }
      };

    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요
    default:
      return state;
  }
};

export default userChecker;