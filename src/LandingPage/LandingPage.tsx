import React from "react";
import { useSelector } from "react-redux";
import { selectRepo } from "../redux/selectors";

import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Columns } from "../components/Columns/Columns";
import { Input } from "../components/Input/Input";

import * as Styled from "./LandingPage.styles";

interface LandingPageProps {}

export const LandingPage: React.FunctionComponent<LandingPageProps> = () => {
  const repo = useSelector(selectRepo);

  return (
    <Styled.Wrapper>
      <Input />
      {repo.currentRepo && <Breadcrumbs repo={repo.currentRepo} />}
      <Columns />
    </Styled.Wrapper>
  );
};
