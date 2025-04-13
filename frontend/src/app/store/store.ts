import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../../widgets/tasks/model/tasksSlice';
import boardsReducer from '../../widgets/boards/model/boardsSlice';
import tasksFilterReducer from '../../features/tasks-filter/model/tasksFilterSlice';
import usersReducer from '../../entities/users/model/UsersSlice';
import modalReducer from '../../shared/ui/modal/model/ModalSlice';
import tasksSearchReducer from '../../features/tasks-search/model/tasksSearchSlice';
import draftReducer from '../../features/task-form/model/draftSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    boards: boardsReducer,
    tasksFilter: tasksFilterReducer,
    tasksSearch: tasksSearchReducer,
    users: usersReducer,
    modal: modalReducer,
    draft: draftReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
