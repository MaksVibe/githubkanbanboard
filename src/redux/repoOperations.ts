import { createAsyncThunk } from "@reduxjs/toolkit";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.REACT_APP_ACCESS_TOKEN,
});

export const fetchRepo: any = createAsyncThunk(
  "photos",
  async (url: string, thunkAPI) => {
    try {
      if (url.length < 1) return false;
      const path = url.split("com").pop();
      const issues = await octokit.request(`GET /repos${path}/issues`);
      const repo = await octokit.request(`GET /repos${path}`);

      // Store data in 1 object
      const currentRepo = {
        id: repo.data.id,
        name: repo.data.name,
        owner: repo.data.owner.login,
        stars: repo.data.stargazers_count,
        issues: issues.data,
      };

      // Check if local storage has fetched repo
      if (!localStorage.getItem(currentRepo.id)) {
        localStorage.setItem(repo.data.id, JSON.stringify(currentRepo));
      }

      // Parse data to get clear result
      const result = JSON.parse(
        `${localStorage.getItem(currentRepo.id.toString())}`
      );

      return result;
    } catch ({ message }) {
      return thunkAPI.rejectWithValue(message);
    }
  }
);
