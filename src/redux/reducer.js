import * as ActionTypes from './actionTypes';
const initialState = {
    mobileOpen: false,
    layout:"project",
    data:[],
    originalData:[],
    title:""
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
      case ActionTypes.CREATE_ORIGINAL:
        return { ...state, originalData: action.payload.data };
      case ActionTypes.RESET_DATA:
        return { ...state, data: state.originalData };
      case ActionTypes.CHANGE_TITLE:
          return { ...state, title: action.payload.title };
        
      default:
        // throw new Error('Unexpected action');
        return state
    }
  };

  export default reducer;