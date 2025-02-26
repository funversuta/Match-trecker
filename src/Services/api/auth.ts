import apiService from './api';

export interface IAuthPostDto {
    username: string;
    password: string;
  }

  interface IAuthSucces{
    access: string; 
    refresh: string
  }

  const authPath = 'api/token/';

const authApiService = {
  getToken: async (authData: IAuthPostDto): Promise<IAuthSucces> => {
    return apiService.POST(authPath, authData);
  },

  updateToken: async (refToken: string): Promise<IAuthSucces> => {
    return apiService.POST(`${authPath}refresh/`, { refresh: refToken });
  },
};

export default authApiService;
