import * as ActionTypes from './actionTypes';
const initialState = {
    mobileOpen: false,
    layout:"table",
    // count2: 0,
  };
   const reducer = (state = initialState, action) => {
     console.log(action.type)
    switch (action.type) {
      case ActionTypes.TAGGLE_MOBILE_OPEN:
        return { ...state, mobileOpen: !state.mobileOpen };
      case ActionTypes.CHANGE_LAYOUT:
        return { ...state, layout: action.payload.layout };
      default:
        // throw new Error('Unexpected action');
        return state
    }
  };

  export default reducer;