import {createStore} from "redux";
import {rootReducer} from "./combineReducer"


export const store = createStore (
  rootReducer
)