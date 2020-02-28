
const BASE_FIELDS = [ 'i18n', 'name', 'shortName' ];
const FIELDS = {
  BASE_FIELDS,

  ACCESS: [

  ],

  LOCALES: [

  ],

  MENU: [
    'key'
    ,'data'
    ,'parent_id'
    ,'index'
  ],

  ROLES: [
    'role_i18n'
    ,'role_name'
    ,'role_key'
    ,'role_desc'
    ,'lock'
    ,'active'
    ,'priority'
  ],

  USER_PUBLIC: [
    'name'
    ,'email'
  ],

  USER_PRIVATE: [
    'password'
    ,'tokenId'
    ,'active'
    ,'lock'
  ],

  S_MERA: [
    ...BASE_FIELDS
  ],

  S_REGION_TYPE: [
    ...BASE_FIELDS
  ],

  S_REGION: [
    ...BASE_FIELDS
    ,'parentId'
    ,'sRegionTypeId'
  ],

  S_OTDELENIA: [
    ...BASE_FIELDS
  ],

  S_DOLJNOST: [
    ...BASE_FIELDS
  ],

  S_BOLEZNI: [
    ...BASE_FIELDS
  ],

  S_POKAZATELY: [
    ...BASE_FIELDS
  ],

  S_MATERIAL_TYPE: [
    ...BASE_FIELDS
  ],

  S_MATERIAL_ANIMAL_CLASS: [
    ...BASE_FIELDS
  ],

  S_MATERIAL_ANIMAL_TYPE: [
    ...BASE_FIELDS
    ,'sMaterialAnimalClassId'
  ],

  S_MATERIAL: [
    ...BASE_FIELDS
    ,'sMaterialTypeId'
    ,'sMaterialAnimalTypeId'
    ,'sMaterialColor'
  ],

  S_METOD_ISLEDOVANIE: [
    ...BASE_FIELDS
  ],

  DEPARTMENT: [
    ...BASE_FIELDS
    ,'sRegionId'
    ,'departmentDataJSON'
    ,'isCenter'
  ],

  OTDEL: [
    ...BASE_FIELDS
    ,'departmentId'
    ,'sOtdeleniaId'
    ,'otdelDataJSON'
  ],

  SUB_OTDEL: [
    ...BASE_FIELDS
    ,'otdelId'
    ,'sOtdeleniaId'
  ],

  PERSONAL: [
    'firstName'
    ,'lastName'
    ,'pol'
    ,'personalDataJSON'
    ,'imgFileId'
    ,'addressLiveSRegionId'
    ,'addressBirthSRegionId'
    ,'userId'
    ,'sDoljnostId'
    ,'otdelId'
    ,'subOtdelId'
  ],

  PLAN_RABOTY: [
    'otdelId'
    ,'planCount'
    ,'planKv'
    ,'planYear'
  ],

  NAPRAVLENIE: [
    'zapolnilPersonalId'
    ,'zapolnilDepartmentId'
    ,'zapolnilDate'
    ,'prinyalPersonalId'
    ,'prinyalOtdelId'
    ,'prinyalDate'
    ,'otdelId'
    ,'perenapravilPersonalId'
    ,'dataZapolnenia'
    ,'opPokazatelId'
    ,'probyNapravilJSON'
    ,'probyDostavilJSON'
    ,'oldPrinyalPersonalId'
    ,'oldPrinyalOtdelId'
    ,'oldPrinyalDate'
    ,'status'
  ],

  POS_MATERIAL: [
    'napravlenieId'
    ,'opPokazatelId'
    ,'ownerJSON'
    ,'mestoOtboraSRegionId'
    ,'kemOtobranJSON'
    ,'lechenieInfo'
    ,'sMaterialId'
    ,'materialCount'
    ,'sMeraId'
    ,'vozrast'
    ,'dateZabolivanie'
    ,'dateZaboya'
    ,'dateOtbora'
    ,'dateDostavki'
  ],

  VNYT_NAPRAVLENIE: [
    'napravilPersonalId'
    ,'napravlenDepartmentId'
    ,'napravlenOtdelId'
    ,'napravlenSubOtdelId'
    ,'prinyalPersonalId'
    ,'prinyalOtdelId'
    ,'prinyalSubOtdelId'
    ,'prinyalDate'
    ,'opPokazatelId'
    ,'posMaterialId'
    ,'postMaterialCount'
    ,'posMaterialCheckVid'
    ,'postMaterialCheck'
    ,'status'
  ],

  ISLEDOVANIE: [
    'vnytNapravlenieId'
    ,'otdelId'
    ,'subOtdelId'
    ,'provelIsPersonalId'
    ,'isMaterialCount'
    ,'positiveCount'
    ,'metodId'
    ,'opPokazatelId'
    ,'dateStart'
    ,'dateFinish'
    ,'status'
  ],

  PROTOCOL_ISLEDOVANIE: [
    'vnytNapravlenieId'
    ,'isledovanieId'
    ,'protocolPersonalId'
    ,'protocolDate'
  ]
};

module.exports = FIELDS;