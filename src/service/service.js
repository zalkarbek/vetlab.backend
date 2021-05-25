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
    this.protectedAttributes = ['password', 'tokenId', 'isAdmin'];
    this.protectedAttributesUser = ['password', 'tokenId', 'isAdmin'];
    this.protectedFields = ['password', 'tokenId', 'isAdmin'];
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

  async setSearchOptions({ searchColumn, search, searchPosition }) {
    let wheres = {};
    if(searchColumn && Array.isArray(searchColumn)) {
      searchColumn.forEach((column) => {
        wheres = {
          ...wheres,
          ...this.setSearchPositions({ searchColumn: column, search, searchPosition })
        };
      });
      return wheres;
    }
    return this.setSearchPositions({ searchColumn, search, searchPosition });
  }

  setSearchPositions({ searchColumn, search, searchPosition } = {}) {
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

  async setSearchManyOptions(searches = []) {
    let wheres = {};
    if(searches && Array.isArray(searches) && searches.length >= 1) {
      searches.forEach((searchElement) => {
        wheres = {
          ...this.setSearchOptions(searchElement)
        };
      });
    }
    return wheres;
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
    let safeWhere = {};
    if(where && Object.keys(where).length >= 1) {
      safeWhere = {
        ...where
      };
    }
    return {
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

  async safeFields(fields = [], protectedFields) {
    let safe = [];
    const protectedFs = protectedFields || this.protectedFields;
    if (fields && fields.length >= 1) {
      safe = fields.filter((value) => {
        const compare = protectedFs.filter((field) => {
          return value === field;
        });
        return compare.length === 0;
      });
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
    return newOptions;
  }

  //
  async safeOptionsGet(options = {}) {
    const { where, attributes, ...other } = options;
    let newOptions = { ...other };
    newOptions.where = await this.safeWhere(where);
    newOptions.attributes = this.safeFields(attributes);
    return newOptions;
  }

  //
  async safeOptionsCreateUpdate(options = {}) {
    const { where, fields, ...other } = options;
    let newOptions = { ...other };
    newOptions.where = await this.safeWhere(where);
    newOptions.fields = this.safeFields(fields);
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

  otdeleniaWhereFilter(sOtdeleniaId) {
    return {
      [db.Op.or]: [
        {
          sOtdeleniaId: {
            [db.Op.eq]: sOtdeleniaId
          }
        },
        {
          sOtdeleniaId: {
            [db.Op.is]: null
          }
        }
      ]
    };
  }

  otdeleniaWhereBuild(where = {}, sOtdeleniaId = null) {
    let wh = {};
    if(where && where === 'object') {
      wh = {
        ...where,
        ...this.otdeleniaWhereFilter(sOtdeleniaId)
      };
    } else {
      wh = {
        ...this.otdeleniaWhereFilter(sOtdeleniaId)
      };
    }
    return wh;
  }
}

module.exports = Service;
