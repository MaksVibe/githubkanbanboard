/* eslint-disable eqeqeq */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.REACT_APP_ACCESS_TOKEN,
});

export const fetchRepo: any = createAsyncThunk(
  "fetchRepo",
  async (url: string, thunkAPI) => {
    const path = url.split("com").pop();
    localStorage.removeItem("rejected");

    try {
      const issues = await octokit.request(`GET /repos${path}/issues`);
      const { data } = await octokit.request(`GET /repos${path}`);
      const oldRepo = JSON.parse(`${localStorage.getItem(data.id)}`);

      // Filter doubling issues
      const filteredIssues = filterIssues(oldRepo, issues);

      // Store data in 1 object
      const currentRepo = {
        id: data.id,
        name: data.name,
        owner: data.owner.login,
        stars: data.stargazers_count,
        issues: oldRepo
          ? {
              toDo: [...filteredIssues],
              inProgress: oldRepo.issues.inProgress,
              done: oldRepo.issues.done,
            }
          : {
              toDo: issues.data,
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
    } catch ({ message }) {
      localStorage.setItem("rejected", JSON.stringify(true));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export interface Args {
  repo: {
    id: string;
    name: string;
    owner: string;
    stars: null;
    issues: { toDo: any[]; inProgress: any[]; done: any[] };
  };
  locate: Locate;
}

export interface Locate {
  from: { value: string };
  item: { id: string };
  to: string;
  onItem: string;
}

export interface Issues {
  toDo: any;
  inProgress: any;
  done: any;
}

// UPDATE
export const updateRepo: any = createAsyncThunk(
  "updateRepo",
  async (args: Args, thunkAPI) => {
    const issues = args.repo.issues;

    try {
      if (args.locate.from.value == args.locate.to) {
        const swapedIssues = swapTasks(issues, args.locate);
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
      const sortedIssues = sortIssues(issues, args.locate);

      const newRepo = {
        id: args.repo.id,
        name: args.repo.name,
        owner: args.repo.owner,
        stars: args.repo.stars,
        issues: sortedIssues,
      };

      localStorage.removeItem(args.repo.id);
      localStorage.setItem(args.repo.id, JSON.stringify(newRepo));
      return newRepo;
    } catch ({ message }) {
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// FILTER FOR FETCHING
const filterIssues = (repo: { issues: Issues }, issues: { data: any[] }) =>
  repo &&
  issues.data
    .filter((issue: { id: string }) => {
      let iss = repo.issues.inProgress.find(
        (iss: { id: string }) => iss.id == issue.id
      );

      return issue.id != (repo.issues.inProgress.id || (iss && iss.id));
    })
    .filter((issue: { id: string }) => {
      let iss = repo.issues.done.find(
        (iss: { id: string }) => iss.id == issue.id
      );

      return issue.id != (repo.issues.done.id || (iss && iss.id));
    });

// SORT ISSUES TO UPDATE REPO
const sortIssues = (issues: Issues, locate: Locate) => {
  const issueId = locate.item.id;
  const from = locate.from.value;
  const to = locate.to;

  const newIssues = {
    toDo: [...issues.toDo],
    inProgress: [...issues.inProgress],
    done: [...issues.done],
  };

  if (from == "inProgress" && to == "toDo") {
    const issue = issues.inProgress.find(
      (issue: { id: string }) => issue.id == issueId
    );
    newIssues.toDo = [issue, ...issues.toDo];
    issues.inProgress.length > 1
      ? (newIssues.inProgress = issues.inProgress.filter(
          (issue: { id: string }) => issue.id != issueId
        ))
      : (newIssues.inProgress = []);
  } else if (from == "done" && to == "toDo") {
    const issue = issues.done.find(
      (issue: { id: string }) => issue.id == issueId
    );
    newIssues.toDo = [issue, ...issues.toDo];
    issues.done.length > 1
      ? (newIssues.done = issues.done.filter(
          (issue: { id: string }) => issue.id != issueId
        ))
      : (newIssues.done = []);
  } else if (from == "toDo" && to == "inProgress") {
    const issue = issues.toDo.find(
      (issue: { id: string }) => issue.id == issueId
    );
    newIssues.inProgress = [issue, ...issues.inProgress];
    issues.toDo.length > 1
      ? (newIssues.toDo = issues.toDo.filter(
          (issue: { id: string }) => issue.id != issueId
        ))
      : (newIssues.toDo = []);
  } else if (from == "done" && to == "inProgress") {
    const issue = issues.done.find(
      (issue: { id: string }) => issue.id == issueId
    );
    newIssues.inProgress = [issue, ...issues.inProgress];
    issues.done.length > 1
      ? (newIssues.done = issues.done.filter(
          (issue: { id: string }) => issue.id != issueId
        ))
      : (newIssues.done = []);
  } else if (from == "toDo" && to == "done") {
    const issue = issues.toDo.find(
      (issue: { id: string }) => issue.id == issueId
    );
    newIssues.done = [issue, ...issues.done];
    issues.toDo.length > 1
      ? (newIssues.toDo = issues.toDo.filter(
          (issue: { id: string }) => issue.id != issueId
        ))
      : (newIssues.toDo = []);
  } else if (from == "inProgress" && to == "done") {
    const issue = issues.inProgress.find(
      (issue: { id: string }) => issue.id == issueId
    );
    newIssues.done = [issue, ...issues.done];
    issues.inProgress.length > 1
      ? (newIssues.inProgress = issues.inProgress.filter(
          (issue: { id: string }) => issue.id != issueId
        ))
      : (newIssues.inProgress = []);
  }

  return newIssues;
};

const swapTasks = (issues: Issues, locate: Locate) => {
  let a;
  let b;

  let arr: any =
    (locate.to == "toDo" && [...issues.toDo]) ||
    (locate.to == "inProgress" && [...issues.inProgress]) ||
    (locate.to == "done" && [...issues.done]);

  if (locate.from.value == locate.to) {
    a = arr.indexOf(arr.find((i: { id: any }) => i.id == locate.item.id));
    b = arr.indexOf(arr.find((i: { id: any }) => i.id == locate.onItem));
    arr[a] = arr.splice(b, 1, arr[a])[0];
  }

  return {
    toDo: locate.to == "toDo" ? [...arr] : [...issues.toDo],
    inProgress: locate.to == "inProgress" ? [...arr] : [...issues.inProgress],
    done: locate.to == "done" ? [...arr] : [...issues.done],
  };
};
