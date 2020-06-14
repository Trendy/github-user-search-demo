class GithubApiService {

    GITHUB_API_URL: string = '';
    SEARCH_CACHE = {};

    constructor() {
        this.GITHUB_API_URL = (window as any)?.__env__?.GITHUB_API_URL || 'http://localhost:3000/search/users';
    }

    async searchForUser(searchTerm: string, page: number = 1, pageSize: number = 25) {
        const URL = `${this.GITHUB_API_URL}/search/users?searchTerm=${encodeURIComponent(searchTerm)}&page=${page}&pageSize=${pageSize}`;

        if(this.SEARCH_CACHE[URL]){
            return this.SEARCH_CACHE[URL];
        }

        let response = await fetch(URL);
        response = await response.json();
        this.cacheResponse(URL, response);

        return response;
    }

    // Quick and dirty client-side catching
    cacheResponse(URL, response) {
        const cacheLength = Object.keys(this.SEARCH_CACHE).length;

        if(cacheLength > 100) {
            delete this.SEARCH_CACHE[0];
        }

        this.SEARCH_CACHE[URL] = response;
    }

}

export const GithubService = new GithubApiService();