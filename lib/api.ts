// API wrapper functions
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async get(endpoint: string) {
    // GET request implementation
  }

  async post(endpoint: string, data: any) {
    // POST request implementation
  }

  async put(endpoint: string, data: any) {
    // PUT request implementation
  }

  async delete(endpoint: string) {
    // DELETE request implementation
  }
}

export const apiClient = new ApiClient();