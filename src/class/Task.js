class Task {
  constructor(name, once, type, func) {
    this.name = name;
    this.once = once || 0;
    this.type = type || 'default';
    this.func = func;
    this.executed = 0;
    this.stopped = false;
  }

  get Name() {
    return this.name;
  }

  set Name(value) {
    this.name = value;
  }

  get Func() {
    return this.func;
  }

  set Func(value) {
    this.func = value;
  }

  get Executed() {
    return this.executed;
  }

  get Type() {
    return this.type;
  }

  get TaskComplexCompleted() {
    return this.once > 0 && this.once === this.executed;
  }

  get TaskStopped() {
    return (this.once > 0 && this.once === this.executed) || this.stopped;
  }

  taskStop() {
    this.stopped = true;
  }

  run(params) {
    if (this.TaskComplexCompleted) {
      this.func = null;
      this.stopped = true;
      return this.func;
    }
    this.stopped = false;
    this.executed += 1;
    return this.func(params, this);
  }
}

module.exports = Task;
