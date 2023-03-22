import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://172.20.159.7:18080',
  //timeout: 3000, no timeout for now
});

const api = {
  initInterceptor: () => initInterceptor(instance),
  login: (credentials) =>
    instance
      .post('/ClientsAPIPublic/authenticate', credentials)
      .then((response) => {
        // DEBUG: console.log('RESPONSE DATA');
        // DEBUG: console.log(response.data);
        return response;
      }),
  getCompanySettings: (CancelToken) =>
    instance
      .get('/admin_client/ClientsAPI/find', CancelToken)
      .then((response) => response),
  updateCompanySettings: (newSettings) => {
    // Debug: console.log('NS', newSettings);

    return instance
      .post('/admin_client/ClientsAPI/update', newSettings)
      .then((response) => {
        // DEBUG: console.log('RESPONSE DATA');
        // DEBUG: console.log(response.data);
        return response;
      });
  },
  getRolesData: (CancelToken) =>
    instance
      .get('/admin_client/ClientsRolesUserAPI/findAll', CancelToken)
      .then((response) => response),
  updateRole: (newRoleData) =>
    instance
      .post('/admin_client/ClientsRolesUserAPI/update', newRoleData)
      .then((response) => {
        // DEBUG: console.log('RESPONSE DATA');
        // DEBUG: console.log(response.data);
        return response;
      }),
  register: (userData) => {
    // Debug: console.log('UD', userData);
    return instance
      .post('/ClientsAPIPublic/create', userData)
      .then((response) => response);
  },
};

export default api;

function initInterceptor(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Check if user has an access token already
      const accessToken = localStorage.getItem('accessToken');
      // In case he has, add it to the request header
      if (accessToken) {
        // DEBUG:
        console.log(accessToken);
        config.headers = {
          ...config.headers,
          Authorization: 'Bearer ' + accessToken,
        };
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
}

export function checkInvalidToken(error) {
  // If this returns true, the component that called this function should redirect to login, or reload page
  // If this returns false, the component should handle the error in a different way

  // Check if the error is because of invalid JWT token
  if (error?.response?.status === 401) {
    // If yes, this needs to true in the end

    // But first check if user has an access token in the local storage
    const accessToken = localStorage.getItem('accessToken');
    // In case he has, remove it
    if (accessToken) {
      localStorage.removeItem('accessToken');
    }

    return true;
  }

  return false;
}

export function removeAccessToken() {
  // But first check if user has an access token in the local storage
  const accessToken = localStorage.getItem('accessToken');
  // In case he has, remove it
  if (accessToken) {
    localStorage.removeItem('accessToken');
  }
}
