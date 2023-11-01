import React from 'react';

import { TaskList } from '../TaskList/TaskList';
import * as Styled from './Columns.styles';

export const Columns: React.FC = () => {
  return (
    <Styled.Columns>
      <Styled.Column>
        <Styled.Title>ToDo</Styled.Title>
        <TaskList toDo />
      </Styled.Column>
      <Styled.Column>
        <Styled.Title>In Progress</Styled.Title>
        <TaskList inProgress />
      </Styled.Column>
      <Styled.Column>
        <Styled.Title>Done</Styled.Title>
        <TaskList done />
      </Styled.Column>
    </Styled.Columns>
  );
};
