import { configureStore } from '@reduxjs/toolkit';


export interface TimeStamp {
  description: string;
  timeStamp: string;
}

export interface Tape {
  videoUrl: string | undefined;
  id: string;
  title: string;
  filePath: string;
  url: string;
  version: number;
  length: string;
  tags: string[];
  audioTimeStamps: TimeStamp[];
  imageUrl: string;
}

export interface AppState {
  allTapes: Tape[],
  searchTerm: string,
}

const initialState: AppState = {
  allTapes: [],
  searchTerm: '',
};

interface AppReducer {
  [key: string]: (state: any, action: any) => any;
}

const reducers: AppReducer = {
  "default": (state: AppState) => { return { ...state }; },
  'SET_TAPE_LIST': (state: AppState, action: any) => {
    console.log('SET_TAPE_LIST', { action });
    return { ...state, allTapes: action.payload };
  },
  "SEARCH_TERM_SET": (state: AppState, action: any) => {
    return { ...state, searchTerm: action.payload.searchTerm };
  }
};

const appReducer = (state: AppState = initialState, action: any): AppState => {
  console.log('appReducer', { action });
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  } else {
    return reducers["default"](state, action);
  }
};


export const store = configureStore({
  reducer: appReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch