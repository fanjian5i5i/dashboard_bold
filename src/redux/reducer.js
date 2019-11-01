import * as ActionTypes from './actionTypes';
const initialState = {
    mobileOpen: false,
    layout:"table",
    data:[]
    // count2: 0,
  };
   const reducer = (state = initialState, action) => {
     console.log(action.type)
    switch (action.type) {
      case ActionTypes.TAGGLE_MOBILE_OPEN:
        return { ...state, mobileOpen: !state.mobileOpen };
      case ActionTypes.CHANGE_LAYOUT:
        return { ...state, layout: action.payload.layout };
      case ActionTypes.UPDATE_DATA:
        return { ...state, data: action.payload.data };
      default:
        // throw new Error('Unexpected action');
        return state
    }
  };

  export default reducer;