import React from "react";
import * as Styled from "./Task.styles";

export interface TaskProps {
  issue: any;
}

export const Task: React.FC<TaskProps> = issue => {
  let today = new Date();
  let created = new Date(issue?.issue?.created_at);
  let days = Math.ceil(
    (today.getTime() - created.getTime()) / (1000 * 3600 * 24)
  );

  return (
    <Styled.Wrapper>
      <Styled.Title>{issue?.issue?.title}</Styled.Title>
      <Styled.Text>
        #{issue?.issue?.number} opened{" "}
        {days === 1 ? "today" : `${days} days ago`}
      </Styled.Text>
      <Styled.Text>
        {issue?.issue?.user?.login} |{" "}
        {!issue?.issue?.comments
          ? "No comments"
          : issue?.issue?.comments === 1
          ? `${issue?.issue?.comments} comment`
          : `${issue?.issue?.comments} comments`}
      </Styled.Text>
    </Styled.Wrapper>
  );
};
