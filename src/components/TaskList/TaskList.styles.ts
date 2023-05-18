import styled from "styled-components";

export const Wrapper = styled.div`
  flex-grow: 1;
  min-height: 100vh;
  padding: 20px;
  border-radius: 8px;
  -webkit-box-shadow: inset 0px 0px 6px 0px #000000;
  box-shadow: inset 0px 0px 6px 0px #000000;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Item = styled.li`
  display: block;
  padding: 10px;
  border-radius: 4px;
  -webkit-box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.5);
`;
