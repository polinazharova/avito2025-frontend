import React from 'react';
import { setClose } from '../model/ModalSlice';
import { AppDispatch } from '../../../../app/store/store';

const handleModalClose = (
  dispatch: AppDispatch,
  event: React.MouseEvent<HTMLButtonElement | HTMLDivElement | HTMLDivElement>,
) => {
  event.stopPropagation();
  dispatch(setClose());
};

export default handleModalClose;
