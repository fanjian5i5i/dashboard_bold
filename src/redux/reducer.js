import * as ActionTypes from './actionTypes';
const initialState = {
    mobileOpen: false,
    layout:"project",
    dialogOpen:false,
    data:[],
    fieldsToCreate:[
      {fieldName:"PID",value:""},
      {fieldName:"Full Address",value:""},
      {fieldName:"Lot Size",value:""},
      {fieldName:"Gross Area",value:""},
      {fieldName:"Land Value",value:""},
      {fieldName:"Building Value",value:""},
      {fieldName:"Total Value",value:""},
      {fieldName:"Owner",value:""}
    ],
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
      case ActionTypes.CHANGE_FIELD:
          return { ...state, fieldsToCreate: action.payload.fields };
      case ActionTypes.OPEN_DIALOG:
        return { ...state, dialogOpen: !state.dialogOpen };  
      default:
        // throw new Error('Unexpected action');
        return state
    }
  };

  export default reducer;