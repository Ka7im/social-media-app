import styled from 'styled-components';
import Modal from './Modal';
import { Button } from './Button';
import { useState } from 'react';
import { $authHost } from '../axios/axios';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../redux/redux-hook';
import { updateUserInfo } from '../redux/slices/authSlice/authSlice';
import { uploadFile } from '../utils/api/uploadFile';

const ModalTitle = styled.div`
    color: ${(props) => props.theme.colors.font};
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    padding: 20px;
`;

const ModalInput = styled.input`
    border: 1px solid ${(props) => props.theme.colors.border};
    outline: none;
    background-color: transparent;
    border-radius: 12px;
    color: ${(props) => props.theme.colors.font};
    padding: 5px 10px;
    margin: 10px 20px;
    width: 80%;
`;

const ModalButton = styled.div`
    margin-top: 10px;
    margin-left: 40%;
    margin-bottom: 20px;
`;

const FileInput = styled.input`
    padding: 20px;
    color: ${(props) => props.theme.colors.font};
`;

type UserInfoEditModalProps = {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserInfoEditModal = ({
    isActive,
    setIsActive,
}: UserInfoEditModalProps) => {
    const [userData, setUserData] = useState<{
        birthday: string;
        city: string;
        education: string;
        familyStatus: string;
    }>({
        birthday: '',
        city: '',
        education: '',
        familyStatus: '',
    });
    const [image, setImage] = useState<File | null | undefined>(null);
    const dispatch = useAppDispatch();
    const { id } = useParams();

    async function handleClick() {
        if (image) {
            const data = uploadFile(image);

            dispatch(
                updateUserInfo({ id, ...userData, avatarUrl: (await data).url })
            );
            setIsActive(false);
            setUserData({
                birthday: '',
                city: '',
                education: '',
                familyStatus: '',
            });
            setImage(null);
        } else {
            console.log('Выберите изображение');
        }
    }

    return (
        <Modal isActive={isActive} setIsActive={setIsActive}>
            <>
                <ModalTitle>Редактирование</ModalTitle>
                <FileInput
                    type='file'
                    onChange={(e) => {
                        setImage(e.target.files?.item(0));
                    }}
                />
                <ModalInput
                    placeholder='День рождения'
                    value={userData.birthday}
                    onChange={(e) => {
                        const birthday = e.target.value;

                        setUserData((prev) => {
                            return { ...prev, birthday };
                        });
                    }}
                />
                <ModalInput
                    placeholder='Город'
                    value={userData.city}
                    onChange={(e) => {
                        const city = e.target.value;

                        setUserData((prev) => {
                            return { ...prev, city };
                        });
                    }}
                />
                <ModalInput
                    placeholder='Образование'
                    value={userData.education}
                    onChange={(e) => {
                        const education = e.target.value;

                        setUserData((prev) => {
                            return { ...prev, education };
                        });
                    }}
                />
                <ModalInput
                    placeholder='Семейный статус'
                    value={userData.familyStatus}
                    onChange={(e) => {
                        const familyStatus = e.target.value;

                        setUserData((prev) => {
                            return { ...prev, familyStatus };
                        });
                    }}
                />
                <ModalButton onClick={handleClick}>
                    <Button>Сохранить</Button>
                </ModalButton>
            </>
        </Modal>
    );
};

export default UserInfoEditModal;
