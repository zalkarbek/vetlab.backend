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

const GET_PDK_BY_POKAZATEL_ID_AND_MATERIAL = (pokazatelId, materialTypes = [], materialAnimalTypes = []) => {
  return {
    Q: `
      SELECT 
        spdk.id
        ,spdk.sPokazatelId
        ,spdk.pdkType
        ,spdk.pdkJSON
        ,spdk.pdkMera
        ,spdk.materialTypeJSON
        ,spdk.sMaterialAnimalTypeJSON
        ,spdk.materialJSON
        ,sp.shortName AS name
        ,sp.shortName AS shortName
        ,sp.sOtdeleniaId AS sOtdeleniaId
        ,sp.timeCount AS timeCount
        FROM s_pokazatel_pdk spdk
          INNER JOIN s_pokazately sp 
            ON spdk.sPokazatelId = sp.id
        WHERE
          spdk.sPokazatelId = :pokazatelId
          AND (
            JSON_CONTAINS(spdk.materialTypeJSON->'$[*].id', CAST(:materialTypes AS JSON), '$')
            OR
            JSON_CONTAINS(spdk.sMaterialAnimalTypeJSON->'$[*].id', CAST(:materialAnimalTypes AS JSON), '$')
          );
    `,
    REPLACE: {
      pokazatelId,
      materialTypes: JSON.stringify(materialTypes),
      materialAnimalTypes: JSON.stringify(materialAnimalTypes)
    }
  };
};

// Данные о отделе
const GET_OTDEL_DATA_ID = (otdelId) => {
  return {
    Q: `
      SELECT 
      d.id AS departmentId
      ,sotd.id AS otdeleniaId
      ,otd.id AS otdelId
      ,otd.departmentId AS otdelDepartmentId
      ,otd.headPersonalId
      ,otd.name AS otdelName
      ,otd.shortName AS otdelShortName
      ,sotd.name AS otdeleniaName
      ,sotd.shortName AS otdeleniaShortName
      ,d.name AS departmentName
      ,d.shortName AS departmentShortName
      ,otd.otdelDataJSON
      ,d.regionJSON
      ,d.departmentDataJSON
      ,d.isCenter
      ,sotd.reportTitleName AS otdeleniaReportTitleName
      ,sotd.reportFooterName AS otdeleniaReportFooterName
      ,d.reportTitleName AS departmentTitleName
      ,d.reportFooterName AS departmentFooterName
      FROM otdely otd
      INNER JOIN s_otdelenia sotd
        ON sotd.id = otd.sOtdeleniaId
      INNER JOIN departments d
        ON d.id = otd.departmentId
      WHERE otd.id = :otdelId
    `,
    REPLACE: {
      otdelId
    }
  };
};

// Получить список сотрудников по должности и по отделу
const GET_PERSONALS_BY_POSITION_AND_OTDELID = (doljnost, otdelId) => {
  return {
    Q: `
      SELECT
      \t p.id AS id
      \t , p.otdelId
      \t , CONCAT(
      \t\t\tp.lastName, ' ', 
      \t\t\tLEFT(p.firstName, 1),
      \t\t\t'.', 
      \t\t\tIF(p.patronymicName IS NOT NULL, CONCAT(LEFT(p.patronymicName, 1), '.'), '')
      \t\t) AS fullName
      \t , sd.name AS doljnostName
      \tFROM personal p
      \tINNER JOIN s_doljnosti sd
      \t\tON p.sDoljnostId = sd.id
      \tWHERE LOWER(sd.name) = :doljnost AND p.otdelId = :otdelId
    `,
    REPLACE: {
      otdelId,
      doljnost
    }
  };
};

// Получить список сотрудников по ключу должности и по отделу
const GET_PERSONALS_BY_POSITION_KEY_AND_OTDELID = (doljnostKey = null, otdelId = null) => {
  return {
    Q: `
      SELECT
      \t p.id AS id
      \t , p.otdelId
      \t , CONCAT(
      \t\t\tp.lastName, ' ', 
      \t\t\tLEFT(p.firstName, 1),
      \t\t\t'.', 
      \t\t\tIF(p.patronymicName IS NOT NULL, CONCAT(LEFT(p.patronymicName, 1), '.'), '')
      \t\t) AS fullName
      \t , sd.name AS doljnostName
      \tFROM personal p
      \tINNER JOIN s_doljnosti sd
      \t\tON p.sDoljnostId = sd.id
      \tWHERE LOWER(sd.shortkey) = :doljnostKey AND p.otdelId = :otdelId
    `,
    REPLACE: {
      otdelId,
      doljnostKey
    }
  };
};

module.exports = {
  GET_REGION_BY_ID,
  GET_ACTIVE_PROJECTS,
  GET_ACTIVE_PROJECTS_IN,
  GET_ACTIVE_PROJECTS_LIKE,
  GET_USERS_WITH_ROLE,
  GET_REGIONS_FULL_PATH_KG_BY_ID,
  GET_PDK_BY_POKAZATEL_ID_AND_MATERIAL,
  GET_OTDEL_DATA_ID,
  GET_PERSONALS_BY_POSITION_AND_OTDELID,
  GET_PERSONALS_BY_POSITION_KEY_AND_OTDELID
};
