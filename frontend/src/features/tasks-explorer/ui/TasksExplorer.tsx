import './TasksExplorer.styles.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/storeHooks';
import Tasks from '../../../widgets/tasks/ui/Tasks';
import { getTasks } from '../../../widgets/tasks/model/reducers/getTasks';
import Button from '../../../shared/ui/button';
import TasksFilter from '../../tasks-filter';
import Modal from '../../../shared/ui/modal';
import TaskForm from '../../task-form';
import TasksSearch from '../../tasks-search';

const TasksExplorer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const chosenStatus = useAppSelector((state) => state.tasksFilter.status);
  const chosenBoard = useAppSelector((state) => state.tasksFilter.board);
  const searchText = useAppSelector((state) => state.tasksSearch.text);

  useEffect(() => {
    const controller: AbortController = new AbortController();
    dispatch(getTasks({ url: 'http://localhost:8080/api/v1/tasks', signal: controller.signal }));

    return () => {
      controller.abort();
      console.log('req cancelled');
    };
  }, []);

  return (
    <div className='tasks-explorer'>
      <Modal
        isOpen={isModalOpen}
        handleClose={() => {
          setIsModalOpen(false);
        }}
      >
        <TaskForm />
      </Modal>
      <div className='tasks-explorer__filter-comp'>
        <TasksFilter />
        <TasksSearch />
      </div>
      <Tasks searchText={searchText} chosenStatus={chosenStatus} chosenBoard={chosenBoard} />
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
        type='button'
        className='tasks-explorer__create-button'
      >
        Создать задачу
      </Button>
    </div>
  );
};

export default TasksExplorer;
