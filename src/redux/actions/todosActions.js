import { todoApi } from '../../api/todoApi';
import { types } from '../types/types';

/**
 * THIS IS HOW REDUX WITH REDUX-THUNK WORKS
 * I USED TO SEPARATE ALL THE LOGIC IF 4 BLOCKS
 * TYPES:
 *    I LIKE TO DECLARE THE TYPES FOR MAKING CHANGES
 *    WITH TEH REDUCERS IN OTHER FILE TO AVOID
 *    CODING MISTAKES
 * 
 * ACTIONS:
 *    THESE ARE WHAT MANAGE THE PROCESS OF THE STATE
 *    MANAGMENT, FROM HERE WE CAN TELL WHAT TO DO IN EVERY
 *    MOVEMENT OF THE STATE
 * 
 * REDUCERS:
 *    THESE ARE WHAT DECIDES HOW TO MUTATE THE GLOBAL STATE
 *    OF ALL THE STATES OF REDUX
 * 
 * STORE:
 *    STORES ALL THE VARIABLES THAT CAN BE MUTABLES
 */

/**
 * THESE ARE ALL THE ACTIONS TO USE REDUX
 * AND MANAGE ALL THE STATE CHANGES FOR
 * THE UI.
 */

// FETCHS FOR ALL THE TODOS
export const startFetchingTodos = () => {
  return async dispatch => {
    await dispatch(startLoading());
    try {
      const { data } = await todoApi.get('');
      // SAVE ALL THE TODOS IN THE REDUX STORE
      await dispatch(fetchTodos(data));
    } catch (error) {}
    setTimeout(async () => {
      await dispatch(finishLoading());
    }, 1000);
  };
};
// INSERT THE NEW TODO IN THE TODO-LIST --- DON'T NEED TO FETCH AGAIN
export const finishCreatingATodoTo = todo => {
  return async dispatch => {
    await dispatch(createTodo(todo));
  };
};
// UPDATES THE SELECTED TODO IN THE TODO-LIST --- DON'T NEED TO FETCH AGAIN
export const finishEditingATodoTo = todo => {
  return async dispatch => {
    await dispatch(editTodo(todo));
  };
};
// DELETES THE SELECTED TODO FROM THE TODO-LIST --- DON'T NEED TO FETCH AGAIN
export const finishDeletingATodoTo = id => {
  return async dispatch => {
    await dispatch(deleteTodo(id));
  };
};
// OPEN MODAL AND SELECT A TODO TO UPDATED
export const startSelectATodoToEdit = todo => {
  return async dispatch => {
    await dispatch(selectTodoEdit(todo));
    await dispatch(startOnOpen('update'));
  };
};
// OPEN MODAL AND SELECT A TODO TO DELETED
export const startSelectATodoToDelete = todo => {
  return async dispatch => {
    await dispatch(selectTodoDelete(todo));
    await dispatch(startOnOpen('delete'));
  };
};
// OPEN MODAL
export const startOnOpen = modal => {
  return async dispatch => {
    dispatch(onOpen(modal));
  };
};
// CLOSE MODAL
export const startOnClose = modal => {
  return async dispatch => {
    dispatch(onClose(modal));
  };
};

// ALL LOCAL OBJECTS FOR THE REDUCER
const fetchTodos = todos => ({
  type: types.fetchAllTodos,
  payload: todos,
});
const selectTodoEdit = todo => ({
  type: types.selectTodoToUpdate,
  payload: todo,
});
const selectTodoDelete = todo => ({
  type: types.selectTodoToDelete,
  payload: todo,
});
const createTodo = todo => ({
  type: types.createTodo,
  payload: todo,
});
const editTodo = todo => ({
  type: types.updateTodo,
  payload: todo,
});
const deleteTodo = id => ({
  type: types.deleteTodo,
  payload: id,
});

const onOpen = modal => {
  let type;
  switch (modal) {
    case 'create':
      type = types.onOpenCreate;
      break;
    case 'update':
      type = types.onOpenUpdate;
      break;
    case 'delete':
      type = types.onOpenDelete;
      break;
    default:
      break;
  }
  return { type };
};
const onClose = modal => {
  let type;
  switch (modal) {
    case 'create':
      type = types.onCloseCreate;
      break;
    case 'update':
      type = types.onCloseUpdate;
      break;
    case 'delete':
      type = types.onCloseDelete;
      break;
    default:
      break;
  }
  return { type };
};

const startLoading = () => ({
  type: types.startLoading,
  payload: {},
});
const finishLoading = () => ({
  type: types.finishLoading,
  payload: {},
});
