import aa from 'search-insights';

aa('init', {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
  useCookie: true,
});

aa('setUserToken', 'user-123');

window.aa = aa;

import ResultsPage from './components/results-page';

class SpencerAndWilliamsSearch {
  constructor() {
    this._initSearch();
  }

  _initSearch() {
    this.resultPage = new ResultsPage();
  }
}

new SpencerAndWilliamsSearch();