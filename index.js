function Product(itemName, price, currency, unitsAvailable, color) {
  this.itemName = itemName;
  this.price = price;
  this.currency = currency;
  this.unitsAvailable = unitsAvailable;
  this.color = color;
}


let catalog = {
  women: [{
    itemName: "women Ultra Flex - Love First",
    price: 10,
    currency: "USD",
    unitsAvailable: 3,
    color: "red"
  }, {
    itemName: "RUMBLERS- WILD CHILD",
    price: 35.5,
    currency: "USD",
    unitsAvailable: 0,
    color: "blue"
  }],

  men: [{
    itemName: "SOLAR FUSE",
    price: 70,
    currency: "USD",
    unitsAvailable: 10,
    color: "red"
  }],

  kids: [{
    itemName: "kids Ultra Flex - Love First",
    price: 10,
    currency: "USD",
    unitsAvailable: 12,
    color: "red"
  }, {
    itemName: "KIDS LIGHTS",
    price: 52,
    currency: "USD",
    unitsAvailable: 4,
    color: "yellow"
  }]
};


function ProductMgr(catalogTobeHandled) {
  this.catalogTobeHandled = catalogTobeHandled;
}

ProductMgr.prototype.getCategories = function() {
  return Object.keys(this.catalogTobeHandled);
};

ProductMgr.prototype.getAllProducts = function() {
  let categories = this.getCategories();

  return categories.reduce((products, category) => {
    products.push(...this.catalogTobeHandled[category]);
    return products;
  }, []);
};

ProductMgr.prototype.getProductsByCategory = function(categoryName) {
  let search = [];

  if (categoryName === undefined) {
    search = this.getAllProducts();
  } else if (this.catalogTobeHandled.hasOwnProperty(categoryName)) {
    search.push(...this.catalogTobeHandled[categoryName]);
  }

  return search;
};

ProductMgr.prototype.getAvailableProducts = function() {
  let categories = this.getCategories();

  return categories.reduce((avalaibleProducts, category) => {
    avalaibleProducts.push(...this.catalogTobeHandled[category].filter((item) => {
      return item.unitsAvailable > 0;
    }));
    return avalaibleProducts;
  }, []);
};


ProductMgr.prototype.addCategory = function(categoryName) {
  this.catalogTobeHandled[categoryName] = [];

  return this.catalogTobeHandled[categoryName];
};

ProductMgr.prototype.getProductsByColor = function(color) {
  let categories = this.getCategories();

  return categories.reduce((productsByColor, category) => {
    productsByColor.push(...this.catalogTobeHandled[category].filter((item) => {
      return item.color === color;
    }));
    return productsByColor;
  }, []);
};

Array.prototype.addProduct = function(itemName, price, currency, unitsAvailable, color) {
  this.push(new Product(itemName, price, currency, unitsAvailable, color));

  return this;
};

let manager = new ProductMgr(catalog);

function renderPLP() {
  let url = location.hash.slice(2);
  let productListHTML = document.getElementById('productList');
  let foundProducts;

  if (url === "") {
    foundProducts = manager.getProductsByCategory();
  } else {
    foundProducts = manager.getProductsByCategory(url);
    // foundProducts = manager.getProductsByColor(url);
  }

  for (let product of foundProducts) {
    let tmpl = document.getElementById('product-template').content.cloneNode(true);
    if (url !== "") {
      tmpl.querySelector('.productList-searchCriteria').innerText = `Search criteria: ${url}`;
    }

    tmpl.querySelector('.productList-itemName').innerText = `Product name: ${product.itemName}`;
    tmpl.querySelector('.productList-price').innerText = `Price: ${product.price} $ ${product.currency}`;
    tmpl.querySelector('.productList-unitsAvailable').innerText = `Units avalaible: ${product.unitsAvailable}`;
    tmpl.querySelector('.productList-color').innerText = `Color: ${product.color}`;

    productListHTML.appendChild(tmpl);

  }
}

function reload() {
  return document.location.reload(true)
}

window.addEventListener('hashchange', reload);
window.addEventListener('hashchange', renderPLP);
window.addEventListener('load', renderPLP);
