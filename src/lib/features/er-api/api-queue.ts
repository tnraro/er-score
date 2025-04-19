import { sleep } from "$lib/utils/time/sleep";

export class ApiQueue {
  #queue: {
    task: () => Promise<any>;
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  }[] = [];
  #isRunning = false;
  #delay;
  get delay() {
    return this.#delay;
  }
  constructor(delay: number) {
    this.#delay = delay;
  }
  add<T>(task: () => Promise<T>): Promise<T> {
    const { resolve, reject, promise } = Promise.withResolvers<T>();
    this.#queue.push({
      task,
      resolve,
      reject,
    });
    this.#run();
    return promise;
  }
  async #run() {
    if (this.#isRunning) return;
    this.#isRunning = true;
    while (true) {
      const value = this.#queue.shift();
      if (value == null) break;
      const { task, resolve, reject } = value;
      task().then(resolve).catch(reject);
      await sleep(this.#delay);
    }
    this.#isRunning = false;
  }
}
