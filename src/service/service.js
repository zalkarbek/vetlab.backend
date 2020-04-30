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

  async getPaginateAttrs({ page = 1, pageSize = 10 } = {}) {
    const offset = Number((page - 1) * pageSize);
    const limit = Number(pageSize);
    return {
      limit,
      offset,
    };
  }

  async setSearchPositions({ searchColumn, search, searchPosition } = {}) {
    let where = {};
    if(searchPosition === 'startsWith')
      where = {
        [searchColumn]: {
          [db.Op.startsWith]: search
        }
      };
    else if(searchPosition === 'endsWith')
      where = {
        [searchColumn]: {
          [db.Op.endsWith]: search
        }
      };
    else if(searchColumn)
      where = {
        [searchColumn]: {
          [db.Op.substring]: search
        }
      };
    return where;
  }

  async setWhereOptions(condition) {
    let whereResult = {};
    if(condition.action === 'substring') {
      whereResult = {
        [condition.column]: {
          [db.Op.substring]: condition.value
        }
      };
    }
    if(condition.action === 'startsWith') {
      whereResult = {
        [condition.column]: {
          [db.Op.startsWith]: condition.value
        }
      };
    }
    if(condition.action === 'endsWith') {
      whereResult = {
        [condition.column]: {
          [db.Op.endsWith]: condition.value
        }
      };
    }
    return whereResult;
  }

  async safeWhere(options = {}) {
    let searchWhere = {};
    let safeWhere = {};
    if(options.searchColumn && options.search) {
      safeWhere = await this.setSearchPositions(options);
    }
    if(options && options.where && Object.keys(options.where).length >= 1) {
      safeWhere = {
        ...options.where
      };
    }
    return {
      ...searchWhere,
      ...safeWhere
    };
    // where: {
    //   column: 'name',
    //   action: 'searchColumn',
    //   value: 'text'
    // }
  }

  async safeAttributes(attributes = []) {
    let safe = [];
    if (Array.isArray(attributes) && attributes.length >= 1) {
      safe = attributes.filter((value) => {
        return value !== 'password' && value !== 'tokenId';
      });
    }

    if(attributes && Object.keys(attributes).length >= 1) {
      let { exclude = [], include = [] }  = attributes;

      if(include.length >= 1) {
        include = include.filter(value => value !== 'password' && value !== 'tokenId');
        safe = { include };
      }

      if (exclude.length >= 1) {
        safe = { exclude: [ 'password', 'tokenId', ...exclude ] };
      }
    }

    return safe;
  }

  async safeFields(fields = []) {
    let safe = [];
    if (fields && fields.length >= 1) {
      safe = fields.filter(value => value !== 'password' && value !== 'tokenId');
    }
    return safe;
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
    let newOptions = {};

    if(options && options.attributes) {
      newOptions.attributes = await this.safeAttributes(options.attributes);
    }

    if(options && options.fields) {
      newOptions.fields = this.safeFields(options.fields);
    }

    return newOptions;
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
