import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import stylesJ from "../CSS/Jobs.module.scss";
import stylesF from "../CSS/Filters.module.scss";
import stylesSB from "../CSS/SearchBar.module.scss";
import { FiSearch } from "react-icons/fi";
import {
  getJobs,
  searchJobs,
  filterJobType,
  filterJobDepartment,
  filterWorkSchedule,
  filterExperience,
  sortJobsByLocation,
  sortJobsByRole,
  sortJobsByDepartment,
  sortJobsByEducation,
  sortJobsByExperience,
} from "../../Redux/actions";

export default function Jobs() {
  const dispatch = useDispatch();
  const dayZero = new Date(2020, 10, 1, 0, 0, 1);
  const jobs = useSelector((state) => state.filteredJobs);
  useEffect(() => {
    dispatch(getJobs());
  }, []);
  let allJobs = [];
  jobs &&
    jobs.jobs &&
    jobs.jobs.map((eachJob) => {
      allJobs.push(eachJob);
    });
  for (let i = 0; i < allJobs.length; i++) {
    allJobs[i].clicked = false;
    for (let j = 0; j < allJobs[i].items.length; j++) {
      allJobs[i].items[j].clicked = false;
    }
  }

  const [search, setSearch] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
    setClicked({});
  }

  function handleSearch(e) {
    e.preventDefault();
    if (e.target.value !== undefined) {
      console.log(e.target.value);
      dispatch(searchJobs(search));
      setSearch("");
      document.getElementById("SBI").value = "";
      setClicked({});
    }
  }

  function getJobSum() {
    let sumaJobsTotal = 0;
    let sumaJobsAvailable = 0;
    for (let i = 0; i < jobs.jobs.length; i++) {
      sumaJobsTotal += jobs.jobs[i].total_jobs_in_hospital;
      sumaJobsAvailable += jobs.jobs[i].items.length;
    }
    return { 0: sumaJobsAvailable, 1: sumaJobsTotal };
  }

  function getWeeks(dateCreated) {
    const year = dateCreated.slice(0, 4);
    const month = dateCreated.slice(5, 7);
    const day = dateCreated.slice(8, 10);
    const date = new Date(year, month, day);
    let tiempoCreado = date - dayZero;
    tiempoCreado = Math.floor(tiempoCreado / 1000 / 60 / 60 / 24 / 7);
    return tiempoCreado;
  }

  const [clicked, setClicked] = useState({});

  const [clickedSort, setClickedSort] = useState({});
  function handleEachSortButton(e) {
    e.preventDefault();
    setClickedSort({
      ...clickedSort,
      [e.target.name]: !clickedSort[e.target.name],
    });
  }

  function handleChangeSort(e) {
    e.preventDefault();
    if (clickedSort[e.target.name]) {
      if (e.target.name === "location")
        dispatch(sortJobsByLocation(e.target.value));
      if (e.target.name === "role") dispatch(sortJobsByRole(e.target.value));
      if (e.target.name === "department")
        dispatch(sortJobsByDepartment(e.target.value));
      if (e.target.name === "education")
        dispatch(sortJobsByEducation(e.target.value));
      if (e.target.name === "experience")
        dispatch(sortJobsByExperience(e.target.value));
      setClickedSort({
        ...clickedSort,
        [e.target.name]: clickedSort[e.target.name],
      });
    }
  }

  function handleOpenClose(e) {
    e.preventDefault();
    const testNumber = /^[0-9]+$/;
    if (testNumber.test(parseInt(e.target.value)) === false) {
      for (let i = 0; i < allJobs.length; i++) {
        if (allJobs[i].name === e.target.value) {
          setClicked({
            ...clicked,
            [e.target.value]: !clicked[e.target.value],
          });
        }
      }
    } else {
      for (let i = 0; i < allJobs.length; i++) {
        for (let j = 0; j < allJobs[i].items.length; j++) {
          if (allJobs[i].items[j].job_id === parseInt(e.target.value)) {
            setClicked({
              ...clicked,
              [e.target.value]: !clicked[e.target.value],
            });
          }
        }
      }
    }
  }

  const trabajos = useSelector((state) => state.allTheJobs);
  const todosJobs = trabajos ? trabajos.jobs : "";
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
    setClicked({});
    setClickedSort({});
  }

  function handleFilterJobType(event) {
    event.preventDefault();
    dispatch(filterJobType(event.target.value));
    setClicked({});
  }

  function handleFilterDepartment(event) {
    event.preventDefault();
    dispatch(filterJobDepartment(event.target.value));
    setClicked({});
  }

  function handleFilterWorkSchedule(event) {
    event.preventDefault();
    dispatch(filterWorkSchedule(event.target.value));
    setClicked({});
  }

  function handleFilterExperience(event) {
    event.preventDefault();
    dispatch(filterExperience(event.target.value));
    setClicked({});
  }

  function handleShowMore() {
    setShowMore(!showMore);
  }

  return (
    <div className={stylesF.containerTodo}>
      <header className={stylesSB.SearchBar}>
        <button
          className={stylesSB.buttonSearchBar}
          type="submit"
          onClick={(e) => handleSearch(e)}
        >
          <FiSearch className={stylesSB.magnifier} />
        </button>
        <input
          className={stylesSB.inputSearchBar}
          type="text"
          id="SBI"
          placeholder="Search for any job, title, keywords or company"
          onChange={(e) => handleChange(e)}
        />
      </header>
      <div className={stylesF.todo}>
        <div className={stylesF.Filters}>
          <div className={stylesF.filtersordena}>
            <button
              className={stylesF.filtersreset}
              onClick={(e) => handleReset(e)}
            >
              Reset all filters
            </button>
            <div className={stylesF.filterseachfilter}>
              <p className={stylesF.filtersfilter}>JOB TYPE</p>
              {todosJobs && todosJobs.length && jobType ? (
                jobType.map((jobtype) => {
                  return (
                    <div className={stylesF.eachBreakdown} key={jobtype.name}>
                      <button
                        className={stylesF.filtersoption}
                        value={jobtype.name}
                        onClick={(e) => handleFilterJobType(e)}
                      >
                        {jobtype.name}
                      </button>
                      <div className={stylesF.eachCount}>
                        &ensp;{jobtype.value}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={stylesF.loading}>Loading...</div>
              )}
            </div>

            <div className={stylesF.filterseachfilter}>
              <p className={stylesF.filtersfilter}>DEPARTMENT</p>
              {todosJobs && todosJobs.length && department ? (
                <div>
                  {department.map((dep, index) => {
                    if (index < 10) {
                      return (
                        <div className={stylesF.eachBreakdown} key={dep.name}>
                          <button
                            className={stylesF.filtersoption}
                            value={dep.name}
                            onClick={(e) => handleFilterDepartment(e)}
                          >
                            {dep.name}
                          </button>
                          <div className={stylesF.eachCount}>
                            &ensp;{dep.value}
                          </div>
                        </div>
                      );
                    }
                  })}
                  {!showMore ? (
                    ""
                  ) : (
                    <div className={stylesF.eachBreakdownModal}>
                      <div className={stylesF.TitleModal}>
                        <p className={stylesF.filtersfilterModal}>department</p>
                        <button
                          onClick={() => handleShowMore()}
                          className={stylesF.buttonModal}
                        >
                          X
                        </button>
                      </div>
                      <div className={stylesF.eachDepartmentModal}>
                        {department.map((dep) => {
                          return (
                            <>
                              <div className={stylesF.specModal} key={dep.name}>
                                <button
                                  className={stylesF.filtersoption}
                                  value={dep.name}
                                  onClick={(e) => handleFilterDepartment(e)}
                                >
                                  {dep.name}
                                </button>
                                <div className={stylesF.eachCount}>
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
                    className={stylesF.showMore}
                    onClick={() => handleShowMore()}
                  >
                    Show more
                  </button>
                </div>
              ) : (
                <>
                  <div className={stylesF.loading}>Loading...</div>
                </>
              )}
            </div>

            <div className={stylesF.filterseachfilter}>
              <p className={stylesF.filtersfilter}>WORK SCHEDULE</p>
              {todosJobs && todosJobs.length && workSchedule ? (
                workSchedule.map((woSch) => {
                  return (
                    <div className={stylesF.eachBreakdown} key={woSch.name}>
                      <button
                        className={stylesF.filtersoption}
                        value={woSch.name}
                        onClick={(e) => handleFilterWorkSchedule(e)}
                      >
                        {woSch.name}
                      </button>
                      <div className={stylesF.eachCount}>
                        &ensp;{woSch.value}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={stylesF.loading}>Loading</div>
              )}
            </div>

            <div className={stylesF.filterseachfilter}>
              <p className={stylesF.filtersfilter}>EXPERIENCE</p>
              {todosJobs && todosJobs.length && experience ? (
                experience.map((exp) => {
                  return (
                    <div className={stylesF.eachBreakdown} key={exp.name}>
                      <button
                        className={stylesF.filtersoption}
                        value={exp.name}
                        onClick={(e) => handleFilterExperience(e)}
                      >
                        {exp.name}
                      </button>
                      <div className={stylesF.eachCount}>&ensp;{exp.value}</div>
                    </div>
                  );
                })
              ) : (
                <div className={stylesF.loading}>Loading</div>
              )}
            </div>
          </div>
        </div>
        {/*--------------------------------------------JOBS--------------------------------------------*/}
        <div className={stylesJ.container}>
          <div className={stylesJ.Jobs}>
            <div className={stylesJ.JobSorting}>
              {jobs && jobs.jobs && (
                <div className={stylesJ.jobSum}>
                  <p className={stylesJ.theJobSum}>
                    {`${getJobSum()[0]} / ${getJobSum()[1]}`}
                  </p>
                  <p>&nbsp;job postings</p>
                </div>
              )}
              <div className={stylesJ.jobSort}>
                Sort by
                <div className={stylesJ.eachSort}>
                  <button
                    className={
                      clickedSort.location
                        ? stylesJ.buttonSortactive
                        : stylesJ.buttonSort
                    }
                    onClick={(e) => handleEachSortButton(e)}
                    name="location"
                  >
                    Location
                  </button>
                  <select
                    name="location"
                    onChange={(e) => handleChangeSort(e)}
                    className={stylesJ.losselectores}
                  >
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                  </select>
                </div>
                <div className={stylesJ.eachSort}>
                  <button
                    className={
                      clickedSort.role
                        ? stylesJ.buttonSortactive
                        : stylesJ.buttonSort
                    }
                    onClick={(e) => handleEachSortButton(e)}
                    name="role"
                  >
                    Role
                  </button>
                  <select
                    name="role"
                    onChange={(e) => handleChangeSort(e)}
                    className={stylesJ.losselectores}
                  >
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                  </select>
                </div>
                <div className={stylesJ.eachSort}>
                  <button
                    className={
                      clickedSort.department
                        ? stylesJ.buttonSortactive
                        : stylesJ.buttonSort
                    }
                    onClick={(e) => handleEachSortButton(e)}
                    name="department"
                  >
                    Department
                  </button>
                  <select
                    name="department"
                    onChange={(e) => handleChangeSort(e)}
                    className={stylesJ.losselectores}
                  >
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                  </select>
                </div>
                <div className={stylesJ.eachSort}>
                  <button
                    className={
                      clickedSort.education
                        ? stylesJ.buttonSortactive
                        : stylesJ.buttonSort
                    }
                    onClick={(e) => handleEachSortButton(e)}
                    name="education"
                  >
                    Education
                  </button>
                  <select
                    name="education"
                    onChange={(e) => handleChangeSort(e)}
                    className={stylesJ.losselectores}
                  >
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                  </select>
                </div>
                <div className={stylesJ.eachSort}>
                  <button
                    className={
                      clickedSort.experience
                        ? stylesJ.buttonSortactive
                        : stylesJ.buttonSort
                    }
                    onClick={(e) => handleEachSortButton(e)}
                    name="experience"
                  >
                    Experience
                  </button>
                  <select
                    name="experience"
                    onChange={(e) => handleChangeSort(e)}
                    className={stylesJ.losselectores}
                  >
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={stylesJ.jobTitle}>
              {allJobs ? (
                allJobs.map((eachJob) => {
                  return (
                    <div className={stylesJ.allTheJobs} key={eachJob.name}>
                      <div className={stylesJ.everyLineJob}>
                        <span className={stylesJ.dosLetras}>
                          {eachJob.name.slice(0, 2).toUpperCase()}
                        </span>
                        <span className={stylesJ.jobDesc}>
                          {eachJob.items.length}/
                          {eachJob.total_jobs_in_hospital} jobs for{" "}
                          {eachJob.name}
                        </span>
                        {clicked[eachJob.name] ? (
                          <button
                            className={stylesJ.eachJobButton}
                            onClick={(e) => handleOpenClose(e)}
                            value={eachJob.name}
                          >
                            View Less
                          </button>
                        ) : (
                          <button
                            className={stylesJ.eachJobButton}
                            onClick={(e) => handleOpenClose(e)}
                            value={eachJob.name}
                          >
                            View More
                          </button>
                        )}
                      </div>
                      <div className={stylesJ.subJobs}>
                        {clicked[eachJob.name] &&
                          eachJob.items.map((eachItem) => {
                            return (
                              <div>
                                <span
                                  key={eachItem.job_id}
                                  className={stylesJ.eachItem}
                                >
                                  <span className={stylesJ.eachSubJobTitle}>
                                    <span
                                      className={
                                        stylesJ.eachSubJobTitleSpecific
                                      }
                                    >
                                      {eachItem.job_title}
                                    </span>
                                    <span>
                                      {eachItem.job_type} | $
                                      {eachItem.salary_range[0]} - $
                                      {eachItem.salary_range[1]} an hour |{" "}
                                      {eachItem.city}
                                    </span>
                                  </span>
                                  <span className={stylesJ.weeks}>
                                    {getWeeks(eachItem.created)} weeks ago
                                  </span>
                                  {clicked[eachItem.job_id] ? (
                                    <button
                                      className={stylesJ.eachJobButton}
                                      onClick={(e) => handleOpenClose(e)}
                                      value={eachItem.job_id}
                                      name={eachItem.job_id}
                                    >
                                      View Less
                                    </button>
                                  ) : (
                                    <button
                                      className={stylesJ.eachJobButton}
                                      key={eachItem.job_id}
                                      onClick={(e) => handleOpenClose(e)}
                                      value={eachItem.job_id}
                                      name={eachItem.job_id}
                                    >
                                      View More
                                    </button>
                                  )}
                                </span>
                                {clicked[eachItem.job_id] && (
                                  <div className={stylesJ.allTheSubSub}>
                                    <div>
                                      <div className={stylesJ.SubSub}>
                                        <div className={stylesJ.SubSubTitle}>
                                          Department:
                                        </div>
                                        <div className={stylesJ.SubSubDetail}>
                                          {eachItem.department.map((dep) => (
                                            <div key={dep}>{dep}</div>
                                          ))}
                                        </div>
                                      </div>
                                      <div className={stylesJ.SubSub}>
                                        <div className={stylesJ.SubSubTitle}>
                                          Hours / shifts:
                                        </div>
                                        <div className={stylesJ.SubSubDetail}>
                                          {eachItem.hours} hours /{" "}
                                          {eachItem.work_schedule}
                                        </div>
                                      </div>
                                      <div className={stylesJ.SubSub}>
                                        <div className={stylesJ.SubSubTitle}>
                                          Summary
                                        </div>
                                        <div className={stylesJ.SubSubDetail}>
                                          {eachItem.description}
                                        </div>
                                      </div>
                                    </div>
                                    <div className={stylesJ.SubSubButtons}>
                                      <button className={stylesJ.SubSubButton1}>
                                        Job details
                                      </button>
                                      <button className={stylesJ.SubSubButton2}>
                                        Save job
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
