import { GET } from './axios';

class Api {
  blogRepo = () => GET('/orgs/Yancey-Blog/repos', {});
  userRepo = () => GET('/users/YanceyOfficial/repos', {});
}

const api = new Api();

export default api;
