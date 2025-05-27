import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../slices/cartSlice';

// 1. 저장소 설정
function createStore() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware()
    //     .concat(myCustomMiddleware) // 커스텀 미들웨어 추가
    //     .concat(logger) // redux-logger: 액션/상태 변화 콘솔 출력
    //     .concat(thunk), // redux-thunk: 비동기 액션 지원(기본 포함)
    //
    // devTools: process.env.NODE_ENV !== 'production', // 개발툴 활성화 옵션
  });
  return store;
}

// store를 활용할 수 있도록 내보내야 함
// 여기서 실행해서 스토어를 빼준다.
// 싱글톤 패턴

const store = createStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;