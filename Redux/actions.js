import axios from "axios";

//--------------Types----------------

export const GET_JOBS = "GET_JOBS";
export const SEARCH_JOBS = "SEARCH_JOBS";
export const FILTER_JOB_TYPE = "FILTER_JOB_TYPE";
export const FILTER_JOB_DEPARTMENT = "FILTER_JOB_DEPARTMENT";
export const FILTER_WORK_SCHEDULE = "FILTER_WORK_SCHEDULE";
export const FILTER_EXPERIENCE = "FILTER_EXPERIENCE";
export const SORT_JOBS_BY_LOCATION = "SORT_JOBS_BY_LOCATION";
export const SORT_JOBS_BY_ROLE = "SORT_JOBS_BY_ROLE";
export const SORT_JOBS_BY_DEPARTMENT = "SORT_JOBS_BY_DEPARTMENT";
export const SORT_JOBS_BY_EDUCATION = "SORT_JOBS_BY_EDUCATION";
export const SORT_JOBS_BY_EXPERIENCE = "SORT_JOBS_BY_EXPERIENCE";

//--------------Actions----------------

export function getJobs() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/api/jobs");
      return dispatch({
        type: GET_JOBS,
        payload: response.data,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error:", error.message);
      }
    }
  };
}

export function searchJobs(input) {
  return { type: SEARCH_JOBS, payload: input };
}

export function filterJobType(jobType) {
  return { type: FILTER_JOB_TYPE, payload: jobType };
}

export function filterJobDepartment(jobDepartment) {
  return { type: FILTER_JOB_DEPARTMENT, payload: jobDepartment };
}

export function filterWorkSchedule(workSchedule) {
  return { type: FILTER_WORK_SCHEDULE, payload: workSchedule };
}

export function filterExperience(experience) {
  return { type: FILTER_EXPERIENCE, payload: experience };
}

export function sortJobsByLocation(jobByLocation) {
  return { type: SORT_JOBS_BY_LOCATION, payload: jobByLocation };
}

export function sortJobsByRole(jobByRole) {
  return { type: SORT_JOBS_BY_ROLE, payload: jobByRole };
}

export function sortJobsByDepartment(jobByDepartment) {
  return { type: SORT_JOBS_BY_DEPARTMENT, payload: jobByDepartment };
}

export function sortJobsByEducation(jobByEducation) {
  return { type: SORT_JOBS_BY_EDUCATION, payload: jobByEducation };
}

export function sortJobsByExperience(jobByExperience) {
  return { type: SORT_JOBS_BY_EXPERIENCE, payload: jobByExperience };
}
