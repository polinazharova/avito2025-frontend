import { setOpen } from '../model/ModalSlice';
import { AppDispatch } from '../../../../app/store/store';

const handleModalOpen = (
  dispatch: AppDispatch,
  event: React.MouseEvent<HTMLButtonElement | HTMLDivElement | HTMLImageElement>,
) => {
  event.stopPropagation();
  dispatch(setOpen());
};

export default handleModalOpen;
