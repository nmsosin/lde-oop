// fetch
class FetchRequest {
  constructor (config) {
    this._config = config;
  }

  _checkPromiseResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error ${res.status}`);
  }

  async _apiRequest(url, options) {
    try {
      const res = await fetch(url, options);
      console.log("!!! FETCH !!!")
      return this._checkPromiseResponse(res);
    } catch (error) {
      return console.log(error);
    }
  }

  async getTasks() {
    return await this._apiRequest(`${this._config.baseUrl}/tasks`, {
      method: "GET",
      headers: this._config.headers,
    });
  }

  async getTaskById(id) {
    return this._apiRequest(`${this._config.baseUrl}/tasks/${id}`, {
      method: "GET",
      headers: this._config.headers,
    });
  }

  async updateTaskById(id, newTaskValues) {
    return this._apiRequest(`${this._config.baseUrl}/tasks/${id}`, {
      method: "PATCH",
      headers: this._config.headers,
      body: JSON.stringify(newTaskValues)
    });
  }

  async deleteTaskById(id) {
    return this._apiRequest(`${this._config.baseUrl}/tasks/${id}`, {
      method: "DELETE",
      headers: this._config.headers,
    });
  }

  async addTask(newTaskValues) {
    return this._apiRequest(`${this._config.baseUrl}/tasks`, {
      method: "POST",
      headers: this._config.headers,
      body: JSON.stringify(newTaskValues)
    });
  }
}

// XMLHttpRequest
class XmlRequest {
  constructor (config) {
    this._config = config;
  }

  _getResponse = (url, method, data) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(xhr.status);
    xhr.send(JSON.stringify(data));
  });

  async getTasks() {
    console.log("!!! XML !!!")
    return this._getResponse(`${this._config.baseUrl}/tasks`, "GET");
  }

  async getTaskById(id) {
    return this._getResponse(`${this._config.baseUrl}/tasks/${id}`, "GET");
  }

  async updateTaskById(id, newTaskValues) {
    return this._getResponse(`${this._config.baseUrl}/tasks/${id}`, "PATCH", newTaskValues);
  }

  async deleteTaskById(id) {
    return this._getResponse(`${this._config.baseUrl}/tasks${id}`, "DELETE");
  }

  async addTask(newTaskValues) {
    return this._getResponse(`${this._config.baseUrl}/tasks`, "POST", newTaskValues);
  }

}


// Controller

export class Api {
  constructor(config) {
    this._config = config;
    this._service = this._config.type === "fetch" ? new FetchRequest(config) : new XmlRequest(config);
  }
  
    async getTasks() {
      const data = await this._service.getTasks()
      return data;
    }

  async getTaskById(id) {
    const data = await this._service.getTaskById(id)
    return data;
  }

  async updateTaskById(id, newTaskValues) {
    const data = await this._service.updateTaskById(id, newTaskValues)
    return data;
  }

  async deleteTaskById(id) {
    const data = await this._service.deleteTaskById(id)
    return data;
  }

  async addTask(newTaskValues) {
    const data = await this._service.addTask(newTaskValues)
    return data;
  }

}