import { User } from './user.model';
import { UserActions} from './user.actions';

export interface UserState {
  user: User,
  loading: boolean
}

export const inizialUserState: UserState = {
  user: undefined,
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

    default:
        return state;
  }
}
