import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useListTodos } from '../../hooks/useListTodos';
import {
  startSelectATodoToDelete,
  startSelectATodoToEdit,
} from '../../redux/actions/todosActions';

const MotionTodo = motion(AccordionItem);

// THE ENTIRE TODO-LIST COMPONENT

export const TodoList = () => {
  const dispatch = useDispatch();
  // PULL ALL TODOS FROM REDUX STORE
  const { allTodos } = useSelector(state => state.todos);
  // PAGINATE ALL TODOS TO CREATE THE TODO-LIST
  const { todoList, handlePagination, maxPage, pageLabel } =
    useListTodos(allTodos);
  // HANDLE TO UPDATE TODOS
  const setEditTodo = todo => {
    dispatch(startSelectATodoToEdit(todo));
  };
  // HANDLE TO DELETE TODOS
  const setDeleteTodo = todo => {
    dispatch(startSelectATodoToDelete(todo));
  };
  // HANDLE TO PAGINATE NEXTS TODOS
  const handleNext = () => {
    handlePagination(-15, -1);
  };
  // HANDLE TO PAGINATE PREVS TODOS
  const handlePrevious = () => {
    handlePagination(15, 1);
  };
  return (
    <>
      {/* ROW FOR PAGINATE BUTTONS */}
      <Flex justifyContent="end" alignItems='center' gap='1rem'>
        <IconButton icon={<ChevronLeftIcon />} onClick={handleNext}>prev</IconButton>
        <Text>{pageLabel} ... {maxPage}</Text>
        <IconButton icon={<ChevronRightIcon />} onClick={handlePrevious}>next</IconButton>
      </Flex>
      {/* TODO-LIST */}
      <Accordion allowToggle>
        {/* MotionTodo IS A MOTION COMPONENT TO GET ANIMATED */}
        {todoList.map(todo => (
          <MotionTodo
            key={todo.id}
            border="none"
            transition="ease-in-out"
            transitionDuration="300ms"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
          >
            {({ isExpanded }) => (
              <Flex
                gap="0.25rem"
                border="2px"
                bg={isExpanded ? 'gray.50' : 'transparent'}
                borderRadius="1rem"
                borderColor={isExpanded ? 'gray.200' : 'transparent'}
                transition="ease-in-out"
                transitionDuration="300ms"
              >
                {/* TODO SINGLE CARD */}
                <Box
                  boxSize="1rem"
                  borderRadius="full"
                  bg="blackAlpha.200"
                  marginTop="1rem"
                  marginLeft="1rem"
                />
                <Flex flexDir="column" w="95%">
                  {/* TODO CARD HEADER WITH TITLE */}
                  <h2>
                    <AccordionButton
                      transition="ease-in-out"
                      transitionDuration="300ms"
                      _focus={{ bg: 'transparent' }}
                      _hover={{ bg: 'transparent' }}
                    >
                      <Box
                        flex="1"
                        textAlign="left"
                        color="accent.500"
                        fontWeight="bold"
                        fontSize="xl"
                        textTransform="capitalize"
                        transition="ease-in-out"
                        transitionDuration="300ms"
                      >
                        {todo.title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  {/* TODO CARD CONTENT WITH BODY */}
                  <AccordionPanel
                    pb={4}
                    color="accent.100"
                    transition="ease-in-out"
                    transitionDuration="300ms"
                  >
                    <Flex flexDir="column" gap="1rem">
                      {todo.body}
                      <Flex gap="1rem" alignItems="center" w="full">
                        {/* BUTTON TO OPEN UPDATE TODO MODAL */}
                        <Button
                          w="full"
                          colorScheme="accent"
                          variant="solid"
                          onClick={() => setEditTodo(todo)}
                        >
                          Edit
                        </Button>
                        {/* BUTTON TO OPEN DELETE TODO MODAL */}
                        <Button
                          w="full"
                          colorScheme="red"
                          variant="outline"
                          onClick={() => setDeleteTodo(todo)}
                        >
                          Delete
                        </Button>
                      </Flex>
                    </Flex>
                  </AccordionPanel>
                </Flex>
              </Flex>
            )}
          </MotionTodo>
        ))}
      </Accordion>
    </>
  );
};
