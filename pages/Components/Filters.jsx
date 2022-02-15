import React, { useState, useEffect } from "react";
import styles from "../CSS/Filters.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobs,
  filterJobType,
  filterJobDepartment,
  filterWorkSchedule,
  filterExperience,
} from "../../Redux/actions";

export default function Filters() {
  const dispatch = useDispatch();
  const trabajos = useSelector((state) => state.filteredJobs);
  const todosJobs = trabajos.jobs;
  const [showMore, setShowMore] = useState(false);

  function getDataFilters(filtro) {
    let Types = [];
    let Counts = [];
    if (filtro === "jobType") {
      for (let i = 0; i < todosJobs.length; i++) {
        for (let j = 0; j < todosJobs[i].items.length; j++) {
          Types.push(todosJobs[i].items[j].job_type);
        }
      }
    } else if (filtro === "department") {
      for (let i = 0; i < todosJobs.length; i++) {
        for (let j = 0; j < todosJobs[i].items.length; j++) {
          for (let k = 0; k < todosJobs[i].items[j].department.length; k++) {
            Types.push(todosJobs[i].items[j].department[k]);
          }
        }
      }
    } else if (filtro === "workSchedule") {
      for (let i = 0; i < todosJobs.length; i++) {
        for (let j = 0; j < todosJobs[i].items.length; j++) {
          Types.push(todosJobs[i].items[j].work_schedule);
        }
      }
    } else if (filtro === "experience") {
      for (let i = 0; i < todosJobs.length; i++) {
        for (let j = 0; j < todosJobs[i].items.length; j++) {
          Types.push(todosJobs[i].items[j].experience);
        }
      }
    } else {
      return false;
    }

    for (const num of Types) {
      Counts[num] = Counts[num] ? Counts[num] + 1 : 1;
    }

    let data = [];
    for (const key in Counts) {
      data.push({
        name: key,
        value: Counts[key],
      });
    }

    data.sort((a, b) => b.value - a.value);
    return data;
  }

  const jobType = trabajos && todosJobs && getDataFilters("jobType");
  const department = trabajos && todosJobs && getDataFilters("department");
  const workSchedule = trabajos && todosJobs && getDataFilters("workSchedule");
  const experience = trabajos && todosJobs && getDataFilters("experience");

  function handleReset(e) {
    e.preventDefault();
    dispatch(getJobs());
    // dispatch(filterGnomesByProfession("All"));
    // let options = document.querySelectorAll(".filtersoption");
    // for (let i = 0, l = options.length; i < l; i++) {
    //   options[i].selected = options[i].defaultSelected;
    // }
    // document.getElementById("minage").value = "";
    // document.getElementById("maxage").value = "";
    // document.getElementById("minweight").value = "";
    // document.getElementById("maxweight").value = "";
    // document.getElementById("minheight").value = "";
    // document.getElementById("maxheight").value = "";
    // paginado(1);
  }

  function handleFilterJobType(event) {
    event.preventDefault();
    dispatch(filterJobType(event.target.value));
  }

  function handleFilterDepartment(event) {
    event.preventDefault();
  }

  function handleFilterWorkSchedule(event) {
    event.preventDefault();
  }

  function handleFilterExperience(event) {
    event.preventDefault();
  }

  function handleShowMore() {
    setShowMore(!showMore);
  }

  return (
    <div className={styles.Filters}>
      <div className={styles.filtersordena}>
        <div className={styles.filterseachfilter}>
          <p className={styles.filtersfilter}>JOB TYPE</p>
          {todosJobs && todosJobs.length && jobType ? (
            jobType.map((jobtype) => {
              return (
                <div className={styles.eachBreakdown} key={jobtype.name}>
                  <button
                    className={styles.filtersoption}
                    value={jobtype.name}
                    onClick={(e) => handleFilterJobType(e)}
                  >
                    {jobtype.name}
                  </button>
                  <div className={styles.eachCount}>&ensp;{jobtype.value}</div>
                </div>
              );
            })
          ) : (
            <div className={styles.loading}>Loading...</div>
          )}
        </div>

        <div className={styles.filterseachfilter}>
          <p className={styles.filtersfilter}>DEPARTMENT</p>
          {todosJobs && todosJobs.length && department ? (
            <div>
              {department.map((dep, index) => {
                if (index < 10) {
                  return (
                    <div className={styles.eachBreakdown} key={dep.name}>
                      <button
                        className={styles.filtersoption}
                        value={dep.name}
                        onClick={(e) => handleFilterDepartment(e)}
                      >
                        {dep.name}
                      </button>
                      <div className={styles.eachCount}>&ensp;{dep.value}</div>
                    </div>
                  );
                }
              })}
              {!showMore ? (
                ""
              ) : (
                <div className={styles.eachBreakdownModal}>
                  <div className={styles.TitleModal}>
                    <p className={styles.filtersfilterModal}>department</p>
                    <button
                      onClick={() => handleShowMore()}
                      className={styles.buttonModal}
                    >
                      X
                    </button>
                  </div>
                  <div className={styles.eachDepartmentModal}>
                    {department.map((dep) => {
                      return (
                        <>
                          <div className={styles.specModal} key={dep.name}>
                            <button
                              className={styles.filtersoption}
                              value={dep.name}
                              onClick={(e) => handleFilterDepartment(e)}
                            >
                              {dep.name}
                            </button>
                            <div className={styles.eachCount}>
                              &ensp;{dep.value}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              )}
              <button
                id="show-more"
                className={styles.showMore}
                onClick={() => handleShowMore()}
              >
                Show more
              </button>
            </div>
          ) : (
            <>
              <div className={styles.loading}>Loading...</div>
            </>
          )}
        </div>

        <div className={styles.filterseachfilter}>
          <p className={styles.filtersfilter}>WORK SCHEDULE</p>
          {todosJobs && todosJobs.length && workSchedule ? (
            workSchedule.map((woSch) => {
              return (
                <div className={styles.eachBreakdown} key={woSch.name}>
                  <button
                    className={styles.filtersoption}
                    value={woSch.name}
                    onClick={(e) => handleFilterWorkSchedule(e)}
                  >
                    {woSch.name}
                  </button>
                  <div className={styles.eachCount}>&ensp;{woSch.value}</div>
                </div>
              );
            })
          ) : (
            <div className={styles.loading}>Loading</div>
          )}
        </div>

        <div className={styles.filterseachfilter}>
          <p className={styles.filtersfilter}>EXPERIENCE</p>
          {todosJobs && todosJobs.length && experience ? (
            experience.map((exp) => {
              return (
                <div className={styles.eachBreakdown} key={exp.name}>
                  <button
                    className={styles.filtersoption}
                    value={exp.name}
                    onClick={(e) => handleFilterExperience(e)}
                  >
                    {exp.name}
                  </button>
                  <div className={styles.eachCount}>&ensp;{exp.value}</div>
                </div>
              );
            })
          ) : (
            <div className={styles.loading}>Loading</div>
          )}
        </div>
        <button className={styles.filtersreset} onClick={(e) => handleReset(e)}>
          Reset all filters
        </button>
      </div>
    </div>
  );
}
