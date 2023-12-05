type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

class RequestBuilder {
    #method: Method = 'GET';
    #headers: Record<string, string> = {
        'Content-type': 'application/json; charset=UTF-8'
    };
    #body: string = '';
    #url: string = '';

    static new(): RequestBuilder {
        return new RequestBuilder();
    }

    withMethod(method: Method): this {
        this.#method = method;
        return this;
    }

    withHeaders(headerName: string, value: string): this {
        this.#headers[headerName] = value;
        return this;
    }

    withUrl(url: string): this {
        this.#url = url;
        return this;
    }

    withBody(body: Record<string, any>): this {
        this.#body = JSON.stringify(body);
        return this;
    }

    prepare(): Promise<Response> {
        const init: RequestInit = {
            method: this.#method,
            headers: this.#headers
        };
        if (this.#method !== 'GET') {
            init.body = this.#body;
        }

        return fetch(this.#url, init);
    }
}

const getRequest = RequestBuilder.new()
    .withUrl('https://jsonplaceholder.typicode.com/todos/1')
    .prepare();

getRequest
    .then((response) => response.json())
    .then((json) => console.log(json));

const postRequest = RequestBuilder.new()
    .withUrl('https://jsonplaceholder.typicode.com/posts')
    .withMethod('POST')
    .withBody({ title: 'myTitle', body: 'myBody', userId: 1 })
    .prepare();

postRequest
    .then((response) => response.json())
    .then((json) => console.log(json));
