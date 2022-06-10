import { types } from '../types/types';

/**
 * TODOS REDUCER, MAYBE IT IS BIG FOR JUST "TODOS" BUT
 * I DON'T LIKE TO MIX REDUCERS FOR THE SAME USAGE
 */

const todo = {
  userId: 1,
  id: 1,
  title: '',
  body: '',
};

// INITIAL STATE OF THE REDUCER

const initialState = {
  checking: true,
  allTodos: [],
  todoToCreate: {
    modal: {
      isOpen: false,
    },
  },
  todoToUpdate: {
    modal: {
      isOpen: false,
    },
    todo,
  },
  todoToDelete: {
    modal: {
      isOpen: false,
    },
    todo,
  },
};
// THE ENTIRE REDUCER
export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    // UPDATES STORE WITH ALL TODOS
    case types.fetchAllTodos:
      return {
        ...state,
        allTodos: [...action.payload],
      };
    // UPDATES STORE WITH THE SELECTED TODO TO UPDATE
    case types.selectTodoToUpdate:
      return {
        ...state,
        todoToUpdate: {
          ...state.todoToUpdate,
          todo: action.payload,
        },
      };
    // UPDATES STORE WITH THE SLECTED TODO TO DELETE
    case types.selectTodoToDelete:
      return {
        ...state,
        todoToDelete: {
          ...state.todoToDelete,
          todo: action.payload,
        },
      };
    // INSERTS THE TODO CREATED TO THE TODO-LIST --- AVOID REFETCH FOR TODOS
    case types.createTodo:
      return {
        ...state,
        allTodos: [action.payload ,...state.allTodos],
      };
    // UPDATES THE TODO SELECTED FROM THE TODO-LIST --- AVOID REFETCH FOR TODOS
    case types.updateTodo:
      const newUpdatedTodos = state.allTodos.map(todo => {
        if (action.payload.id  === todo.id) {
          return {...todo, title: action.payload.title, body: action.payload.body }
        }
        return todo
      })
      return {
        ...state,
        allTodos: [...newUpdatedTodos],
      };
    // DELETES THE TODO SELECTED FROM THE TODO-LIST --- AVOID REFETCH FOR TODOS
    case types.deleteTodo:
      return {
        ...state,
        allTodos: [...state.allTodos.filter(todo => todo.id !== action.payload)],
      };
    // UPDATES STORE MODAL FLAG TO CREATE TODO
    case types.onOpenCreate:
      return {
        ...state,
        todoToCreate: {
          ...state.todoToCreate,
          modal: {
            isOpen: true,
          },
        },
      };
    // UPDATES STORE MODAL FLAG TO UPDATE TODO
    case types.onOpenUpdate:
      return {
        ...state,
        todoToUpdate: {
          ...state.todoToUpdate,
          modal: {
            isOpen: true,
          },
        },
      };
    // UPDATES STORE MODAL FLAG TO DELETE TODO
    case types.onOpenDelete:
      return {
        ...state,
        todoToDelete: {
          ...state.todoToDelete,
          modal: {
            isOpen: true,
          },
        },
      };
    // UPDATES STORE MODAL FLAG TO CREATE TODO
    case types.onCloseCreate:
      return {
        ...state,
        todoToCreate: {
          ...state.todoToCreate,
          modal: {
            isOpen: false,
          },
        },
      };
    // UPDATES STORE MODAL FLAG TO UPDATE TODO
    case types.onCloseUpdate:
      return {
        ...state,
        todoToUpdate: {
          ...state.todoToUpdate,
          modal: {
            isOpen: false,
          },
        },
      };
    // UPDATES STORE MODAL FLAG TO DELETE TODO
    case types.onCloseDelete:
      return {
        ...state,
        todoToDelete: {
          ...state.todoToDelete,
          modal: {
            isOpen: false,
          },
        },
      };
    // UPDATES STORE LOADING FLAG
    case types.startLoading:
      return {
        ...state,
        checking: true,
      };
    // UPDATES STORE LOADING FLAG
    case types.finishLoading:
      return {
        ...state,
        checking: false,
      };

    default:
      return state;
  }
};
