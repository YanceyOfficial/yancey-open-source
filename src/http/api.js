import { GET } from './axios';

class Api {
  userRepo = () => GET('/users/YanceyOfficial/repos', {});
  blogRepo = () => GET('/orgs/Yancey-Blog/repos', {});
  learnRepo = () => GET('/orgs/learn-frame/repos', {});
  sourceCodeRepo = () => GET('/orgs/yancey-learn-source-code/repos', {});
}

const api = new Api();

export default api;
