import React, { useEffect } from "react";
import { Input } from "../components/Input/Input";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import * as Styled from "./LandingPage.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectRepo } from "../redux/selectors";
import { refresh } from "../redux/repoOperations";

interface LandingPageProps {}

export const LandingPage: React.FunctionComponent<LandingPageProps> = () => {
  const { currentRepo } = useSelector(selectRepo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh(currentRepo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styled.Wrapper>
      <Input />
      {currentRepo && <Breadcrumbs repo={currentRepo} />}
      <Styled.Item>Tasks</Styled.Item>
    </Styled.Wrapper>
  );
};
