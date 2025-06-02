import {
  TypedUseSelectorHook,
  useSelector as useDefaultSelector,
  useDispatch as useDefaultDispatch,
} from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

export const useDispatch: () => AppDispatch = useDefaultDispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
