import {
  GET_JOBS,
  SEARCH_JOBS,
  FILTER_JOB_TYPE,
  FILTER_JOB_DEPARTMENT,
  FILTER_WORK_SCHEDULE,
  FILTER_EXPERIENCE,
  SORT_JOBS_BY_LOCATION,
  SORT_JOBS_BY_ROLE,
  SORT_JOBS_BY_DEPARTMENT,
  SORT_JOBS_BY_EDUCATION,
  SORT_JOBS_BY_EXPERIENCE,
} from "./actions";

const initialState = {
  jobs: [],
  allTheJobs: [],
  filteredJobs: [],
  jobsForFilters: [],
};

export default function rootReducer(state = initialState, action) {
  const filteredJobsDale = state.filteredJobs;
  switch (action.type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        allTheJobs: action.payload,
        filteredJobs: action.payload,
        jobsForFilters: action.payload,
      };
    case SEARCH_JOBS:
      // job title keywords company
      // job_title type department job_type work_schedule name
      console.log(action.payload);
      for (let i = 0; i < filteredJobsDale.jobs.length; i++) {
        for (let j = filteredJobsDale.jobs[i].items.length - 1; j >= 0; j--) {
          if (
            filteredJobsDale.jobs[i].items[j].job_title
              .toLowerCase()
              .includes(action.payload.toLowerCase())
            //job_title
          ) {
          } else if (
            filteredJobsDale.jobs[i].items[j].job_type
              .toLowerCase()
              .includes(action.payload.toLowerCase())
            //job_type
          ) {
          } else if (
            filteredJobsDale.jobs[i].items[j].department
              .join("~")
              .toLowerCase()
              .includes(action.payload.toLowerCase())
            //department
          ) {
          } else if (
            filteredJobsDale.jobs[i].items[j].work_schedule
              .toLowerCase()
              .includes(action.payload.toLowerCase())
            //work_schedule
          ) {
          } else if (
            filteredJobsDale.jobs[i].items[j].name
              .toLowerCase()
              .includes(action.payload.toLowerCase())
            //name
          ) {
          } else {
            filteredJobsDale.jobs[i].items.splice(j, 1);
          }
        }
      }
      return {
        ...state,
      };
    case FILTER_JOB_TYPE:
      for (let i = 0; i < filteredJobsDale.jobs.length; i++) {
        for (let j = filteredJobsDale.jobs[i].items.length - 1; j >= 0; j--) {
          if (filteredJobsDale.jobs[i].items[j].job_type === action.payload) {
          } else {
            filteredJobsDale.jobs[i].items.splice(j, 1);
          }
        }
      }
      return { ...state };
    case FILTER_JOB_DEPARTMENT:
      for (let i = 0; i < filteredJobsDale.jobs.length; i++) {
        for (let j = filteredJobsDale.jobs[i].items.length - 1; j >= 0; j--) {
          if (
            filteredJobsDale.jobs[i].items[j].department.includes(
              action.payload
            )
          ) {
          } else {
            filteredJobsDale.jobs[i].items.splice(j, 1);
          }
        }
      }
      return {
        ...state,
      };
    case FILTER_WORK_SCHEDULE:
      for (let i = 0; i < filteredJobsDale.jobs.length; i++) {
        for (let j = filteredJobsDale.jobs[i].items.length - 1; j >= 0; j--) {
          if (
            filteredJobsDale.jobs[i].items[j].work_schedule === action.payload
          ) {
          } else {
            filteredJobsDale.jobs[i].items.splice(j, 1);
          }
        }
      }
      return {
        ...state,
      };
    case FILTER_EXPERIENCE:
      for (let i = 0; i < filteredJobsDale.jobs.length; i++) {
        for (let j = filteredJobsDale.jobs[i].items.length - 1; j >= 0; j--) {
          if (filteredJobsDale.jobs[i].items[j].experience === action.payload) {
          } else {
            filteredJobsDale.jobs[i].items.splice(j, 1);
          }
        }
      }
      return {
        ...state,
      };
    case SORT_JOBS_BY_LOCATION:
      for (let i = 0; i < filteredJobsDale.jobs.length; i++) {
        for (let j = filteredJobsDale.jobs[i].items.length - 1; j >= 0; j--) {
          if (action.payload === "asc") {
            filteredJobsDale.jobs.sort((a, b) => a.name.localeCompare(b.name));
          } else {
            filteredJobsDale.jobs.sort((a, b) => b.name.localeCompare(a.name));
          }
        }
      }
      return {
        ...state,
      };
    case SORT_JOBS_BY_ROLE:
      for (let i = 0; i < filteredJobsDale.jobs.length; i++) {
        for (let j = filteredJobsDale.jobs[i].items.length - 1; j >= 0; j--) {
          if (action.payload === "asc") {
            filteredJobsDale.jobs[i].items.sort((a, b) =>
              a.job_title.localeCompare(b.job_title)
            );
          } else {
            filteredJobsDale.jobs.sort((a, b) =>
              b.job_title.localeCompare(a.job_title)
            );
          }
        }
      }
      return {
        ...state,
      };
    case SORT_JOBS_BY_DEPARTMENT:
      for (let i = 0; i < filteredJobsDale.jobs.length; i++) {
        for (let j = filteredJobsDale.jobs[i].items.length - 1; j >= 0; j--) {
          for (
            let k = 0;
            k < filteredJobsDale.jobs[i].items[j].department.length;
            k++
          ) {
            if (action.payload === "asc") {
              filteredJobsDale.jobs[i].items[j].department.sort((a, b) =>
                a.localeCompare(b)
              );
            } else {
              filteredJobsDale.jobs[i].items[j].department.sort((a, b) =>
                b.localeCompare(a)
              );
            }
          }
        }
      }
      return {
        ...state,
      };
    case SORT_JOBS_BY_EDUCATION:
      for (let i = 0; i < filteredJobsDale.jobs.length; i++) {
        for (let j = filteredJobsDale.jobs[i].items.length - 1; j >= 0; j--) {
          for (
            let k = 0;
            k < filteredJobsDale.jobs[i].items[j].required_skills.length;
            k++
          ) {
            if (action.payload === "asc") {
              filteredJobsDale.jobs[i].items[j].required_skills.sort((a, b) =>
                a.localeCompare(b)
              );
            } else {
              filteredJobsDale.jobs[i].items[j].required_skills.sort((a, b) =>
                b.localeCompare(a)
              );
            }
          }
        }
      }
      return {
        ...state,
      };
    case SORT_JOBS_BY_EXPERIENCE:
      for (let i = 0; i < filteredJobsDale.jobs.length; i++) {
        for (let j = filteredJobsDale.jobs[i].items.length - 1; j >= 0; j--) {
          console.log(filteredJobsDale.jobs);
          if (action.payload === "asc") {
            filteredJobsDale.jobs[i].items.sort((a, b) =>
              a.experience.localeCompare(b.experience)
            );
          } else {
            filteredJobsDale.jobs.sort((a, b) =>
              b.experience.localeCompare(a.experience)
            );
          }
        }
      }
      return {
        ...state,
      };
    default:
      return state;
  }
}
