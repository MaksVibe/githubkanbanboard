import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { getItem, getLocateFrom } from '../../redux/dnd/dndOperations';
import { updateRepo } from '../../redux/repo/repoOperations';
import { defaultRepo } from '../../redux/repo/repoSlice';
import { selectItem, selectLocateFrom, selectRepo } from '../../redux/selectors';
import { AppDispatch, useAppDispatch } from '../../redux/store';
import { Issue, Task } from '../Task/Task';
import * as Styled from './TaskList.styles';

export interface TaskListProps {
  currentColumn: string;
}

export const TaskList: React.FC<TaskListProps> = ({ currentColumn }) => {
  const [onItem, setOnItem] = useState(0);
  const repo = useSelector(selectRepo);
  const locateFrom = useSelector(selectLocateFrom);
  const item = useSelector(selectItem);

  const dispatch: AppDispatch = useAppDispatch();

  const onDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    const issueId = e.currentTarget.id;
    dispatch(getItem(+issueId));
    dispatch(getLocateFrom(currentColumn));
  };

  const onDragEnter = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    const issueId = e.currentTarget.id;
    setOnItem(+issueId);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    dispatch(
      updateRepo({
        repo: repo.currentRepo || defaultRepo,
        locate: {
          from: locateFrom,
          item,
          to: currentColumn,
          onItem,
        },
      }),
    );
  };

  return (
    <Styled.Wrapper onDragOver={onDragOver} onDrop={onDrop}>
      {repo.currentRepo && (
        <Styled.List>
          {/*TODO TASK LIST */}
          {currentColumn === 'toDo' &&
            repo.currentRepo.issues.toDo &&
            repo.currentRepo.issues.toDo.map((issue: Issue) => (
              <Styled.Item
                key={issue.id}
                id={issue.id.toString()}
                draggable
                onDragStart={onDragStart}
                onDragEnter={onDragEnter}
              >
                <Task issue={issue} />
              </Styled.Item>
            ))}
          {/*IN PROGRESS TASK LIST */}
          {currentColumn === 'inProgress' &&
            repo.currentRepo.issues.inProgress &&
            repo.currentRepo.issues.inProgress.map((issue: Issue) => (
              <Styled.Item
                key={issue.id}
                id={issue.id.toString()}
                draggable
                onDragStart={onDragStart}
                onDragEnter={onDragEnter}
              >
                <Task issue={issue} />
              </Styled.Item>
            ))}
          {/*DONE TASK LIST */}
          {currentColumn === 'done' &&
            repo.currentRepo.issues.done &&
            repo.currentRepo.issues.done.map((issue: Issue) => (
              <Styled.Item
                key={issue.id}
                id={issue.id.toString()}
                draggable
                onDragStart={onDragStart}
                onDragEnter={onDragEnter}
              >
                <Task issue={issue} />
              </Styled.Item>
            ))}
        </Styled.List>
      )}
    </Styled.Wrapper>
  );
};
