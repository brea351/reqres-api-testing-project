export class ReqResApi {
  constructor(request) {
    this.request = request;
  }

  async getUsers(page = 1) {
    return await this.request.get(`/api/users?page=${page}`);
  }

  async getUser(id) {
    return await this.request.get(`/api/users/${id}`);
  }

  async createUser(userData) {
    return await this.request.post('/api/users', {
      data: userData
    });
  }

  async updateUser(id, userData) {
    return await this.request.put(`/api/users/${id}`, {
      data: userData
    });
  }

  async patchUser(id, userData) {
    return await this.request.patch(`/api/users/${id}`, {
      data: userData
    });
  }

  async deleteUser(id) {
    return await this.request.delete(`/api/users/${id}`);
  }

  async login(credentials) {
    return await this.request.post('/api/login', {
      data: credentials
    });
  }

  async register(credentials) {
    return await this.request.post('/api/register', {
      data: credentials
    });
  }
}