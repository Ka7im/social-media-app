import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface IModalWrapper {
    isActive: boolean;
}

const ModalWrapper = styled.div<IModalWrapper>`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
    z-index: 11;

    ${(props) => {
        if (props.isActive) {
            return 'opacity: 1;';
        } else {
            return 'opacity: 0; pointer-events: none;';
        }
    }};
`;

interface IModalContent {
    isActive: boolean;
}
const ModalContent = styled.div<IModalContent>`
    border-radius: 12px;
    background-color: ${(props) => props.theme.colors.componentBg};
    width: 30vw;
    transform ${(props) => (props.isActive ? 'scale(1)' : 'scale(0.5)')}
`;

type ModalProps = {
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
    children?: JSX.Element;
};

const Modal = ({ isActive, setIsActive, children }: ModalProps) => {
    return (
        <ModalWrapper onClick={() => setIsActive(false)} isActive={isActive}>
            <ModalContent
                onClick={(e) => e.stopPropagation()}
                isActive={isActive}
            >
                {children}
            </ModalContent>
        </ModalWrapper>
    );
};

export default Modal;
