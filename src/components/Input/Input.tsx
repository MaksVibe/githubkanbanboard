import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRepo } from "../../redux/repoOperations";
import * as Styled from "./Input.styles";

export interface InputProps {}

export const Input: React.FC<InputProps> = () => {
  const [value, setValue] = useState<string>("");
  const dispatch = useDispatch();

  return (
    <Styled.Wrapper>
      <p>https://github.com/facebook/react</p>
      <Styled.From
        onSubmit={e => {
          e.preventDefault();
          dispatch(fetchRepo(value));
        }}
      >
        <Styled.Input
          type={"url"}
          placeholder={"Enter repo URL"}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Styled.Button type={"submit"}>Load issues</Styled.Button>
      </Styled.From>
    </Styled.Wrapper>
  );
};
