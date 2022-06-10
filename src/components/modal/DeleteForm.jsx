import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startOnClose } from '../../redux/actions/todosActions';
import * as Yup from 'yup';
import { InputForm, SimpleForm } from '../form';
import { CustomModal } from './CustomModal';
import { useFetchTodos } from '../../hooks/useFetchTodos';
import { useToast } from '@chakra-ui/react';

// FORM TO DELETE A TODO (IT IS INSIDE A MODAL)

export const DeleteForm = () => {
  const dispatch = useDispatch();
  // LOADING FLAG FROM REDUX STORE
  const { checking } = useSelector(store => store.todos);
  // MODAL FLAG TO OPEN AND CLOSE IT FROM REDUX STORE AND SELECTED TODO ALSO FORM REDUX
  // HERE THE SELECTED TODO DATA IS USE AS INITIALVALUES FOR THE FORM
  const { modal, todo } = useSelector(store => store.todos.todoToDelete);
  // METHOD TO CREATE TODO AND STORE IN DATABASE
  const { deleteTodo } = useFetchTodos();
  // SIMPLE TOAST
  const toast = useToast();
  // HANDLE METHOD TO DELETE TODO
  const handleDeleteTodo = todo => {
    deleteTodo(todo, toast, dispatch);
    customOnClose();
  };
  // HANDLE METHOD TO CLOSE MODAL
  const customOnClose = () => {
    dispatch(startOnClose('delete'));
  };
  return (
    // MODAL
    <CustomModal
      isOpen={modal.isOpen}
      onClose={customOnClose}
      title="Delete Todo"
    >
      {/* CUSTOM FORM REUSABLE COMPONENT */}
      <SimpleForm
        buttonLabel="Do you really want to delete this todo?"
        buttonLoadingLabel="Loading"
        buttonVariant="outline"
        theme="red"
        needToResetForm
        hasIsLoading
        isLoading={checking}
        onSubmit={values => handleDeleteTodo(values)}
        initialValues={todo}
        validationSchema={Yup.object({
          title: Yup.string().required('The Title is required'),
          body: Yup.string().required('The Body is required'),
        })}
      >
        <input type="text" hidden defaultValue={todo.id} name="id" />
        <InputForm
          label="Title"
          name="title"
          placeholder="Title"
          variant="filled"
          type="text"
          isHidden
        />
      </SimpleForm>
    </CustomModal>
  );
};
