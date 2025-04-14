import './TaskForm.styles.scss';
import { Task } from '../../../widgets/tasks/model/reducers/getTasks';
import Button from '../../../shared/ui/button';
import { useAppDispatch, useAppSelector } from '../../../app/store/storeHooks';
import Selector from '../../../shared/ui/selector/ui/Selector';
import { useEffect, useMemo, useState } from 'react';
import { postTask } from '../../../widgets/tasks/model/reducers/postTask';
import { putTask } from '../../../widgets/tasks/model/reducers/putTask';
import { PostTask } from '../../../widgets/tasks/model/reducers/postTask';
import { PutTask } from '../../../widgets/tasks/model/reducers/putTask';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../../entities/users/model/reducers/getUsers';
import { getBoards } from '../../../widgets/boards/model/reducers/getBoards';
import { pushTask, updateTask } from '../../../widgets/tasks/model/tasksSlice';
import { updateBoardTasks } from '../../../widgets/boards/model/boardsSlice';
import { setDraftDesc, setDraftTitle } from '../model/draftSlice';

interface TaskFormProps {
  task?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ task = null }: TaskFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    id: createdTaskId,
    status: createTaskStatus,
    error: createTaskError,
  } = useAppSelector((state) => state.tasks.taskCreation);
  const { status: updateTaskStatus, error: updateTaskError } = useAppSelector(
    (state) => state.tasks.taskUpdate,
  );

  const { boards } = useAppSelector((state) => state.boards.boards);
  const { users } = useAppSelector((state) => state.users.users);
  const { draftTitle, draftDescription } = useAppSelector((state) => state.draft);

  const [selectedTitle, setSelectedTitle] = useState<string | null>(task?.title || null);
  const [selectedBoard, setSelectedBoard] = useState<number | null>(task?.boardId || null);
  const [selectedDescription, setSelectedDescription] = useState<string | null>(
    task?.description || null,
  );
  const [selectedPriority, setSelectedPriority] = useState<string | null>(task?.priority || null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(task?.status || null);
  const [selectedAssignee, setSelectedAssignee] = useState<number | null>(
    task?.assignee.id || null,
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [triedToSumbit, setTriedToSubmit] = useState<boolean>(false);

  const draft = useMemo(() => {
    const draft = { draftTitle, draftDescription };
    return JSON.stringify(draft);
  }, [draftTitle, draftDescription]);

  useEffect(() => {
    const draft = sessionStorage.getItem('taskFormDraft');
    if (draft) {
      const { draftTitle, draftDescription } = JSON.parse(draft);
      setSelectedTitle(draftTitle);
      setSelectedDescription(draftDescription);
      dispatch(setDraftTitle(draftTitle));
      dispatch(setDraftDesc(draftDescription));
    }
  }, []);

  useEffect(() => {
    const controller: AbortController = new AbortController();
    if (!users) {
      dispatch(getUsers({ url: 'http://127.0.0.1:8080/api/v1/users', signal: controller.signal }));
    }
    if (!boards) {
      dispatch(
        getBoards({ url: `http://localhost:8080/api/v1/boards`, signal: controller.signal }),
      );
    }

    return () => {
      controller.abort();
      console.log('req cancelled');
    };
  }, []);

  const newTask = useMemo(() => {
    if (!task) {
      return {
        assigneeId: selectedAssignee,
        boardId: selectedBoard,
        description: selectedDescription,
        priority: selectedPriority,
        title: selectedTitle,
      };
    }
    return {
      assigneeId: selectedAssignee,
      description: selectedDescription,
      priority: selectedPriority,
      status: selectedStatus,
      title: selectedTitle,
    };
  }, [
    selectedTitle,
    selectedBoard,
    selectedDescription,
    selectedPriority,
    selectedStatus,
    selectedAssignee,
  ]);

  const gaps = useMemo(() => {
    return !!Object.keys(newTask).find(
      (key: string) =>
        !newTask[key as keyof typeof newTask] && newTask[key as keyof typeof newTask] !== 0,
    );
  }, [newTask, isSubmitted]);


  const handleTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target?.value;
    setSelectedTitle(title);
    if (!task) {
      dispatch(setDraftTitle(title));
      sessionStorage.setItem('taskFormDraft', draft);
    }
  };

  const handleAreaDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target?.value;
    setSelectedDescription(description);

    if (!task) {
      dispatch(setDraftDesc(description));
      sessionStorage.setItem('taskFormDraft', draft);
    }
  };

  const handleBoardClick = (event: React.MouseEvent) => {
    const boardName = (event.target as HTMLElement)?.textContent;
    const boardId = Number(boards?.find((board) => board.name === boardName)?.id);
    if (boardId === selectedBoard) {
      setSelectedBoard(null);
      return;
    }
    setSelectedBoard(boardId);
  };
  const handlePriorityClick = (event: React.MouseEvent) => {
    const priority = (event.target as HTMLElement)?.textContent;
    if (priority === selectedPriority) {
      setSelectedPriority(null);
      return;
    }
    setSelectedPriority(priority);
  };
  const handleStatusClick = (event: React.MouseEvent) => {
    let status = (event.target as HTMLElement)?.textContent;
    if (status === 'In progress') {
      status = 'InProgress';
    }
    if (status === selectedStatus) {
      setSelectedStatus(null);
      return;
    }
    setSelectedStatus(status);
  };

  const handleAssigneeClick = (event: React.MouseEvent) => {
    const assignee = (event.target as HTMLElement)?.textContent;
    const assigneeId = Number(
      users?.find((user) => `${user.fullName} id: ${user.id}` === assignee)?.id,
    );
    if (assigneeId === selectedAssignee) {
      setSelectedAssignee(null);
      return;
    }
    setSelectedAssignee(assigneeId);
  };

  const handleSubmitButton = (event: React.MouseEvent) => {
    event.preventDefault();
    if (gaps) {
      setTriedToSubmit(true);
      return;
    }
    if (task) {
      dispatch(
        putTask({
          url: `http://localhost:8080/api/v1/tasks/update/${task.id}`,
          payload: newTask as PutTask,
        }),
      );
    } else {
      dispatch(
        postTask({
          url: 'http://localhost:8080/api/v1/tasks/create',
          payload: newTask as PostTask,
        }),
      );
    }
    setIsSubmitted(true);
  };

  const handleRedirectButtonClick = () => {
    navigate('/board/' + task?.boardId);
    sessionStorage.setItem('redirectedFromTask', JSON.stringify(task?.id));
  };

  useEffect(() => {
    if (isSubmitted) {
      dispatch(setDraftTitle(null));
      dispatch(setDraftDesc(null));
      sessionStorage.removeItem('taskFormDraft');
      if (createTaskStatus === 'succeeded') {
        const { assigneeId, ...createdTask } = {
          assignee: users?.find((user) => user.id === newTask.assigneeId),
          id: createdTaskId,
          boardName: boards?.find((board) => board.id === newTask.boardId)?.name,
          status: 'Backlog',
          ...newTask,
        };
        dispatch(pushTask(createdTask));
        dispatch(updateBoardTasks(createdTask));
      }

      if (updateTaskStatus === 'succeeded') {
        const { assigneeId, ...updatedTask } = {
          assignee: users?.find((user) => user.id === newTask.assigneeId),
          id: task?.id,
          boardName: task?.boardName,
          boardId: task?.boardId,
          ...newTask,
        };
        dispatch(updateTask(updatedTask));
        dispatch(updateBoardTasks(updatedTask));
      }
    }
  }, [createTaskStatus, updateTaskStatus]);

  if ((createTaskStatus === 'succeeded' || updateTaskStatus === 'succeeded') && isSubmitted) {
    return (
      <div className='task-form'>
        <div className='task-form__done'>
          Задача успешно{' '}
          {createTaskStatus === 'succeeded' ? `создана! Её id: ${createdTaskId}` : 'обновлена!'}
        </div>
      </div>
    );
  }

  return (
    <div className='task-form'>
      <h3 className='task-form__title'>{task ? 'Редактирование' : 'Создание'} задачи</h3>
      <form className='task-form__form'>
        <input
          onChange={handleTitleInputChange}
          defaultValue={task?.title || draftTitle || ''}
          className='task-form__title-input'
          placeholder='Название'
          type='text'
          name='title'
        />
        <textarea
          onChange={handleAreaDescChange}
          defaultValue={task?.description || draftDescription || ''}
          className='task-form__desc-textarea'
          rows={5}
          placeholder='Описание'
          name='description'
        ></textarea>
        <div className='task-form__boards'>
          {!task ? (
            <Selector
              handleOptionClick={handleBoardClick}
              options={{ Проект: boards ? boards.map((board) => board.name) : null }}
            />
          ) : (
            <div className='task-form__board-title'>Проект: {task.boardName}</div>
          )}
        </div>
        <div className='task-form__priority'>
          <Selector
            preSelected={task?.priority || null}
            handleOptionClick={handlePriorityClick}
            options={{ Приоритет: ['Low', 'Medium', 'High'] }}
          />
        </div>
        {task ? (
          <div className='task-form__status'>
            <Selector
              preSelected={task.status === 'InProgress' ? 'In progress' : task.status}
              handleOptionClick={handleStatusClick}
              options={{ Статус: ['Backlog', 'In progress', 'Done'] }}
            />
          </div>
        ) : null}
        <div className='task-form__assignee'>
          {
            <Selector
              preSelected={task ? `${task.assignee.fullName} id: ${task.assignee.id}` : null}
              handleOptionClick={handleAssigneeClick}
              options={{
                Исполнитель: users ? users.map((user) => `${user.fullName} id: ${user.id}`) : null,
              }}
            />
          }
        </div>
        {gaps && triedToSumbit ? (
          <span className='task-form__action-info-gaps'>Заполните все поля!</span>
        ) : null}
        {createTaskStatus === 'loading' || updateTaskStatus === 'loading' ? (
          <span className='task-form__action-info-sending'>Отправка формы...</span>
        ) : null}
        {(createTaskError || updateTaskError) && isSubmitted ? (
          <span className='task-form__action-info-error'>
            Ошибка отправки формы: {createTaskError || updateTaskError}
          </span>
        ) : null}
        <div className='task-form__buttons'>
          <Button type='button' disabled={!task} onClick={handleRedirectButtonClick}>
            Перейти на доску
          </Button>
          <Button type='submit' onClick={handleSubmitButton}>
            {task ? 'Обновить' : 'Создать'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
