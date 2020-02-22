const injectMap = new Map();

class Kernel {
  static binding(injection) {
    injectMap.set('inject', injection);
  }

  static getInject(injectName) {
    const inject = injectMap.get('inject');
    if(inject.hasOwnProperty(injectName)) {
      return inject[injectName];
    }
  }
}

module.exports.Kernel = Kernel;