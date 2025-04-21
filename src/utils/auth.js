"use client";
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("daily_planner_token");
  }
  return null;
};
export const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("daily_planner_token", token);
  }
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("daily_planner_token");
  }
};
