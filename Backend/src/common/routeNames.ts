const dashboard = "/dashboard";

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
};

export default route;
