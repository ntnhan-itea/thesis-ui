export const state = {
  user: {
    id: null,
    account: null,
    companyEmail: null,
    position: null,
    fullName: null,
    belongToteams: [],
  },
  members: [],
  teams: [],
  loadingCount: 0,
  isError: false,
  isOpenRejectDialog: false,
  calendarFocus: "",

  response: {
    status: null,
    data: {
      message: "",
      title: "",
    },
  },
  ictResponseMessage: {},

  registrations: [], // Default data from server
  pendingRegistrations:[],
  ictRegister: []

};
