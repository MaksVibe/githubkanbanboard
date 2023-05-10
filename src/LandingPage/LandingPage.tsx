import React from "react";
import { Input } from "../components/Input/Input";
import * as Styled from "./LandingPage.styles";

interface LandingPageProps {}

export const LandingPage: React.FunctionComponent<LandingPageProps> = () => {
  return (
    <Styled.Wrapper>
      <Input />
      <Styled.List>
        <Styled.Item>Breadcrumbs</Styled.Item>
        <Styled.Item>Tasks</Styled.Item>
      </Styled.List>
    </Styled.Wrapper>
  );
};
