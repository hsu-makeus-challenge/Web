import type { TypedUseSelectorHook } from "react-redux";
import {
    useDispatch as useDefaultDispatch,
    useSelector as useDefaultSelector,
} from "react-redux";
import { AppDispatch, RootState } from '../redux/store';

export const useDispatch = useDefaultDispatch<AppDispatch>;
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;

