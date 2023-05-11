import { createAsyncThunk } from "@reduxjs/toolkit";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.REACT_APP_ACCESS_TOKEN,
});

export const fetchRepo: any = createAsyncThunk(
  "fetchRepo",
  async (url: string, thunkAPI) => {
    try {
      if (url.length < 1) return;
      const path = url.split("com").pop();
      const issues = await octokit.request(`GET /repos${path}/issues`);
      const { data } = await octokit.request(`GET /repos${path}`);

      // Store data in 1 object
      const currentRepo = {
        id: data.id,
        name: data.name,
        owner: data.owner.login,
        stars: data.stargazers_count,
        issues: issues.data,
      };

      // Check if local storage has fetched repo
      if (!localStorage.getItem(currentRepo.id)) {
        localStorage.setItem(data.id, JSON.stringify(currentRepo));
      }

      localStorage.removeItem("currentRepo");
      localStorage.setItem("currentRepo", JSON.stringify(currentRepo));

      // Parse data to get clear result from local storage
      const result = JSON.parse(`${localStorage.getItem(currentRepo.id)}`);

      return result;
    } catch ({ message }) {
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export interface Repo {
  id: string;
}

export const refresh: any = createAsyncThunk(
  "refresh",
  async (repo: Repo, thunkAPI) => {
    try {
      // Parse data to get clear result from local storage
      const result = JSON.parse(`${localStorage.getItem("currentRepo")}`);

      return result;
    } catch ({ message }) {
      return thunkAPI.rejectWithValue(message);
    }
  }
);
