const FIELDS = require('./fields');

const GET_REGION_BY_ID = (id) => {
  return {
    Q: 'SELECT * FROM sRegions WHERE id = :id',
    REPLACE: { id }
  };
};

const GET_ACTIVE_PROJECTS = (status) => {
  return {
    Q: 'SELECT * FROM projects WHERE status status = :status ',
    REPLACE: {
      status // status: 'active'
    }
  };
};

const GET_ACTIVE_PROJECTS_IN = (status) => {
  return {
    Q: 'SELECT * FROM projects WHERE status IN(:status) ',
    REPLACE: {
      status // status: ['active', 'inactive']
    }
  };
};

const GET_ACTIVE_PROJECTS_LIKE = (status) => {
  return {
    Q: 'SELECT * FROM projects WHERE status LIKE :status ',
    REPLACE: {
      status // status: 'act%'
    }
  };
};

const GET_USERS_WITH_ROLE = () => {
  return {
    Q: `SELECT ${FIELDS.USER_PUBLIC.join(', ')} FROM users`
  };
};

const GET_REGIONS_FULL_PATH_KG_BY_ID = (id) => {
  return {
    Q: 'SELECT * FROM view_regions_full_path_kg WHERE id = :id',
    REPLACE: {
      id
    }
  };
};

module.exports = {
  GET_REGION_BY_ID,
  GET_ACTIVE_PROJECTS,
  GET_ACTIVE_PROJECTS_IN,
  GET_ACTIVE_PROJECTS_LIKE,
  GET_USERS_WITH_ROLE,
  GET_REGIONS_FULL_PATH_KG_BY_ID
};
