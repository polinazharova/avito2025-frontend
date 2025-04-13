import './Header.styles.scss';
import avitoTechLogo from '../../../assets/images/avito-tech-logo.png';
import Button from '../../../shared/ui/button/ui/Button';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Modal from '../../../shared/ui/modal/ui/Modal';
import TaskForm from '../../../features/task-form/ui/TaskForm';
import { useState } from 'react';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const currentLocation = useLocation();

  return (
    <header id='header'>
      <Modal
        isOpen={isModalOpen}
        handleClose={() => {
          setIsModalOpen(false);
        }}
      >
        <TaskForm />
      </Modal>
      <div
        className='header__info-comp'
        onClick={() => {
          location.href = '/issues';
        }}
      >
        <div className='header__logo-title-comp'>
          <img className='header__logo' src={avitoTechLogo} alt='Avito Tech logo' />
          <h1 className='header__title'>PMS Lite</h1>
        </div>
        <span className='header__text'>Project Management System</span>
      </div>
      <div className='header__actions-comp'>
        <nav id='header__navigation'>
          <Link
            className={`header__navigation-link${currentLocation.pathname === '/issues' ? ' header__navigation-link_focused' : ''}`}
            to='/issues'
          >
            Все задачи
          </Link>
          <Link
            className={`header__navigation-link${currentLocation.pathname === '/boards' ? ' header__navigation-link_focused' : ''}`}
            to='/boards'
          >
            Проекты
          </Link>
        </nav>
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className='header__create-task-btn'
          type='button'
        >
          Создать задачу
        </Button>
      </div>
    </header>
  );
};

export default Header;
