module.exports = {
  region: {
    one: 'регион',
    many: 'регионы',
    type: {
      one: 'тип региона',
      many: 'тип регионов'
    }
  },

  regionType: {
    one: 'тип региона',
    many: 'тип регионов'
  },

  otdel: {
    one: 'отдел',
    many: 'отделы'
  },

  update: {
    success: {
      one: '{{ unit }} успешно обновлен',
      many: '{{ unit }} успешно обновлены'
    }
  },

  create: {
    success: {
      one: '{{ unit }} успешно создан',
      many: '{{ unit }} успешно созданы'
    },
    failed: {
      one: '{{ unit }} ошибка сохранение',
      many: '{{ unit }} ошибка сохранения записей'
    },
    forbidden: {
      one: '{{ unit }} нет доступа к созданию',
      many: '{{ unit }} нет доступа к созданию записей'
    }
  },

  destroy: {
    success: {
      one: '{{ unit }} успешно удален',
      many: '{{ unit }} успешно удалены'
    }
  },
};