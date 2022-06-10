import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AddIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import {
  CustomSkeleton,
  UpdateForm,
  DeleteForm,
  CreateForm,
  TodoList,
} from '../components';
import { startFetchingTodos, startOnOpen } from '../redux/actions/todosActions';

const pageMotion = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
};

// MOTION IS A COMPONENT FROM FRAMER MOTION TO ADD ANIMATIONS
const MotionBox = motion(Flex);

/**
 * 
 * Home.jsx IS WHERE ALL THE COMPONENTS ARE CONNECTED
 */

export const Home = () => {
  const dispatch = useDispatch();
  const { checking } = useSelector(store => store.todos);
  // REDUX DISPATCH TO OPEN THE MODAL TO CREATE TODOS
  const setCreateTodo = () => {
    dispatch(startOnOpen('create'));
  };
  // FETCHING TODOS METHOD
  useEffect(() => {
    dispatch(startFetchingTodos());
  }, []);

  return (
    // CONTAINER
    <MotionBox w="100%" minH="100vh" justifyContent="center">
      {/* MAIN COLUMN */}
      <Flex
        flexDir="column"
        paddingX="2rem"
        marginX="0"
        marginTop="2rem"
        marginBottom="2rem"
        minW={{ base: '100%', md: '60rem' }}
        maxW="60rem"
        gap="4"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageMotion}
      >
        <Heading textTransform="uppercase">simple todo-list</Heading>
        <Flex flexDir="column" gap="2" w="100%">
          <Text color="accent.100" textAlign='end'>Developed by Emmanuel Cortes</Text>
          <Text color="accent.100" textAlign='end'>
            There is a bug on the api, that just create a todo with the ID: 101, and dont update that todo, I handle the update method but not the created
            method because I relise about this bug at the end.
          </Text>
          <Text color="accent.100">Tasks</Text>
          {/* RENDERING CONDITIONALLY THE TODO-LIST AND THE LOADING SKELETON COMPONENT */}
          {checking ? <CustomSkeleton /> : <TodoList />}
        </Flex>
      </Flex>
      {/* FLOTING ACTION BUTTON TO OPEN MODAL TO ADD A TODO */}
      <IconButton
        position="fixed"
        right="1.5rem"
        bottom="1.5rem"
        variant="solid"
        rounded="full"
        colorScheme="accent"
        aria-label="Search database"
        icon={<AddIcon />}
        onClick={setCreateTodo}
      />
      {/* ALL THE MODAL FOR CREATING, UPDATING AND DELETING TODOS */}
      {/* 
          ALL THESE FORMS HAS THEIR OWN FORM REUSABLE COMPONENT THAT
          CAN VALIDATE THE DATA.
          I MADE IT USING FORMIK AND YUP.
      */}
      <CreateForm />
      <UpdateForm />
      <DeleteForm />
    </MotionBox>
  );
};
