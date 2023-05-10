import React, { useState } from "react";
import * as Styled from "./Input.styles";

export interface InputProps {}

export const Input: React.FC<InputProps> = () => {
  const [value, setValue] = useState<string>("");

  return (
    <Styled.Wrapper>
      <Styled.From
        onSubmit={e => {
          e.preventDefault();
          console.log("Yuupiii!");
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
