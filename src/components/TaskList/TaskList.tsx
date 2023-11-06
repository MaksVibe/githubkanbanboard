import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dispatch } from '@reduxjs/toolkit';

import { getItem, getLocateFrom } from '../../redux/dnd/dndOperations';
import { updateRepo } from '../../redux/repo/repoOperations';
import { selectItem, selectLocateFrom, selectRepo } from '../../redux/selectors';
import { Task } from '../Task/Task';
import * as Styled from './TaskList.styles';

export interface TaskListProps {
  toDo?: boolean;
  inProgress?: boolean;
  done?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({ toDo, inProgress, done }) => {
  const [onItem, setOnItem] = useState('');
  const repo = useSelector(selectRepo);
  const locateFrom = useSelector(selectLocateFrom);
  const item = useSelector(selectItem);

  const onDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    const issueId = e.currentTarget.id;
    // getItem(issueId);
    // getLocateFrom((toDo && 'toDo') || (inProgress && 'inProgress') || (done && 'done'));
  };

  const onDragEnter = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    setOnItem(e.currentTarget.id);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // updateRepo({
    //   repo: repo.currentRepo,
    //   locate: {
    //     from: locateFrom,
    //     item,
    //     to: (toDo && 'toDo') || (inProgress && 'inProgress') || (done && 'done'),
    //     onItem,
    //   },
    // });
  };

  return (
    <Styled.Wrapper onDragOver={onDragOver} onDrop={onDrop}>
      {repo.currentRepo && (
        <Styled.List>
          {/*TODO TASK LIST */}
          {toDo && repo.currentRepo.issues.toDo
            ? repo.currentRepo.issues.toDo.map(({ id }: { id: string }) => (
                <Styled.Item key={id} id={id} draggable onDragStart={onDragStart} onDragEnter={onDragEnter}>
                  <Task issue={repo?.currentRepo?.issues?.toDo} />
                </Styled.Item>
              ))
            : toDo &&
              repo.currentRepo.issues.toDo &&
              repo.currentRepo.issues.toDo.map((issue: { id: string }) => (
                <Styled.Item key={issue.id} id={issue.id} draggable onDragStart={onDragStart} onDragEnter={onDragEnter}>
                  <Task issue={issue} />
                </Styled.Item>
              ))}
          {/*IN PROGRESS TASK LIST */}
          {inProgress && repo.currentRepo.issues.inProgress
            ? repo.currentRepo.issues.inProgress.map((issue: { id: string }) => (
                <Styled.Item key={issue.id} id={issue.id} draggable onDragStart={onDragStart} onDragEnter={onDragEnter}>
                  <Task issue={repo?.currentRepo?.issues?.inProgress} />
                </Styled.Item>
              ))
            : inProgress &&
              repo?.currentRepo?.issues?.inProgress &&
              repo?.currentRepo?.issues?.inProgress.map((issue: { id: string }) => (
                <Styled.Item key={issue.id} id={issue.id} draggable onDragStart={onDragStart} onDragEnter={onDragEnter}>
                  <Task issue={issue} />
                </Styled.Item>
              ))}
          {/*DONE TASK LIST */}
          {done && repo.currentRepo.issues.done
            ? repo.currentRepo.issues.done.map((issue: { id: string }) => (
                <Styled.Item key={issue.id} id={issue.id} draggable onDragStart={onDragStart} onDragEnter={onDragEnter}>
                  <Task issue={repo?.currentRepo?.issues?.done} />
                </Styled.Item>
              ))
            : done &&
              repo?.currentRepo?.issues?.done &&
              repo?.currentRepo?.issues?.done.map((issue: { id: string }) => (
                <Styled.Item key={issue.id} id={issue.id} draggable onDragStart={onDragStart} onDragEnter={onDragEnter}>
                  <Task issue={issue} />
                </Styled.Item>
              ))}
        </Styled.List>
      )}
    </Styled.Wrapper>
  );
};
