export default class BooksService {
    _parseHeaders = (res) => {
        return res.headers.get("link").split(",").reduce((acc, link) => {
            const props = /^\<(.+)\>; rel="(.+)"$/.exec(link.trim());
            if (!props) {
                console.warn("no match");
                return acc;
            }
            acc[props[2]] = this._pageNumber(props[1]);
            return acc;
        }, {});
    }
    _pageNumber = (url) => {
        let params = (new URL(url)).searchParams;
        return params.get('page');
    }


    _apiBase = 'https://www.anapioficeandfire.com/api'

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`На ${url} сылке ${res.status}`)
        }
        const props = this._parseHeaders(res)
        let json = await res.json()
        json = json.map(this._transformBooks)
        json = json.map(this._transformCharacters)
        json = json.map(this._transformHouses)

        return {json, props}
    }


    getResourceDetail = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`На ${url} ссылке ${res.status}`)
        }

        return await res.json()
    }


    getBooks = async (page = 1, pageSize = 10) => {
        return await this.getResource(`/books?page=${page}&pageSize=${pageSize}`)
    }
    getBookDetail = async (id =1) => {
        return await this.getResourceDetail(`/books/${id}`)
    }


    getCharacters = async (page = 1, pageSize = 10) => {
        return await this.getResource(`/characters?page=${page}&pageSize=${pageSize}`)
    }
    getCharactersDetail = async (id =1) => {
        return await this.getResourceDetail(`/characters/${id}`)
    }


    getHouses = async (page = 1, pageSize = 10) => {
        return await this.getResource(`/houses?page=${page}&pageSize=${pageSize}`)
    }
    getHousesDetail = async (id =1) => {
        return await this.getResourceDetail(`/houses/${id}`)
    }


    _transformBooks = (objekt) => {
        const id = objekt.url.match(/\d+/)[0]
        return {id,...objekt}
    }
    _transformCharacters = (objekt) => {
        const id = objekt.url.match(/\d+/)[0]
        return {id,...objekt}
    }
    _transformHouses = (objekt) => {
        const id = objekt.url.match(/\d+/)[0]
        return {id,...objekt}
    }


}



