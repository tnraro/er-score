import { sleep } from "$lib/utils/time/sleep";

type Queue = {
  task: () => Promise<any>;
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[];

export enum ApiQueuePriority {
  Main,
  Sub,
}

export class ApiQueue {
  #queue: {
    [ApiQueuePriority.Main]: Queue;
    [ApiQueuePriority.Sub]: Queue;
  } = {
    [ApiQueuePriority.Main]: [],
    [ApiQueuePriority.Sub]: [],
  };
  #isRunning = false;
  #delay;
  get delay() {
    return this.#delay;
  }
  constructor(delay: number) {
    this.#delay = delay;
  }
  add<T>(task: () => Promise<T>, priority: ApiQueuePriority = ApiQueuePriority.Main): Promise<T> {
    const { resolve, reject, promise } = Promise.withResolvers<T>();
    this.#queue[priority].push({
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
      const value = this.#shift();
      if (value == null) break;
      const { task, resolve, reject } = value;
      task().then(resolve).catch(reject);
      await sleep(this.#delay);
    }
    this.#isRunning = false;
  }
  #shift() {
    if (this.#queue[ApiQueuePriority.Main].length > 0) {
      return this.#queue[ApiQueuePriority.Main].shift();
    }
    return this.#queue[ApiQueuePriority.Sub].shift();
  }
}
