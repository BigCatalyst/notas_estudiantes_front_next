// store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState } from './store'

export const useAppDispatch: () => typeof useDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector