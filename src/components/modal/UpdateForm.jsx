import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startOnClose } from '../../redux/actions/todosActions';
import * as Yup from 'yup';
import { InputForm, SimpleForm } from '../form';
import { CustomModal } from './CustomModal';
import { useFetchTodos } from '../../hooks/useFetchTodos';
import { useToast } from '@chakra-ui/react';

// FORM TO UPDATE A TODO (IT IS INSIDE A MODAL)

export const UpdateForm = () => {
  const dispatch = useDispatch();
  // LOADING FLAG FROM REDUX STORE
  const { checking } = useSelector(store => store.todos);
  // MODAL FLAG TO OPEN AND CLOSE IT FROM REDUX STORE AND SELECTED TODO ALSO FORM REDUX
  // HERE THE SELECTED TODO DATA IS USE AS INITIALVALUES FOR THE FORM
  const { modal, todo } = useSelector(store => store.todos.todoToUpdate);
  // METHOD TO CREATE TODO AND STORE IN DATABASE
  const { updateTodo } = useFetchTodos();
  // SIMPLE TOAST
  const toast = useToast();
  // HANDLE METHOD TO UPDATE TODO
  const handleUpdateTodo = todo => {
    updateTodo(todo, toast, dispatch);
    customOnClose();
  };
  // HANDLE METHOD TO CLOSE MODAL
  const customOnClose = () => {
    dispatch(startOnClose('update'));
  };
  return (
    // MODAL
    <CustomModal
      isOpen={modal.isOpen}
      onClose={customOnClose}
      title="Update Todo"
    >
      {/* CUSTOM FORM REUSABLE COMPONENT */}
      <SimpleForm
        buttonLabel="Update"
        buttonLoadingLabel="Loading"
        buttonVariant="outline"
        theme="accent"
        needToResetForm
        hasIsLoading
        isLoading={checking}
        onSubmit={values => handleUpdateTodo(values)}
        initialValues={todo}
        validationSchema={Yup.object({
          title: Yup.string().required('The Title is required'),
          body: Yup.string().required('The Body is required'),
        })}
      >
        <input type="text" hidden defaultValue={1} name="id" />
        <input type="text" hidden defaultValue={1} name="userId" />
        <InputForm
          label="Title"
          name="title"
          placeholder="Title"
          variant="filled"
          type="text"
        />
        <InputForm
          label="Body"
          name="body"
          placeholder="Body"
          variant="filled"
          type="text"
        />
      </SimpleForm>
    </CustomModal>
  );
};
