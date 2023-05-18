import React from "react";
import * as Styled from "./Breadcrumbs.styles";
import { FaStar, FaAngleRight } from "react-icons/fa";

export interface BreadcrumbsProps {
  repo: {
    name: string;
    owner: string;
    stars: number;
  };
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ repo }) => {
  return (
    <Styled.Wrapper>
      <Styled.Text href={`https://github.com/${repo.owner}`}>
        {repo.owner}
      </Styled.Text>
      <FaAngleRight color="blue" />
      <Styled.Text href={`https://github.com/${repo.owner}/${repo.name}`}>
        {repo.name}
      </Styled.Text>
      <Styled.StarsWrapper>
        <Styled.Star>
          <FaStar />
        </Styled.Star>
        {repo.stars > 999999
          ? `${repo.stars.toString().slice(0, 6)} M `
          : repo.stars > 999
          ? `${repo.stars.toString().slice(0, 3)} K `
          : `${repo.stars} `}
        stars
      </Styled.StarsWrapper>
    </Styled.Wrapper>
  );
};
