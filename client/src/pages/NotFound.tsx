import React from "react";
import styled from "styled-components";

const Message = styled.div`
  color: ${(props) => props.theme.colors.font};
  padding-top: 100px;
  font-size: 35px;
  text-align: center;
`;

const NotFound = () => {
  return <Message>Страница не найдена 😕</Message>;
};

export default NotFound;
