import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';

import {
  searchBox,
  hits,
  pagination,
  refinementList,
  configure,
} from 'instantsearch.js/es/widgets';

import resultHit from '../templates/result-hit';

class ResultPage {
  constructor() {
    this._listenersBound = false;

    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  _registerClient() {
    this._searchClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY
    );

    this._searchInstance = instantsearch({
      indexName: process.env.ALGOLIA_INDEX,
      searchClient: this._searchClient,
      insights: true,
    });
  }

  _registerWidgets() {
    this._searchInstance.addWidgets([
      searchBox({
        container: '#searchbox',
      }),

      hits({
        container: '#hits',
        // ADD queryID TO EACH HIT(ITEM) AND POSITION OF THE ITEM ON THE PAGE
        transformItems: (items, { results }) => {
          return items.map((item, index) => ({
            ...item,
            queryID: results?.queryID || '',
            __position:
              results.page * results.hitsPerPage + index + 1,
          }));
        },

        templates: {
          item: (item) => `
            <div
              class="result-hit-wrapper"
              data-object-id="${item.objectID}"
              data-query-id="${item.queryID || ''}"
              data-position="${item.__position}"
            >
              ${resultHit(item)}
            </div>
          `,
        },
      }),

      pagination({
        container: '#pagination',
      }),

      refinementList({
        container: '#brand-facet',
        attribute: 'brand',
      }),

      refinementList({
        container: '#categories-facet',
        attribute: 'categories',
      }),

      configure({
        clickAnalytics: true,
      }),
    ]);
  }

  _startSearch() {
    this._searchInstance.start();
   

    // =================================
    // 👁 VIEW PRODUCT CLICKED - it triggers but it does not seem to be passed to Algolia - due to insights hit click event?
    // =================================
    document.addEventListener('click', (event) => {
      // 🚫 Never track clicks coming from controls area
      if (event.target.closest('.result-hit__controls')) {
        return;
      }
    
      // ✅ Only track genuine product engagement areas
      const clickTarget = event.target.closest(
        '.result-hit__details');
    
      if (!clickTarget) return;
    
      const wrapper = clickTarget.closest('.result-hit-wrapper');
      if (!wrapper) return;
    
      const objectID = wrapper.dataset.objectId;
      const queryID = wrapper.dataset.queryId;
    
      if (!objectID || !queryID) return;
    
      aa('clickedObjectIDsAfterSearch', {
        index: process.env.ALGOLIA_INDEX,
        eventName: 'View Product Clicked',
        objectIDs: [objectID],
        queryID,
      });
    });
    

    // ===============================
    // 🛒 ADDED TO CART
    // ================================
    document.addEventListener('click', (event) => {
      const cartBtn = event.target.closest('.result-hit__cart');
      if (!cartBtn) return;
      event.stopImmediatePropagation();

      const wrapper = cartBtn.closest('.result-hit-wrapper');
      if (!wrapper) return;

      const objectID = wrapper.dataset.objectId;
      const queryID = wrapper.dataset.queryId;

      if (!objectID || !queryID) return;

      aa('convertedObjectIDsAfterSearch', {
        index: process.env.ALGOLIA_INDEX,
        eventName: 'Added To Cart',
        objectIDs: [objectID],
        queryID,
      });
    });

    // ================================
    // ❤️ ADDED TO WISHLIST
    // ================================
    document.addEventListener('click', (event) => {
      const wishlistBtn = event.target.closest('.result-hit__wishlist');
      if (!wishlistBtn) return;

      const wrapper = wishlistBtn.closest('.result-hit-wrapper');
      if (!wrapper) return;

      const objectID = wrapper.dataset.objectId;
      const queryID = wrapper.dataset.queryId;

      if (!objectID || !queryID) return;

      aa('convertedObjectIDsAfterSearch', {
        index: process.env.ALGOLIA_INDEX,
        eventName: 'Added To Wishlist',
        objectIDs: [objectID],
        queryID,
      });
    });
  }
}

export default ResultPage;