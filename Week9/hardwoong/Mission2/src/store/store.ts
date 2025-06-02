import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../slices/cartSlice';
import modalReducer from '../slices/modalSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage 사용
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'cart',
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// 1. 저장소 설정
function createStore() {
  const store = configureStore({
    reducer: {
      cart: persistedCartReducer,
      modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // redux-persist 관련 액션은 직렬화 체크에서 제외
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    // devTools: process.env.NODE_ENV !== 'production', // 개발툴 활성화 옵션
  });
  return store;
}

// store를 활용할 수 있도록 내보내야 함
// 여기서 실행해서 스토어를 빼준다.
// 싱글톤 패턴

const store = createStore();

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;