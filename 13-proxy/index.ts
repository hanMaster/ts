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

class ApiProxy {
    async getData(productId: number) {
        if (productId > 10) {
            throw new Error('Слишком большой ID');
        }

        const getRequest = RequestBuilder.new()
            .withUrl(`https://dummyjson.com/products/${productId}`)
            .prepare();

        const response = await getRequest;
        if (response) {
            return response.json();
        }
    }
}

const run = async () => {
    const api = new ApiProxy();
    try {
        const req1 = await api.getData(5);
        console.log('req1', req1);

        const req2 = await api.getData(15);
        console.log(req2);
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
    }
};

run();
