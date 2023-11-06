import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchRepo } from '../../redux/repo/repoOperations';
import { AppDispatch } from '../../redux/store';
import * as Styled from './Input.styles';

export const Input: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const rejected = localStorage.getItem('rejected');

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch(fetchRepo(value));
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value);
  };

  return (
    <Styled.Wrapper>
      <p>Try with this example: https://github.com/facebook/react</p>
      <br />
      {rejected && (
        <p>
          <span style={{ color: 'red' }}>Sorry, there&apos;s no such repo.</span>
          <br />
          Try another url/repo or check the url
        </p>
      )}
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Input type={'url'} placeholder={'Enter repo URL'} value={value} onChange={handleChange} />
        <Styled.Button type={'submit'} disabled={value.length < 1 && true}>
          Load issues
        </Styled.Button>
      </Styled.Form>
    </Styled.Wrapper>
  );
};
