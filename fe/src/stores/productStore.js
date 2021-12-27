import { observable, action, keys, values, entries, makeObservable, computed } from 'mobx';
import * as _ from 'lodash';
import * as productService from '../services/product';

export class ProductStore {
  isLoading = false;
  page = 1;
  total = 0;
  productRegistry = observable.map()
  hasMore = true;
  hasChildren = false;
  form = {};

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      page: observable,
      total: observable,
      productRegistry: observable,
      form: observable,
      products: computed,
      loadProducts: action,
      loadProduct: action,
      createProduct: action,
      updateProduct: action,
      deleteProduct: action,
      getProduct: action,
    })
    // makeAutoObservable(this)
  }

  get products() {
    return entries(this.productRegistry);
  }

  clear() {
    this.productRegistry.clear();
    this.page = 1;
  }

  getProduct(id) {
    return this.productRegistry.get(id);
  }

  setPage(page) {
    this.page = page;
  }

  loadProducts() {
    this.isLoading = true;
    return productService.getProducts(this.page)
      .then(action(({ data }) => {
        // this.productRegistry.clear();
        if (!_.isEmpty(data.data)) {
          const products = data.data;
          this.total = data.total;

          if (this.products.length !== data.total || products.length !== 0) {
            this.hasMore = true;
            products.forEach(product => {
              this.productRegistry.set(product.id, product);
            });
            this.page = data.current_page + 1;
          } else {
            this.hasMore = false;
          }

          return products;
        }

        return [];
      }))
      .finally(action(() => this.isLoading = false))
  }

  loadProduct(id, { acceptCached = false } = {}) {
    if (acceptCached) {
      const product = this.getProduct(id);
      if (product) return Promise.resolve(product);
    }
    return productService.getProduct(id)
      .then(action(({ data }) => {
        this.isLoading = true;
        const product = data.data;
        this.productRegistry.set(product.id, product);
        return product;
      }))
      .finally(action(() => this.isLoading = false))
  }

  createProduct(product) {
    return productService.storeProduct(product)
      .then(action(() => {
        this.page = 1;
        this.loadProducts();
      }))
  }

  updateProduct() {
    const { form } = this

    return productService.updateProduct(form.id, {
      name: form.name,
      price: form.price,
      description: form.description,
      sku: form.sku,
    })
      .then(action(() => {
        // this.page = 1;
        this.loadProducts(); 
      }))
  }

  deleteProduct(id) {
    this.productRegistry.delete(id);
    return productService.deleteProduct(id)
      .then(() => {
        this.clear();
        this.loadProducts();
      })
      .catch(action(err => { 
        this.clear();
        throw err; 
      }));
  }

  showModal(id) {
    const result = this.getProduct(id);
    const form = {}
    keys(result).forEach((item, idx) => {
      form[item] = values(result)[idx];
    })
  }
}

export default new ProductStore();