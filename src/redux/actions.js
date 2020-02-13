import { TAGGLE_MOBILE_OPEN, CHANGE_LAYOUT,UPDATE_DATA,CREATE_ORIGINAL,RESET_DATA,CHANGE_TITLE,OPEN_DIALOG, CHANGE_FIELD,OPEN_POPUP,UPDATE_DISPLAY } from './actionTypes'

export const taggleMobileOpen = () => ({
  type: TAGGLE_MOBILE_OPEN,
//   payload: {
//     id: ++nextTodoId,
//     content
//   }
})

export const changeLayout = (layout) => ({
  type: CHANGE_LAYOUT,
  payload: {
    layout
  }
})

export const updateData = (data) => ({
  type: UPDATE_DATA,
  payload: {
    data
  }
})

export const changeTitle = (title) => ({
  type: CHANGE_TITLE,
  payload: {
    title
  }
})

export const createOriginal = (data) => ({
  type: CREATE_ORIGINAL,
  payload: {
    data
  }
})

export const updateDisplay = (display) => ({
  type: UPDATE_DISPLAY,
  payload: {
    display
  }
})
export const changeField= (fields) => ({
  type: CHANGE_FIELD,
  payload: {
    fields
  }
})

export const resetData = () => ({
  type: RESET_DATA
})

export const openDialog = () => ({
  type: OPEN_DIALOG
})


export const openPopup = () => ({
  type: OPEN_POPUP
})