
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { PlayerAudio, Podcast } from './cast'

export interface State {
    podcasts: Podcast[];
    color: string;
    backgroundColor: string;
    isLoading: boolean;
    error?: string;
    podcast?: Podcast

}

const InitialState: State = {
    podcasts: [],
    color: "#000000", backgroundColor: "#fff0ff",
    isLoading: true,

}

export type Action =
    | { type: "podcasts", podcasts: Podcast[] }
    | { type: "select", podcast: Podcast }
    | { type: "add", podcast: Podcast }
    | { type: "audio", audio: PlayerAudio[] }
    | { type: "theme", backgroundColor: string, color: string }
    | { type: 'failure', error: string };


function reducer(state: State = InitialState, action: Action): State {
    let s: State = state

    switch (action.type) {
        case "podcasts":
            s = { ...s, isLoading: false, podcasts: action.podcasts };
            break;
        case "theme":
            s = { ...s, backgroundColor: action.backgroundColor, color: action.color };
            break;
        case "add":
            s = { ...s, podcasts: s.podcasts.concat([action.podcast]) };
            break;
        case 'failure':
            s = { ...s, error: action.error };
            break;
        case "select":
            s = { ...s, podcast: action.podcast };
            break;
        default:
            console.log("Invalid Action -> \n", action);
            break;


    }
 //console.log(state)
    return s;

}
export interface AppState {
    app: State;
}
const RootReducer = combineReducers({
   app: reducer
  });
  const createMStore = applyMiddleware(thunk)(createStore);
export default () => {
    let store =  createMStore(RootReducer);
    return { store };
}
