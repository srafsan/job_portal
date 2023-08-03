const dashboard = "/dashboard";
const recruiter = `${dashboard}/recruiter`;

const route = {
  auth: {
    login: "/login",
    signup: "/signup",
    logout: "/logout",
    logoutAll: "/logoutAll",
  },
  home: {
    main: "/",
  },
  dashboard: {
    admin: `${dashboard}/admin`,
    recruiter: `${dashboard}/recruiter`,
    applicants: `${dashboard}/applicants`,
  },
  recruiter: {
    addJob: `${recruiter}/addJob`,
    manageJobs: `${recruiter}/manage_jobs`,
    updateJob: `${recruiter}/update_job/:id`,
    viewApplicants: `${recruiter}/viewApplicants`,
  },
};

export default route;
