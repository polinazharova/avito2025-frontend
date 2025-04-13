import './TasksFilter.styles.scss';
import filterIcon from '../../../assets/images/filter-icon.png';
import { useAppDispatch, useAppSelector } from '../../../app/store/storeHooks';
import { useEffect, useRef } from 'react';
import { setStatusFilter, setBoardFilter } from '../model/tasksFilterSlice';
import handleIconClick from '../lib/handlers/handleIconClick';
import handleBoardsClick from '../lib/handlers/handleBoardsClick';
import handleStatusesClick from '../lib/handlers/handleStatusesClick';

const TasksFilter: React.FC = () => {
  const filterRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards.boards);
  const chosenStatus = useAppSelector((state) => state.tasksFilter.status);
  const chosenBoard = useAppSelector((state) => state.tasksFilter.board);

  const handleBoardClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if (target.classList.contains('tasks-filter__board_chosen')) {
      target.classList.remove('tasks-filter__board_chosen');
      dispatch(setBoardFilter(null));
    } else {
      dispatch(setBoardFilter(target?.id));
    }
    const boardsContainer = target.parentNode as HTMLElement;
    boardsContainer?.classList.add('tasks-filter__boards_hidden');
  };

  const handleStatusClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if (target.classList.contains('tasks-filter__status_chosen')) {
      target.classList.remove('tasks-filter__status_chosen');
      dispatch(setStatusFilter(null));
    } else {
      let text = target?.textContent;
      if (text === 'In progress') {
        text = 'InProgress';
      }
      dispatch(setStatusFilter(text));
    }
    const statusesContainer = target.parentNode as HTMLElement;
    statusesContainer?.classList.add('tasks-filter__statuses_hidden');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as HTMLElement)) {
      if (!filterRef.current.classList.contains('tasks-filter__selector_hidden')) {
        filterRef.current.classList.add('tasks-filter__selector_hidden');
      }
    }
  };

  const handleResetClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(setStatusFilter(null));
    dispatch(setBoardFilter(null));
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='tasks-filter'>
      <img
        className='tasks-filter__icon'
        src={filterIcon}
        alt='filter icon from favicon'
        onClick={handleIconClick}
      />
      <span className='tasks-filter__reset' onClick={handleResetClick}>
        reset
      </span>
      <div className='tasks-filter__selector tasks-filter__selector_hidden' ref={filterRef}>
        <span className='tasks-filter__boards-title' onClick={handleBoardsClick}>
          Проекты
        </span>
        <div
          className='tasks-filter__boards tasks-filter__boards_hidden'
          onClick={handleBoardClick}
        >
          {boards?.map((board) => (
            <span
              key={board.id}
              id={`${board.id}`}
              className={`tasks-filter__board${Number(chosenBoard) === Number(board.id) ? ' tasks-filter__board_chosen' : ''}`}
            >
              {board.name}
            </span>
          ))}
        </div>
        <span className='tasks-filter__statuses-title' onClick={handleStatusesClick}>
          Статусы
        </span>
        <div
          className='tasks-filter__statuses tasks-filter__statuses_hidden'
          onClick={handleStatusClick}
        >
          <span
            className={`tasks-filter__status${chosenStatus === 'To do' ? ' tasks-filter__status_chosen' : ''}`}
          >
            To do
          </span>
          <span
            className={`tasks-filter__status${chosenStatus === 'InProgress' ? ' tasks-filter__status_chosen' : ''}`}
          >
            In progress
          </span>
          <span
            className={`tasks-filter__status${chosenStatus === 'Done' ? ' tasks-filter__status_chosen' : ''}`}
          >
            Done
          </span>
          <span
            className={`tasks-filter__status${chosenStatus === 'Backlog' ? ' tasks-filter__status_chosen' : ''}`}
          >
            Backlog
          </span>
        </div>
      </div>
    </div>
  );
};

export default TasksFilter;
