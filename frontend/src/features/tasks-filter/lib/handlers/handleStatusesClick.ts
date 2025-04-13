const handleStatusesClick = (event: React.MouseEvent): void => {
  event.stopPropagation();
  const container = document.getElementsByClassName('tasks-filter__statuses')[0];
  if (container) {
    container.classList.toggle('tasks-filter__statuses_hidden');
  }
};

export default handleStatusesClick;
