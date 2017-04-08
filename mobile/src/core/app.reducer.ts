import "@ngrx/core/add/operator/select";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/let";
import {combineReducers} from "@ngrx/store";
import {compose} from "@ngrx/core/compose";
import {storeLogger} from "ngrx-store-logger";
import {storeFreeze} from "ngrx-store-freeze";
import {environment} from "../environments/environment";

import { user } from './user/user.reducers';
// import { bar } from './bar/bar.reducers';

const AppReducers = {
  userState: user,
  // barState: bar,
};
const developmentReducer = compose(
    storeFreeze, storeLogger(), combineReducers
)(Object.assign(AppReducers));
const productionReducer = combineReducers(Object.assign(AppReducers));

export function reducer(state: any, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    }
    else {
        return developmentReducer(state, action);
    }
}