import { TAGGLE_MOBILE_OPEN, CHANGE_LAYOUT,UPDATE_DATA } from './actionTypes'

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