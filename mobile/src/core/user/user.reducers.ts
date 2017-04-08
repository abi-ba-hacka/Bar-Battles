import { User } from './user.model';
import { UserActions} from './user.actions';
import { updateAndfilterUniqueItems } from '../../shared/helpers';


export interface UserState {
  user: User,
  loading: boolean,
  rivalUsers: User[]
}

export const inizialUserState: UserState = {
  user: undefined,
  rivalUsers: [],
  loading: false
}

export function user(state = inizialUserState, action: UserActions.Actions): UserState {
  switch (action.type) {
    case UserActions.Types.GET_USER:
      return Object.assign({}, state, {loading: true, error: null});

    case UserActions.Types.GET_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload,
        loading: false
      });

    case UserActions.Types.GET_USER_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });

    case UserActions.Types.USER_LOGIN:
      return Object.assign({}, state, {loading: true, error: null});

    case UserActions.Types.USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload,
        loading: false
      });

    case UserActions.Types.USER_LOGIN_FAIL:
      return Object.assign({}, state, {
        error: action.payload,
        loading: false
      });

    case UserActions.Types.EDIT_USER:
      return Object.assign({}, state, {loading: true, error: null});

    case UserActions.Types.EDIT_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload,
        loading: false
      });

    case UserActions.Types.EDIT_USER_FAIL:
      return Object.assign({}, state, {
        error: action.payload,
        loading: false
      });

    case UserActions.Types.SEND_QR:
      return Object.assign({}, state, {loading: true, error: null});

    case UserActions.Types.SEND_QR_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload.user,
        loading: false
      });

    case UserActions.Types.SEND_QR_FAIL:
      return Object.assign({}, state, {loading: false, error: action.payload});

    case UserActions.Types.GET_USERS:
      return Object.assign({}, state, {loading: false, error: action.payload});

    case UserActions.Types.GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        rivalUsers: updateAndfilterUniqueItems(state.rivalUsers.concat(action.payload)),
        loading: false
      });

    case UserActions.Types.GET_USERS_FAIL:
      return Object.assign({}, state, {
        error: action.payload,
        loading: false
      });

    default:
        return state;
  }
}
