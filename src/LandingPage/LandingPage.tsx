import React from 'react';
import { useSelector } from 'react-redux';

import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { Columns } from '../components/Columns/Columns';
import { Input } from '../components/Input/Input';
import { selectRepo } from '../redux/selectors';
import * as Styled from './LandingPage.styles';

export const LandingPage: React.FunctionComponent = () => {
  const repo = useSelector(selectRepo);

  return (
    <Styled.Wrapper>
      <Input />
      {repo.currentRepo && <Breadcrumbs repo={repo.currentRepo} />}
      <Columns />
    </Styled.Wrapper>
  );
};
