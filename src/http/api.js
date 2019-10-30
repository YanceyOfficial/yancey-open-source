import { GET } from './axios';

class Api {
  userRepo = () => GET('/users/YanceyOfficial/repos', {});
  blogRepo = () => GET('/orgs/Yancey-Blog/repos', {});
  learnRepo = () => GET('/orgs/learn-frame/repos', {});
}

const api = new Api();

export default api;
