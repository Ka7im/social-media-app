import React, { useState } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import { MessageWrapper } from "./Message";
import { DialogAvatar, DialogUserName } from "./Dialog";
import { IUser } from "../types/User";
import { $authHost } from "../axios/axios";
import { BASE_URL } from "../utils/consts";

const ModalTitle = styled.div`
  color: ${(props) => props.theme.colors.font};
  padding: 20px 25px;

  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const ModalUserWrapper = styled(MessageWrapper)`
  padding: 20px 25px;
  align-items: center;
`;

const ModalInput = styled.textarea`
  height: 120px;
  width: 89%;
  margin: 0 25px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: transparent;
  outline: none;
  color: ${(props) => props.theme.colors.font};
  padding: 5px;
  resize: none;
`;

const ModalForm = styled.form``;

const ModalButton = styled.button`
  border-radius: 8px;
  backgroun-color: #fff;
  border: none;
  padding: 5px 10px;
  justify-self: flex-end;
  margin-left: 76%;
  margin-top: 20px;
  margin-bottom: 25px;
  cursor: pointer;
`;

type MessageModalProps = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | undefined;
};

const MessageModal = ({ isActive, setIsActive, user }: MessageModalProps) => {
  const [value, setValue] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = {
      message: value,
      to: user?._id.toString(),
    };

    await $authHost.post("/message", message);

    setValue("");
    setIsActive(false);
  };

  return (
    <Modal isActive={isActive} setIsActive={setIsActive}>
      <ModalForm onSubmit={onSubmit}>
        <ModalTitle>Новое сообщение</ModalTitle>
        <ModalUserWrapper>
          <DialogAvatar src={`${BASE_URL}${user?.avatarUrl}`} />
          <DialogUserName>{user?.fullName}</DialogUserName>
        </ModalUserWrapper>
        <ModalInput onChange={(e) => setValue(e.target.value)} value={value} />
        <ModalButton type="submit">Отправить</ModalButton>
      </ModalForm>
    </Modal>
  );
};

export default MessageModal;
