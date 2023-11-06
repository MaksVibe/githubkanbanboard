import React from 'react';

import * as Styled from './Task.styles';

export type Issue = {
  id: number;
  title: string;
  number: number;
  created_at: string;
  user: {
    login: string;
  };
  comments: number;
};

export const Task: React.FC<{ issue: Issue }> = ({ issue }) => {
  const today = new Date();
  const created = new Date(issue?.created_at);
  const days = Math.ceil((today.getTime() - created.getTime()) / (1000 * 3600 * 24));

  return (
    <Styled.Wrapper>
      <Styled.Title>{issue?.title}</Styled.Title>
      <Styled.Text>
        #{issue?.number} opened {days === 1 ? 'today' : `${days} days ago`}
      </Styled.Text>
      <Styled.Text>
        {issue?.user?.login} |{' '}
        {!issue?.comments
          ? 'No comments'
          : issue?.comments === 1
          ? `${issue?.comments} comment`
          : `${issue?.comments} comments`}
      </Styled.Text>
    </Styled.Wrapper>
  );
};
