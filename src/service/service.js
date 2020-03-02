const lodash = require('lodash');
const tokenGenerator = require('../helpers/token-generator');
const helpers = require('../helpers');
const db = require('../db/models');
const pathResolve = require( '../../pathResolve');
const EVENTS = require('../data/eventData');
const SOCKS = require('../data/socketData');
const USER_ROLES = require('../data/userRoleData');

const injectMap = new Map();
injectMap.set('inject', {
  lodash
  ,helpers
  ,db
  ,EVENTS
  ,SOCKS
  ,USER_ROLES
  ,pathResolve
});

class Service {
  constructor() {
    this.tokenGenerator = tokenGenerator;
    this._ = lodash;
  }

  async paginate({ page, pageSize }) {
    const offset = Number((page - 1) * pageSize);
    const limit = Number(pageSize);
    return {
      limit,
      offset,
    };
  }

  // при получении пользователей удаляем поля password и tokenId для скрытья полей
  async safeAttributesForUser({ attributes = {} } = {}) {
    let { exclude = ['password', 'tokenId'], include = [] }  = attributes;
    let safe = { exclude };

    if (include.length >= 1) {
      include = include.filter(value => value !== 'password' && value !== 'tokenId');
      safe = {
        include
      };
    }

    if (exclude.length >= 1) {
      safe = {
        exclude: [ 'password', 'tokenId', ...exclude ],
      };
    }

    return { attributes: safe };
  }

  // удаляем поля пароль и tokenId от списка
  async safeOptions(options = {}) {
    let { attributes = {}, fields = [], ...otherOptions } = options;
    let { exclude = [], include = [] }  = attributes;
    let updatedOptions = { ...otherOptions };
    let attrs = {};

    if(include.length >= 1) {
      include = include.filter(value => value !== 'password' && value !== 'tokenId');
      attrs = {
        include
      };
      updatedOptions.attributes = attrs;
    }

    if (exclude.length >= 1) {
      attrs = {
        exclude: [ 'password', 'tokenId', ...exclude ],
      };
      updatedOptions.attributes = attrs;
    }

    if (fields.length >= 1) {
      fields = fields.filter(value => value !== 'password' && value !== 'tokenId');
      updatedOptions.fields = fields;
    }
    return updatedOptions;
  }

  static getInject(injectName) {
    const inject = injectMap.get('inject');
    if(inject.hasOwnProperty(injectName)) {
      return inject[injectName];
    }
  }

  static getHelper(name) {
    return Service.getInject('helpers').getHelper(name);
  }
}

module.exports = Service;
