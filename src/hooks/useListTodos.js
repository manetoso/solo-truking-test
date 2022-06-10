import { useEffect, useState } from 'react';

/**
 * CUSTOM HOOK THAT PAGINATE ALL TODOS TO CREATE THE TODO-LIST
 * I MADE IT TO AVOID LOADING MUCH DATA ON THE WEB DOM
 * WICH HELPS WITH THE PERFORMACE
 */

export const useListTodos = todos => {
  // TODO-LIST STATE
  const [todoList, setTodoList] = useState([]);
  // CURRENT LIST-ITEMS STATE
  const [currentPage, setCurrentPage] = useState(0);
  // PAGE LABEL STATE
  const [pageLabel, setPageLabel] = useState(1);
  // MAX PAGE STATE
  const [maxPage, setMaxPage] = useState(1);

  /**
   * EVERY TIME THE TODOS LENGTH CHANGES THE PAGINATIONS WORKS
   * ALSO WHEN THE QUANTITY OF LIST-ITEMS CHANGES
   */
  useEffect(() => {
    setTodoList(todos.slice(currentPage, currentPage + 15));
    setMaxPage(Math.ceil(todos.length / 15));
  }, [todos, currentPage])

  // PAGINATION HANDLER
  const handlePagination = (desireCurrent, desirePage) => {
    const newCurrentPage = Math.max(currentPage + desireCurrent, 0);
    const newPageLabel = Math.max(pageLabel + desirePage, 1);
    if (newPageLabel === maxPage + 1) return
    setCurrentPage(newCurrentPage);
    setPageLabel(newPageLabel);
  }

  return {
      todoList,
      pageLabel,
      maxPage,
      handlePagination
  }
  
};
