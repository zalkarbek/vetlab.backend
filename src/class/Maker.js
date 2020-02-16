class Maker {
  constructor() {
    this.name = 'maker';
  }

  static makeDateId() {
    return Date.now().toString(36);
  }

  static makeId() {
    return Math.random()
      .toString(36)
      .substr(2, 9);
  }

  static uniqueId(_prefix) {
    const pref = _prefix || '';
    return `${pref + Maker.makeDateId()}-${Maker.makeId()}`;
  }

  static checkDuplicates(generator, count) {
    const hash = {};
    const dupe = [];
    for (let idx = 0; idx < count; idx += 1) {
      const gen = generator(idx); // generate our unique ID

      // if it already exists, then it has been duplicated
      if (typeof hash[gen] !== 'undefined') {
        dupe.push({
          duplicate: gen,
          indexCreated: hash[gen],
          indexDuplicated: idx,
          duplicateCount: dupe.filter((cur) => cur.duplicate === gen).length
        });
      }
      hash[gen] = idx;
    }
    return dupe;
  }
}

module.exports = Maker;
