import './Task.styles.scss';
import taskIcon from '../../../assets/images/task-icon.png';
import boardIcon from '../../../assets/images/board-icon.png';
import taskViewIcon from '../../../assets/images/task-view-icon.png';
import Modal from '../../../shared/ui/modal';
import TaskForm from '../../../features/task-form';
import { useEffect, useState } from 'react';
import { Task as TaskType } from '../../../widgets/tasks/model/reducers/getTasks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface TaskProps {
  task: TaskType;
  isShownInfo?: {
    project: boolean;
    id: boolean;
    icons: boolean;
  } | null;
  className?: string;
  isOnBoard?: boolean;
}

const Task: React.FC<TaskProps> = ({
  task,
  isShownInfo = null,
  className = '',
  isOnBoard = false,
}: TaskProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const redirectedFromTask = sessionStorage.getItem('redirectedFromTask');
    const id = params?.id;

    if (redirectedFromTask && id) {
      if (location.pathname === `/board/${id}` && JSON.parse(redirectedFromTask) == task.id)
        setIsModalOpen(true);
    }
  }, []);

  const handleBoardIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate('/board/' + task.boardId);
    sessionStorage.setItem('redirectedFromTask', JSON.stringify(task.id));
  };

  const handleTaskClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isOnBoard) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        handleClose={() => {
          setIsModalOpen(false);
          sessionStorage.removeItem('redirectedFromTask');
        }}
      >
        <TaskForm task={task} />
      </Modal>
      <div id={`${task.id}`} className={`task ${className}`} onClick={handleTaskClick}>
        <div className='task__name-comp'>
          <span className='task__title'>{task.title}</span>
          {isShownInfo?.project ? (
            <span className='task__board-name'>Проект: {task.boardName}</span>
          ) : null}
        </div>
        {isShownInfo?.id ? (
          <div className='task__num-comp'>
            <span className='task__id'>Задача №{task.id}</span>
            <img className='task__icon' src={taskIcon} alt='task icon from favicon' />
          </div>
        ) : null}
        {isShownInfo?.icons ? (
          <>
            <div className='task__icons-comp'>
              <img
                onClick={handleBoardIconClick}
                className='task__board-icon'
                src={boardIcon}
                alt='board icon from favicon'
              />
              <img
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className='task__task-view-icon'
                src={taskViewIcon}
                alt='board icon from favicon'
              />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Task;
