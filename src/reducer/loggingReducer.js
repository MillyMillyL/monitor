const today = new Date().toJSON().slice(0, 10);

export const initialState = {
  dateStart: today,
  dateEnd: today,
  loglevel: "",
  environment: "Development",
  service: "",
  category: "",
  userId: "",
  ipAddress: "",
  requestAddress: "",
  routes: "",
  userAgent: "",
  message: "",
  pageIndex: 1,
  pageSize: 100,
  allOpen: true,
};

export const loggingReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case LOGGING_ACTION.DATE_RANGE:
      return {
        ...state,
        dateStart: action.dateStart ?? state.dateStart,
        dateEnd: action.dateEnd ?? state.dateEnd,
        pageIndex: 1,
      };

    case LOGGING_ACTION.LOG_LEVEL:
      return {
        ...state,
        loglevel: action.loglevel ?? "",
      };

    case LOGGING_ACTION.LOG_ENV:
      return {
        ...state,
        environment: action.environment ?? "",
      };

    case LOGGING_ACTION.LOG_SERVICE:
      return {
        ...state,
        service: action.service ?? "",
      };

    case LOGGING_ACTION.LOG_CATEGORY:
      return {
        ...state,
        category: action.category ?? "",
      };

    case LOGGING_ACTION.LOG_USERID:
      return {
        ...state,
        userId: action.userId ?? "",
      };

    case LOGGING_ACTION.LOG_IP_ADDRESS:
      return {
        ...state,
        ipAddress: action.ipAddress ?? "",
      };

    case LOGGING_ACTION.LOG_REQUEST_ADDRESS:
      return {
        ...state,
        requestAddress: action.requestAddress ?? "",
      };

    case LOGGING_ACTION.LOG_ROUTES:
      return {
        ...state,
        routes: action.routes ?? "",
      };

    case LOGGING_ACTION.LOG_USER_AGENT:
      return {
        ...state,
        userAgent: action.userAgent ?? "",
      };

    case LOGGING_ACTION.LOG_MESSAGE:
      return {
        ...state,
        message: action.message ?? "",
      };

    case LOGGING_ACTION.PAGE_PREV:
      return {
        ...state,
        pageIndex: state.pageIndex - 1 < 1 ? 1 : state.pageIndex - 1,
      };

    case LOGGING_ACTION.PAGE_NEXT:
      return {
        ...state,
        pageIndex: state.pageIndex + 1,
      };

    case LOGGING_ACTION.PAGE_SIZE:
      return {
        ...state,
        pageSize: action.pageSize,
        pageIndex: 1,
      };

    case LOGGING_ACTION.ALL_OPEN:
      return {
        ...state,
        allOpen: !state.allOpen,
      };
  }
};

export const LOGGING_ACTION = {
  DATE_RANGE: "date_range",
  LOG_LEVEL: "log_level",
  LOG_ENV: "log_env",
  LOG_SERVICE: "log_service",
  LOG_CATEGORY: "log_category",
  LOG_USERID: "log_userid",
  LOG_IP_ADDRESS: "log_ip_address",
  LOG_REQUEST_ADDRESS: "log_request_address",
  LOG_ROUTES: "log_routes",
  LOG_USER_AGENT: "log_user_agent",
  LOG_MESSAGE: "log_message",
  PAGE_PREV: "prev",
  PAGE_NEXT: "next",
  PAGE_SIZE: "page_size",
  ALL_OPEN: "allOpen",
};
