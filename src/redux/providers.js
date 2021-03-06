import {
  INITIALIZE_PROVIDERS,
  SAVE_PROVIDER,
  CHANGE_SORT_ORDER,
  CHANGE_SORT_DIRECTION,
  REORDER_SAVED_PROVIDERS,
  SELECT_NEW_PROVIDER
} from "./actions";

const INITIAL_STATE = {
  allIds: [],
  byId: {},
  sortMethod: "Provider Type",
  sortDirection: "desc",
  savedProviders: []
};

export default function providers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INITIALIZE_PROVIDERS:
      return initialProviders(state, action.payload);
    case SAVE_PROVIDER:
      return saveProvider(state, action.id);
    case CHANGE_SORT_ORDER:
      return {
        ...state,
        sortMethod: action.id
      };
    case CHANGE_SORT_DIRECTION:
      return {
        ...state,
        sortDirection: action.direction
      };
    case REORDER_SAVED_PROVIDERS:
      return {
        ...state,
        savedProviders: action.ids
      };
    case SELECT_NEW_PROVIDER:
      return {
        ...state,
        selectProviderId: action.id,
        selectProviderKey: action.key
      }
    default:
      return state;
  }
}

function initialProviders(state, payload) {
  return {
    ...state,
    allIds: payload.providers.allIds,
    byId: payload.providers.byId
  };
}

function saveProvider(state, id) {
  return state.savedProviders.includes(id)
    ? {
        //deletes if true
        ...state,
        savedProviders: state.savedProviders.filter(p => p !== id)
      } //adds if false
    : { ...state, savedProviders: [id, ...state.savedProviders] };
}
