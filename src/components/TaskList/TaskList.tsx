import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItem, getLocateFrom } from "../../redux/dnd/dndOperations";
import { updateRepo } from "../../redux/repo/repoOperations";
import {
  selectItem,
  selectLocateFrom,
  selectRepo,
} from "../../redux/selectors";
import { Task } from "../Task/Task";
import * as Styled from "./TaskList.styles";

export interface TaskListProps {
  toDo?: boolean;
  inProgress?: boolean;
  done?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  toDo,
  inProgress,
  done,
}) => {
  const [onItem, setOnItem] = useState("");
  const dispatch = useDispatch();
  const repo = useSelector(selectRepo);
  const locateFrom = useSelector(selectLocateFrom);
  const item = useSelector(selectItem);

  const onDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    dispatch(getItem(e.currentTarget.id));
    dispatch(
      getLocateFrom(
        (toDo && "toDo") || (inProgress && "inProgress") || (done && "done")
      )
    );
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

    dispatch(
      updateRepo({
        repo: repo.currentRepo,
        locate: {
          from: locateFrom,
          item: item,
          to:
            (toDo && "toDo") ||
            (inProgress && "inProgress") ||
            (done && "done"),

          onItem,
        },
      })
    );
  };

  return (
    <Styled.Wrapper onDragOver={e => onDragOver(e)} onDrop={e => onDrop(e)}>
      {repo.currentRepo && (
        <Styled.List>
          {/*TODO TASK LIST */}
          {toDo && repo.currentRepo.issues.toDo.id ? (
            <Styled.Item
              key={`${repo?.currentRepo?.issues?.toDo.id}`}
              id={`${repo?.currentRepo?.issues?.toDo.id}`}
              draggable
              onDragStart={e => onDragStart(e)}
              onDragEnter={e => onDragEnter(e)}
            >
              <Task issue={repo?.currentRepo?.issues?.toDo} />
            </Styled.Item>
          ) : (
            toDo &&
            repo?.currentRepo?.issues?.toDo &&
            repo?.currentRepo?.issues?.toDo.map((issue: any) => (
              <Styled.Item
                key={`${issue.id}`}
                id={`${issue.id}`}
                draggable
                onDragStart={e => onDragStart(e)}
                onDragEnter={e => onDragEnter(e)}
              >
                <Task issue={issue} />
              </Styled.Item>
            ))
          )}
          {/*IN PROGRESS TASK LIST */}
          {inProgress && repo.currentRepo.issues.inProgress.id ? (
            <Styled.Item
              key={`${repo?.currentRepo?.issues?.inProgress?.id}`}
              id={`${repo?.currentRepo?.issues?.inProgress?.id}`}
              draggable
              onDragStart={e => onDragStart(e)}
              onDragEnter={e => onDragEnter(e)}
            >
              <Task issue={repo?.currentRepo?.issues?.inProgress} />
            </Styled.Item>
          ) : (
            inProgress &&
            repo?.currentRepo?.issues?.inProgress &&
            repo?.currentRepo?.issues?.inProgress.map((issue: any) => (
              <Styled.Item
                key={`${issue.id}`}
                id={`${issue.id}`}
                draggable
                onDragStart={e => onDragStart(e)}
                onDragEnter={e => onDragEnter(e)}
              >
                <Task issue={issue} />
              </Styled.Item>
            ))
          )}
          {/*DONE TASK LIST */}
          {done && repo.currentRepo.issues.done.id ? (
            <Styled.Item
              key={`${repo?.currentRepo?.issues?.done.id}`}
              id={`${repo?.currentRepo?.issues?.done.id}`}
              draggable
              onDragStart={e => onDragStart(e)}
              onDragEnter={e => onDragEnter(e)}
            >
              <Task issue={repo?.currentRepo?.issues?.done} />
            </Styled.Item>
          ) : (
            done &&
            repo?.currentRepo?.issues?.done &&
            repo?.currentRepo?.issues?.done.map((issue: any) => (
              <Styled.Item
                key={`${issue.id}`}
                id={`${issue.id}`}
                draggable
                onDragStart={e => onDragStart(e)}
                onDragEnter={e => onDragEnter(e)}
              >
                <Task issue={issue} />
              </Styled.Item>
            ))
          )}
        </Styled.List>
      )}
    </Styled.Wrapper>
  );
};
