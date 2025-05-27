import { useDispatch as useDefaultDispatch, useSelector as useDefaultSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import type { TypedUseSelectorHook } from 'react-redux';

// 공식 문서 useDispatch 래핑 방법 참고
export const useDispatch: () => AppDispatch = () => useDefaultDispatch<AppDispatch>(); // 타입 더 명확하게 적용
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;