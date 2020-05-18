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
  constructor({ modelName } = {}) {
    this.tokenGenerator = tokenGenerator;
    this._ = lodash;
    this.protectedAttributes = ['password', 'tokenId'];
    this.protectedAttributesUser = ['password', 'tokenId'];
    this.modelName = modelName;
  }

  getObjectOneOfTwo(obj1, obj2, defaultObj = {}) {
    if(Object.keys(obj1).length >= 1)
      return obj1;
    if(Object.keys(obj2).length >= 1)
      return obj2;
    return defaultObj;
  }

  getTrueObjectInArray() {
    if(arguments.length >= 1) {
      const arr = [ ...arguments ];
      return arr.find((obj) => Object.keys(obj).length >= 1);
    }
    return {};
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
    let where = {};
    if(condition.action === 'substring') {
      where = {
        [condition.column]: {
          [db.Op.substring]: condition.value
        }
      };
    }
    if(condition.action === 'startsWith') {
      where = {
        [condition.column]: {
          [db.Op.startsWith]: condition.value
        }
      };
    }
    if(condition.action === 'endsWith') {
      where = {
        [condition.column]: {
          [db.Op.endsWith]: condition.value
        }
      };
    }
    return where;
  }

  async safeWhere(where = {}) {
    let searchWhere = {};
    let safeWhere = {};
    if(where.searchColumn && where.search) {
      safeWhere = await this.setSearchPositions(options);
    }
    if(where && Object.keys(where).length >= 1) {
      safeWhere = {
        ...where
      };
    }
    return {
      ...searchWhere,
      ...safeWhere
    };
  }

  async safeAttributes(attributes = [], protectedAttrs) {
    let safe = [];
    const protectedAttributes = protectedAttrs || this.protectedAttributes;
    if (Array.isArray(attributes) && attributes.length >= 1) {
      safe = attributes.filter((value) => {
        const compare = protectedAttributes.filter((attr) => {
          return value === attr;
        });
        return compare.length === 0;
      });
    }

    if(attributes && Object.keys(attributes).length >= 1) {
      let { exclude = [], include = [] }  = attributes;

      if(include.length >= 1) {
        include = include.filter((value) => {
          const compare = protectedAttributes.filter((attr) => {
            return value === attr;
          });
          return compare.length === 0;
        });
        safe = { include };
      }

      if (exclude.length >= 1) {
        const unique = new Set([...protectedAttributes, ...exclude]);
        safe = { exclude: [ ...unique ] };
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
  async safeAttributesForUser({ attributes = {}, protectedAttrs } = {}) {
    const protectedAttributes = protectedAttrs || this.protectedAttributesUser;
    const { exclude = [...protectedAttributes], include = [] }  = attributes;

    return { attributes: await this.safeAttributes({ exclude, include }) };
  }

  // удаляем поля пароль и tokenId от списка
  async safeOptions(options = {}) {
    let newOptions = { ...options };

    if(options && options.attributes) {
      newOptions.attributes = await this.safeAttributes(options.attributes);
    }

    if(options && options.where) {
      newOptions.where = await this.safeWhere(options.where);
    }

    if(options && options.fields) {
      newOptions.fields = this.safeFields(options.fields);
    }
    console.log(newOptions);
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
