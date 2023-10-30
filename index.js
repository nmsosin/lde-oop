const fetchConfig = {
  baseUrl: 'http://37.220.80.108',
  headers: {
    "Content-Type": "application/json",
  },
  type: "fetch"
}

const xhrConfig = {
  baseUrl: 'http://37.220.80.108',
  headers: {
    "Content-Type": "application/json",
  },
  type: "xhr"
}

const updatedTaskInfo = {
    "name": "This is the new name for task 23",
    "isCompleted": "false",
    "isImportant": "true",
}

const brandNewTask = {
    "name": "OMG WOW YAY",
    "info": "Looks like it works... IT WORKS!!!",
    "isImportant": true,
}


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

// const api = new Api(fetchConfig);
// console.log(api.getTasks().then(data => console.log(data)));
// console.log(api.getTaskById(19).then(data => console.log(data)));
// console.log(api.updateTaskById(19, updatedTaskInfo).then(data => console.log(data)));
// console.log(api.addTask(brandNewTask).then(data => console.log(data)));
// console.log(api.deleteTaskById(18).then(data => console.log(data)));


// const xhrapi = new Api(xhrConfig);
// console.log(xhrapi.getTasks().then(data => console.log(data)));
// console.log(xhrapi.getTaskById(23).then(data => console.log(data)));
// console.log(xhrapi.updateTaskById(23, updatedTaskInfo).then(data => console.log(data)));
// console.log(xhrapi.addTask(brandNewTask).then(data => console.log(data)));
