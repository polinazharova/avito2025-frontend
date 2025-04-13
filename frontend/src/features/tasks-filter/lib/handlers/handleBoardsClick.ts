const handleBoardsClick = (event: React.MouseEvent): void => {
  event.stopPropagation();
  const container = document.getElementsByClassName('tasks-filter__boards')[0];
  if (container) {
    container.classList.toggle('tasks-filter__boards_hidden');
  }
};

export default handleBoardsClick;
