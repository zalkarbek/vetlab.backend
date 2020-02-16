import AsyncTask from './AsyncTask';
const Maker = require('./Maker');
import { TimeOut } from './TimeOut';

/**
 * Класс для работы группами задач
 */
class TaskGroup {
  constructor(taskGroupName, tasks) {
    this.tasks = new Map();
    this.timer = new TimeOut();
    this.taskGroupName = taskGroupName;
    if (Array.isArray(tasks) && tasks.length >= 1) {
      tasks.forEach((task) => {
        const name = task.name || Maker.uniqueId();
        const once = task.once || 0;
        const { func } = task;
        this.tasks.set(
          name,
          new AsyncTask({
            name,
            once,
            func
          })
        );
      });
    }
    return taskGroupName;
  }

  /**
   * Имя Группа Задач
   * @returns {*}
   * @constructor
   */
  get Name() {
    return this.taskGroupName;
  }

  getTasksExcept(tasks, exceptTask) {
    tasks = tasks || this.tasks;
    const filteredTasks = [];
    tasks.forEach((tsk) => {
      if (exceptTask.Name !== tsk.Name) filteredTasks.push(tsk);
    });
    return filteredTasks;
  }

  /**
   *
   * @param tasks
   * @returns {string}
   */
  firstTask(tasks) {
    let result = null;
    let i = 1;
    tasks = tasks || this.tasks;
    tasks.forEach((task) => {
      if (i === 1) {
        result = task;
      }
      i += 1;
    });
    return result;
  }

  /**
   * Добавить одну задачу
   * @param name
   * @param once
   * @param func
   * @returns {*}
   */
  addTask(name, once, func) {
    name = name || Maker.uniqueId();
    this.tasks.set(
      name,
      new AsyncTask({
        name,
        once,
        func
      })
    );
    return name;
  }

  /**
   * Добавть массив задач к группе
   * @param tasks
   */
  addTasks(tasks) {
    if (Array.isArray(tasks) && tasks.length >= 1) {
      tasks.forEach((task) => {
        const name = task.name || Maker.uniqueId();
        const once = task.once || 0;
        const { func } = task;
        this.tasks.set(
          name,
          new AsyncTask({
            name,
            once,
            func
          })
        );
      });
    }
  }

  clear() {
    this.tasks.clear();
  }

  delete(taskName) {
    return this.tasks.delete(taskName);
  }

  /**
   * Проверяет еслть задачи с таким именем
   * @param name
   * @returns {boolean}
   */
  taskExists(name) {
    return this.tasks.has(name);
  }

  /**
   * Запустить задачу с именем name
   * @param name: Имя задачи
   * @param params
   * @returns {Promise<*>}
   */
  // eslint-disable-next-line require-await
  async runTaskByName(name, params = {}) {
    if (this.taskExists(name)) {
      return this.tasks.get(name).run(params);
    }
    return false;
  }

  // eslint-disable-next-line require-await
  async runTaskByNameDebounce(name, wait, params = {}) {
    if (this.taskExists(name)) {
      return this.tasks.get(name).runDebounce(params, wait);
    }
    return false;
  }

  // eslint-disable-next-line require-await
  async runTasksParallel(tasks) {
    if (Array.isArray(tasks) && tasks.length >= 1) {
      tasks.forEach((task) => {
        const { name, params } = task;
        this.runTaskByName(name, params);
      });
    }
    return true;
  }

  // eslint-disable-next-line require-await
  async runTasksParallelDebounce(tasks) {
    if (Array.isArray(tasks) && tasks.length >= 1) {
      tasks.forEach((task) => {
        const { name, params, wait } = task;
        this.runTaskByNameDebounce(name, wait, params);
      });
    }
    return true;
  }

  async runTasksParallelWithPause(tasks, pause) {
    if (Array.isArray(tasks) && tasks.length >= 1) {
      const { name, params } = tasks[0];
      const filtered = tasks.filter((task, index) => index !== 0);
      if (this.taskExists(name)) {
        await this.timer.pause(pause);
        this.runTaskByName(name, params);
        this.runTasksParallelWithPause(filtered, pause);
      }
    }
    return true;
  }

  /**
   * Запускает массив задач один за другим
   * @param tasks: массив задач
   * @returns {Promise<boolean>}
   */
  async runTasksOneByOne(tasks) {
    if (Array.isArray(tasks) && tasks.length >= 1) {
      const { name, params } = tasks[0];
      const filtered = tasks.filter((task, index) => index !== 0);
      if (this.taskExists(name)) {
        await this.runTaskByName(name, params);
        this.runTasksOneByOne(filtered);
      }
    }
    return true;
  }

  /**
   * Запускает массив задач один за другим с учетом ожидании wait
   * @param tasks: массив задач
   * @returns {Promise<boolean>}
   */
  async runTasksOneByOneDebounce(tasks) {
    if (Array.isArray(tasks) && tasks.length >= 1) {
      const { name, params, wait } = tasks[0];
      const filtered = tasks.filter((task, index) => index !== 0);
      if (this.taskExists(name)) {
        await this.runTaskByNameDebounce(name, wait, params);
        this.runTasksOneByOneDebounce(filtered);
      }
    }
    return true;
  }

  /**
   * Запускает массив задач один за другим с учетом ожидании pause для всех одинаковый
   * @param tasks: массив задач
   * @param pause
   * @returns {Promise<boolean>}
   */
  async runTasksOneByOneWithPause(tasks, pause) {
    if (Array.isArray(tasks) && tasks.length >= 1) {
      const { name, params } = tasks[0];
      const filtered = tasks.filter((task, index) => index !== 0);
      if (this.taskExists(name)) {
        await this.timer.pause(pause);
        await this.runTaskByName(name, params);
        this.runTasksOneByOneWithPause(filtered, pause);
      }
    }
    return true;
  }

  /**
   * Запускает задачи после запуска первой переданной задачи
   * Если первая функция завершился успешно и возратиль true значение
   * То запускаем массив задач taskNames
   * @param name: Имя первой задачи
   * @param params: Параметры первой задачи
   * @param tasks: Массив запускаемых задач
   * @returns {Promise<boolean>}
   */
  async runTasksOneByOneAfter({ name, params = {} }, tasks) {
    if (this.taskExists(name)) {
      try {
        const result = await this.runTaskByName(name, params);
        if (result) this.runTasksOneByOne(tasks);
      } catch (e) {
        throw e;
      }
    }
    return true;
  }

  /**
   * Запускает массив задач поочередно, после запуска первой задачи
   *  с ожиданием wait
   * @param name: имя первой задачи
   * @param wait: время ожидание перед запуском первой задачи
   * @param params: параметры первой задачи
   * @param tasks: массив запускаемых задач
   * @returns {Promise<boolean>}
   */
  async runTasksOneByOneAfterDebounce({ name, wait, params = {} }, tasks) {
    if (this.taskExists(name)) {
      try {
        const result = await this.runTaskByNameDebounce(name, wait, params);
        if (result) this.runTasksOneByOne(tasks);
      } catch (e) {
        throw e;
      }
    }
    return true;
  }

  /**
   * Запускает массив задач по очередно с ожидаением pause,
   * после запуска первой задачи с ожиданием wait
   * @param name: имя первой задачи
   * @param wait: сколько надо ждать чтобы запустить первую задачу
   * @param pause: интервал ожидание между массивами задач
   * @param params: параметры первой задачи
   * @param tasks: массив запускаемых задач
   * @returns {Promise<boolean>}
   */
  async runTasksOneByOneAfterDebounceWithPause(
    { name, wait, params = {}, pause },
    tasks
  ) {
    if (this.taskExists(name)) {
      try {
        const result = await this.runTaskByNameDebounce(name, wait, params);
        await this.timer.pause(pause || 4);
        if (result) this.runTasksOneByOne(tasks);
      } catch (e) {
        throw e;
      }
    }
    return true;
  }

  // eslint-disable-next-line require-await
  async runAllTasksParallel() {
    this.tasks.forEach((task) => {
      const name = task.Name;
      this.runTaskByName(name);
    });
    return true;
  }

  async runAllTasksParallelWithPause(pause, tasks) {
    tasks = tasks || this.tasks;
    if (Array.isArray(tasks) && tasks.length === 0) return true;
    const firstTask = this.firstTask(tasks);
    const filteredTasks = this.getTasksExcept(tasks, firstTask);
    await this.timer.pause(pause);
    this.runTaskByName(firstTask.Name);
    this.runAllTasksParallelWithPause(pause, filteredTasks);
    return true;
  }

  async runAllTasksOneByOne(tasks) {
    tasks = tasks || this.tasks;
    if (Array.isArray(tasks) && tasks.length === 0) return true;
    const firstTask = this.firstTask(tasks);
    const filteredTasks = this.getTasksExcept(tasks, firstTask);
    await this.runTaskByName(firstTask.Name);
    this.runAllTasksOneByOne(filteredTasks);
    return true;
  }

  async runAllTasksOneByOneWithPause(pause, tasks) {
    tasks = tasks || this.tasks;
    if (Array.isArray(tasks) && tasks.length === 0) return true;
    const firstTask = this.firstTask(tasks);
    const filteredTasks = this.getTasksExcept(tasks, firstTask);
    await this.timer.pause(pause);
    await this.runTaskByName(firstTask.Name);
    this.runAllTasksOneByOneWithPause(pause, filteredTasks);
    return true;
  }
}

module.exports = TaskGroup;
