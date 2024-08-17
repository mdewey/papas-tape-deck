import { AllOutSharp } from '@mui/icons-material';
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
    return { ...state, allTapes: action.payload };
  },
  "SEARCH_TERM_SET": (state: AppState, action: any) => {
    return { ...state, searchTerm: action.payload.searchTerm };
  },
  'ADD_TAPE_TAG_LIST': (state: AppState, action: any) => {
    const { id, tags } = action.payload;
    return { ...state, allTapes: [...state.allTapes.map(f => f)] };
  },
};

const appReducer = (state: AppState = initialState, action: any): AppState => {
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