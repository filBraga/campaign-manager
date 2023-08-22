import { toggleModal } from '@/app/redux/slice/modalSlice';
import { RootState } from '@/app/redux/store';
import React, { ReactNode } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

type CustomModalProps = {
    children: ReactNode;
    isOpen: boolean;
};

export const CustomModal: React.FC<CustomModalProps> = ({ children, isOpen }) => {
    const dispatch = useDispatch();
    const isModalOpen: Boolean = useSelector((state: RootState) => state.modal.open);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => dispatch(toggleModal())}
            contentLabel="Event Modal"
            // appElement={document.getElementById('__next') as HTMLElement}
            style={{
                overlay: {
                    zIndex: 1000, // set the zIndex higher
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // This is the key line
                },
                content: {
                    zIndex: 1000, // set the zIndex higher
                    height: 'auto', // set the height to auto
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                },
            }}
        >
            {children}
        </Modal>
    );
};
