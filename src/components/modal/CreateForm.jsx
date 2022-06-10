import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startOnClose } from '../../redux/actions/todosActions';
import * as Yup from 'yup';
import { InputForm, SimpleForm } from '../form';
import { CustomModal } from './CustomModal';
import { useFetchTodos } from '../../hooks/useFetchTodos';
import { useToast } from '@chakra-ui/react';

// INITIAL VALUES OF THE FORM

const initialValues = {
  title: '',
  body: '',
  userId: 1,
};

// FORM TO CREATE A TODO (IT IS INSIDE A MODAL)

export const CreateForm = () => {
  const dispatch = useDispatch();
  // LOADING FLAG FROM REDUX STORE
  const { checking } = useSelector(store => store.todos);
  // MODAL FLAG TO OPEN AND CLOSE IT FROM REDUX STORE
  const { modal } = useSelector(store => store.todos.todoToCreate);
  // METHOD TO CREATE TODO AND STORE IN DATABASE
  const { createTodo } = useFetchTodos();
  // SIMPLE TOAST
  const toast = useToast();
  // HANDLE METHOD TO CREATE TODO
  const handleCreateTodo = todo => {
    createTodo(todo, toast, dispatch);
    customOnClose();
  };
  // HANDLE METHOD TO CLOSE MODAL
  const customOnClose = () => {
    dispatch(startOnClose('create'));
  };
  return (
    // MODAL
    <CustomModal
      isOpen={modal.isOpen}
      onClose={customOnClose}
      title="Create Todo"
    >
      {/* CUSTOM FORM REUSABLE COMPONENT */}
      <SimpleForm
        buttonLabel="Create"
        buttonLoadingLabel="Loading"
        buttonVariant="outline"
        theme="accent"
        needToResetForm
        hasIsLoading
        isLoading={checking}
        onSubmit={values => handleCreateTodo(values)}
        initialValues={initialValues}
        validationSchema={Yup.object({
          title: Yup.string().required('The Title is required'),
          body: Yup.string().required('The Body is required'),
        })}
      >
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
