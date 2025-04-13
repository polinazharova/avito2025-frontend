import './Boards.styles.scss';
import { useAppSelector } from '../../../app/store/storeHooks';
import Board from '../../../entities/board/ui/Board';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Boards: React.FC = () => {
  const { boards, status, error } = useAppSelector((state) => state.boards.boards);
  const [mouseOver, setMouseOver] = useState<string | null>(null);
  const navigate = useNavigate();

  if (error) {
    return <div className='boards'>{error}</div>;
  }

  if (status === 'loading') {
    return <div className='boards'>Загрузка...</div>;
  }

  const handleClick = (event: React.MouseEvent): void => {
    const id = event.currentTarget.id;
    navigate('/board/' + id);
  };

  const handleMouseEnter = (event: React.MouseEvent): void => {
    const id = event.currentTarget.id;
    setMouseOver(id);
  };

  const handleMouseLeave = (): void => {
    setMouseOver(null);
  };

  return (
    <div className='boards'>
      {boards?.map((board) => (
        <Board
          key={board.id}
          mouseOver={mouseOver}
          handleClick={handleClick}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          board={board}
        />
      ))}
    </div>
  );
};

export default Boards;
