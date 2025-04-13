import './BoardExplorer.styles.scss';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/storeHooks';
import { getBoardTasks } from '../../../widgets/boards/model/reducers/getBoardTasks';
import { useParams } from 'react-router-dom';
import Task from '../../../entities/task';
import { Task as TaskType } from '../../../widgets/tasks/model/reducers/getTasks';
import { getBoards } from '../../../widgets/boards/model/reducers/getBoards';

const BoardExplorer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { boardTasks, status, error } = useAppSelector((state) => state.boards.boardTasks);
  const { boards, error: boardsError } = useAppSelector((state) => state.boards.boards);

  const params = useParams();

  useEffect(() => {
    const controller: AbortController = new AbortController();

    dispatch(
      getBoardTasks({
        url: `http://localhost:8080/api/v1/boards/${params.id}`,
        signal: controller.signal,
      }),
    );
    dispatch(getBoards({ url: `http://localhost:8080/api/v1/boards`, signal: controller.signal }));

    return () => {
      controller.abort();
      console.log('req cancelled');
    };
  }, []);

  const boardName = useMemo(() => {
    let boardName = 'Unknown';
    const boardIndex = boards?.findIndex((board) => Number(board?.id) === Number(params?.id));
    if (boardIndex !== null && boardIndex !== undefined) {
      boardName = boards?.[boardIndex]?.name as string;
    }
    return boardName;
  }, [boards, params]);

  const { done, inProgress, backLog } = useMemo(() => {
    const done: TaskType[] = [],
      inProgress: TaskType[] = [],
      backLog: TaskType[] = [];

    boardTasks?.forEach((task) => {
      if (task.status === 'Backlog') {
        backLog.push({ ...task, boardName: boardName });
        return;
      }
      if (task.status === 'Done') {
        done.push({ ...task, boardName: boardName });
        return;
      }
      if (task.status === 'InProgress') {
        inProgress.push({ ...task, boardName: boardName });
        return;
      }
    });

    return { done, inProgress, backLog };
  }, [boardTasks, boardName]);

  if (error || boardsError) {
    return <div className='board-explorer'>Ошибка: {error || boardsError}</div>;
  }

  if (status === 'loading') {
    return <div className='board-explorer'>Загрузка...</div>;
  }

  return (
    <div className='board-explorer'>
      <h3 className='board-explorer__board-title'>Проект: {boardName}</h3>
      <div className='board-explorer__container'>
        <div className='board-explorer__backlog'>
          <h4 className='board-explorer__status-title'>Backlog</h4>
          <div className='board-explorer__tasks'>
            {backLog?.map((task) => (
              <Task
                key={'board' + task.id}
                task={task}
                className='board-explorer__task'
                isOnBoard={true}
              />
            ))}
          </div>
        </div>
        <div className='board-explorer__in-progress'>
          <h4 className='board-explorer__status-title'>In progress</h4>
          <div className='board-explorer__tasks'>
            {inProgress?.map((task) => (
              <Task
                key={'board' + task.id}
                task={task}
                className='board-explorer__task'
                isOnBoard={true}
              />
            ))}
          </div>
        </div>
        <div className='board-explorer__done'>
          <h4 className='board-explorer__status-title'>Done</h4>
          <div className='board-explorer__tasks'>
            {done?.map((task) => (
              <Task
                key={'board' + task.id}
                task={task}
                className='board-explorer__task'
                isOnBoard={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardExplorer;
