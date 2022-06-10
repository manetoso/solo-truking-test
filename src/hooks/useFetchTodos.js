import { useEffect, useState } from 'react';
import { todoApi } from '../api/todoApi';
import { finishCreatingATodoTo, finishDeletingATodoTo, finishEditingATodoTo } from '../redux/actions/todosActions';

/**
 * HOOK TO HANDLE ALL POST, PUT AND DELETE EVENTS OF THE TODOS
 * FROM HERE WE DO THIS 3 ACTIONS BUT THANKS TO REDUX
 * THE UI GETS MODIFIED FROM THE LOGIC OF redux FOLDER
 */

export const useFetchTodos = () => {
  // LOADING FLAG
  const [isLoading, setIsLoading] = useState(true);

  // CREATE TODO METHOD
  const createTodo = async (todo, toast, dispatch) => {
    // STARTS LOADING
    setIsLoading(true);
    try {
      // MAKE THE REQUEST
      const { data } = await todoApi.post('', todo);
      toast({
        title: 'Todo Created',
        description: JSON.stringify(data, 0),
        position: 'top-right',
        variant: 'left-accent',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      // DISPATCH THE CREATE TODO UI METHOD
      dispatch(finishCreatingATodoTo(data))
    } catch (error) {
      console.log(error.response);
    }
    // STOPS LOADING
    setIsLoading(false);
  };
  const updateTodo = async (todo, toast, dispatch) => {
    // STARTS LOADING
    setIsLoading(true);
    try {
      // MAKE THE REQUEST
      const { data } = await todoApi.put(`/${todo.id}`, todo);
      toast({
        title: 'Todo Updated',
        description: JSON.stringify(data, 0),
        position: 'top-right',
        variant: 'left-accent',
        status: 'info',
        duration: 9000,
        isClosable: true,
      });
      // DISPACH THE UPDATE TODO UI METHOD
      dispatch(finishEditingATodoTo(data))
    } catch (error) {
      console.log(error.response.data);
      toast({
        title: 'Todo Updated',
        description: JSON.stringify(todo, 0),
        position: 'top-right',
        variant: 'left-accent',
        status: 'info',
        duration: 9000,
        isClosable: true,
      });
      // DISPACH THE UPDATE TODO UI METHOD IS IN THE ERRO BECAUSE THE API FALLS BACK --- CHECK THE CONSOLE
      dispatch(finishEditingATodoTo(todo))
    }
    // STOPS LOADING
    setIsLoading(false);
  };
  const deleteTodo = async ({ id }, toast, dispatch) => {
    // STARTS LOADING
    setIsLoading(true);
    try {
      // MAKE THE REQUEST
      const { data } = await todoApi.delete(`/${id}`);
      toast({
        title: `Todo with ID: ${id} Deleted`,
        description: JSON.stringify(data, 0),
        position: 'top-right',
        variant: 'left-accent',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      // DISPATCH THE DELETE TODO UI METHOD
      dispatch(finishDeletingATodoTo(id))
    } catch (error) {}
    // STOPS LOADING
    setIsLoading(false);
  };

  return {
    isLoading,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};
