const dashboard = "/dashboard";
const admin = `${dashboard}/admin`;
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
  admin: {
    manageUsers: `${admin}/manage_users`,
    manageJobs: `${admin}/manage_jobs`,
    managePayments: `${admin}/manage_payments`,
  },
  recruiter: {
    addJob: `${recruiter}/add_job`,
    manageJobs: `${recruiter}/manage_jobs`,
    updateJob: `${recruiter}/update_job/:id`,
    viewApplicants: `${recruiter}/viewApplicants`,
  },
};

export default route;
