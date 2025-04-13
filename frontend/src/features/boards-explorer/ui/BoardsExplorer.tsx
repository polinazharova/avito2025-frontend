import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/store/storeHooks';
import { getBoards } from '../../../widgets/boards/model/reducers/getBoards';
import Boards from '../../../widgets/boards/ui/Boards';

const BoardsExplorer: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller: AbortController = new AbortController();
    dispatch(getBoards({ url: 'http://localhost:8080/api/v1/boards', signal: controller.signal }));

    return () => {
      controller.abort();
      console.log('req cancelled');
    };
  }, []);

  return (
    <div className='boards-explorer'>
      <Boards />
    </div>
  );
};

export default BoardsExplorer;
