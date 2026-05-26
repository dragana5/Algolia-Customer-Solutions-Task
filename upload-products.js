require('dotenv').config();
const algoliasearch = require('algoliasearch');
const fs = require('fs');

// Load products
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Algolia client
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

const index = client.initIndex(process.env.ALGOLIA_INDEX);

// Transform camera prices: 20% off, rounded down
const updatedProducts = products.map(product => {
  const isCamera = product.categories?.some(cat =>
    cat.toLowerCase().includes('camera')
  );

  if (!isCamera) {
    return {
      ...product
    };
  }

  return {
    ...product,
    price: Math.floor(product.price * 0.8),
  };
});

// Upload to Algolia
index.saveObjects(updatedProducts)
  .then(() => console.log('✅ Products uploaded to Algolia!'))
  .catch(err => console.error('❌ Error:', err));