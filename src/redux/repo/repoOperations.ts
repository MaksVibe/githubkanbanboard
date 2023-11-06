import { createAsyncThunk } from '@reduxjs/toolkit';
import { Octokit } from 'octokit';

import { Issue } from '../../components/Task/Task';

export type Repo = {
  id: string;
  name: string;
  owner: string;
  stars: number;
  issues: {
    toDo: Issue[];
    inProgress: Issue[];
    done: Issue[];
  };
};

export type Args = {
  repo: Repo;
  locate: Locate;
};

type Locate = {
  from: { value: string };
  item: { id: number };
  to: string;
  onItem: number;
};

const octokit = new Octokit({
  auth: process.env.REACT_APP_ACCESS_TOKEN,
});

export const fetchRepo = createAsyncThunk<Repo, string>('fetchRepo', async (url, thunkAPI) => {
  const path = url.split('com').pop();
  localStorage.removeItem('rejected');

  try {
    const issuesResponse = await octokit.request(`GET /repos${path}/issues`);
    const repoResponse = await octokit.request(`GET /repos${path}`);
    const oldRepoJson = localStorage.getItem(repoResponse.data.id);
    const oldRepo = oldRepoJson ? JSON.parse(oldRepoJson) : null;

    // Filter doubling issues
    const filteredIssues = filterIssues(oldRepo, issuesResponse.data);

    // Store data in 1 object
    const currentRepo = {
      id: repoResponse.data.id,
      name: repoResponse.data.name,
      owner: repoResponse.data.owner.login,
      stars: repoResponse.data.stargazers_count,
      issues: oldRepo
        ? {
            toDo: [...filteredIssues],
            inProgress: oldRepo.issues.inProgress,
            done: oldRepo.issues.done,
          }
        : {
            toDo: issuesResponse.data,
            inProgress: [],
            done: [],
          },
    };

    // Check if local storage has fetched repo
    if (!oldRepo) {
      localStorage.setItem(currentRepo.id, JSON.stringify(currentRepo));
    }
    localStorage.setItem(currentRepo.id, JSON.stringify(currentRepo));

    return currentRepo;
  } catch (error: unknown) {
    console.error(error);
    localStorage.setItem('rejected', JSON.stringify(true));
    return thunkAPI.rejectWithValue('Something went wrong...');
  }
});

// UPDATE
export const updateRepo = createAsyncThunk<Repo, Args>('updateRepo', async (args, thunkAPI) => {
  try {
    if (args.locate.from.value == args.locate.to) {
      const swapedIssues = swapTasks(args.repo.issues, args.locate);
      const swapedRepo = {
        id: args.repo.id,
        name: args.repo.name,
        owner: args.repo.owner,
        stars: args.repo.stars,
        issues: swapedIssues,
      };

      localStorage.removeItem(args.repo.id);
      localStorage.setItem(args.repo.id, JSON.stringify(swapedRepo));
      return swapedRepo;
    }

    const sortedIssues = sortIssues(args.repo.issues, args.locate);

    const newRepo: Repo = {
      id: args.repo.id,
      name: args.repo.name,
      owner: args.repo.owner,
      stars: args.repo.stars,
      issues: sortedIssues,
    };

    localStorage.removeItem(args.repo.id);
    localStorage.setItem(args.repo.id, JSON.stringify(newRepo));
    return newRepo;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// FILTER FOR FETCHING
const filterIssues = (repo: Repo | null, issues: Issue[]) => {
  if (!repo) {
    return issues;
  }

  const inProgressIds = new Set(repo.issues.inProgress.map(issue => issue.id));
  const doneIds = new Set(repo.issues.done.map(issue => issue.id));

  return issues.filter(issue => !inProgressIds.has(issue.id) && !doneIds.has(issue.id));
};

// SORT ISSUES TO UPDATE REPO
const sortIssues = (issues: Repo['issues'], locate: Locate): Repo['issues'] => {
  const { from, to, item } = locate;

  const issueToMove = issues[from.value as keyof Repo['issues']].find(issue => issue.id === item.id);

  const updatedIssues = { ...issues };

  updatedIssues[from.value as keyof Repo['issues']] = updatedIssues[from.value as keyof Repo['issues']].filter(
    issue => issue.id !== item.id,
  );
  const issuesArray = [...updatedIssues[to as 'toDo' | 'inProgress' | 'done']];
  issuesArray.unshift(issueToMove as Issue);
  updatedIssues[to as 'toDo' | 'inProgress' | 'done'] = issuesArray;

  return updatedIssues;
};

const swapTasks = (issues: Repo['issues'], locate: Locate): Repo['issues'] => {
  const { from, to, item, onItem } = locate;
  const fromArray = issues[from.value as keyof Repo['issues']];
  const toArray = issues[to as keyof Repo['issues']];
  const itemIndex = fromArray.findIndex(issue => issue.id === item.id);
  const onItemIndex = fromArray.findIndex(issue => issue.id === onItem);

  if (itemIndex !== -1 && onItemIndex !== -1) {
    [fromArray[itemIndex], fromArray[onItemIndex]] = [fromArray[onItemIndex], fromArray[itemIndex]];
  }

  return { toDo: toArray, inProgress: fromArray, done: issues.done };
};
