const handleIconClick = (event: React.MouseEvent): void => {
  event.stopPropagation();
  const container = document.getElementsByClassName('tasks-filter__selector')[0];
  if (container) {
    console.log('her');
    container.classList.toggle('tasks-filter__selector_hidden');
  }
};

export default handleIconClick;
