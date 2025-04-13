import './Tasks.styles.scss';
import { useAppSelector } from '../../../app/store/storeHooks';
import Task from '../../../entities/task/ui/Task';
import { useMemo } from 'react';

interface TasksProps {
  searchText?: string | null;
  chosenStatus?: string | null;
  chosenBoard?: string | null;
}

const Tasks: React.FC<TasksProps> = ({
  searchText = null,
  chosenStatus = null,
  chosenBoard = null,
}: TasksProps) => {
  const { tasks, error, status } = useAppSelector((state) => state.tasks.tasks);

  const filtredTasks = useMemo(() => {
    if (!searchText && !chosenStatus && !chosenBoard) {
      return tasks;
    }
    return tasks?.filter((task) => {
      if (chosenStatus) {
        if (task.status !== chosenStatus) return false;
      }
      if (chosenBoard) {
        if (Number(task.boardId) !== Number(chosenBoard)) {
          return false;
        }
      }
      if (searchText) {
        if (
          !task.title.toLowerCase().includes(searchText.toLocaleLowerCase()) &&
          !task.assignee.fullName.toLowerCase().includes(searchText.toLocaleLowerCase())
        ) {
          return false;
        }
      }
      return true;
    });
  }, [chosenStatus, chosenBoard, tasks, searchText]);

  if (error) {
    return <div className='tasks'>{error}</div>;
  }

  if (status === 'loading') {
    return <div className='tasks'>Загрузка...</div>;
  }

  return (
    <div className='tasks'>
      {filtredTasks?.length && filtredTasks.length > 0 ? (
        filtredTasks.map((task) => (
          <Task isShownInfo={{ project: true, id: true, icons: true }} key={task.id} task={task} />
        ))
      ) : (
        <span className='tasks__nothing-found'>К сожалению, ничего не найдено</span>
      )}
    </div>
  );
};

export default Tasks;
