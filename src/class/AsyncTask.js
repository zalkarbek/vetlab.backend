const Task = require('./Task');
const TimeOut = require('./TimeOut');

class AsyncTask extends Task {
  constructor({ name, once, func }) {
    super(name, once, 'async', func);
    this.timer = new TimeOut();
    this.state = 'ready';
  }

  async run(params) {
    return super.run(params);
  }

  /**
   * Запускает задача после определенного времени
   * @param params
   * @param wait
   * @returns {Promise<T | never>}
   */
  // eslint-disable-next-line require-await
  async runDebounce(params, wait) {
    this.state = 'debounce';
    return this.timer.pause(wait).then(() => {
      this.state = 'ready';
      return super.run(params);
    });
  }

  /**
   * Отменяет последную запланированную задачу
   * @returns {boolean}
   */
  cancelDebounce() {
    this.timer.cancel();
    this.state = 'ready';
    return true;
  }

  cancelTask() {
    this.cancelDebounce();
    this.taskStop();
  }

  // eslint-disable-next-line require-await
  async runEvery(params, interval) {
    if (this.state === 'ready') {
      if (this.TaskStopped) {
        this.cancelTask();
        return false;
      }
      return this.runDebounce(params, interval).then(() =>
        this.runEvery(params, interval)
      );
    }
    return false;
  }
}

module.exports = AsyncTask;
