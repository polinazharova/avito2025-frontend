import './TasksSearch.styles.scss';
import searchIcon from '../../../assets/images/search-icon.png';
import { setSearchText } from '../model/tasksSearchSlice';
import { useAppDispatch } from '../../../app/store/storeHooks';
import { useRef } from 'react';

const TasksSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSearchSubmit = () => {
    if (inputRef.current) {
      const text = inputRef.current.value;
      dispatch(setSearchText(text));
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  const handleIconClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    handleSearchSubmit();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchSubmit();
    }
  };

  return (
    <div className='tasks-search'>
      <form ref={formRef} className='tasks-search__form'>
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          name='task-name-assignee-name'
          className='tasks-search__input'
          type='text'
          placeholder='Название/исполнитель задачи'
        />
        <img
          className='tasks-search__search-icon'
          src={searchIcon}
          alt='search icom from favicon'
          onClick={handleIconClick}
        />
      </form>
    </div>
  );
};

export default TasksSearch;
