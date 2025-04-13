import './Board.styles.scss';
import projectIcon from '../../../assets/images/project-icon.png';
import clickIcon from '../../../assets/images/click-icon.png';
import { MouseEventHandler } from 'react';

interface BoardProps {
  board: {
    id: number;
    name: string;
  };
  mouseOver?: string | null | number;
  handleClick?: MouseEventHandler<HTMLElement>;
  handleMouseEnter?: MouseEventHandler<HTMLElement>;
  handleMouseLeave?: MouseEventHandler<HTMLElement>;
}

const Board: React.FC<BoardProps> = ({
  board,
  mouseOver = null,
  handleClick = () => {},
  handleMouseEnter = () => {},
  handleMouseLeave = () => {},
}: BoardProps) => {
  return (
    <div
      id={`${board.id}`}
      className='board'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className='board__container'>
        <span className='board__name'>{board.name}</span>
        <div className='board__comp'>
          <span className='board__id'>Проект №{board.id}</span>
          <img className='board__icon' src={projectIcon} alt='project icon from favicon' />
        </div>
      </div>
      {mouseOver == board.id ? (
        <div className='board__mouse-over-comp'>
          <span className='board__mouse-over-text'>Перейти на доску</span>
          <img className='board__mouse-over-icon' src={clickIcon} alt='click icon from favicon' />
        </div>
      ) : null}
    </div>
  );
};

export default Board;
