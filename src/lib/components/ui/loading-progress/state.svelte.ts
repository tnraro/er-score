import { clamp } from "$lib/utils/math";
import { sleep } from "$lib/utils/time";

class State {
  #options = {
    minimum: 0.1,
    speed: 200,
  };
  #t = $state(0);
  get t() {
    return this.#t;
  }
  get isDone() {
    return this.#t > 1;
  }
  get isStarted() {
    return this.#t > 0;
  }
  get show() {
    return this.#t <= 1 && this.#t > 0;
  }
  start() {
    if (this.isStarted) return;
    this.#animate("start");
  }
  done() {
    if (!this.isStarted || this.isDone) return;
    this.#animate("done");
  }
  async #animate(animationName: keyof State["animations"]) {
    this.#currentAnimation = this.animations[animationName]?.() ?? null;

    if (this.#currentAnimation == null) return;

    while (this.#currentAnimation != null) {
      const { done } = await this.#currentAnimation.next();
      if (done) break;
    }
  }
  #currentAnimation: AsyncGenerator<unknown, void, unknown> | null = null;
  private animations = {
    start: async function* (this: State) {
      this.#reset();
      while (this.#t >= 0 && this.#t < 0.997) {
        this.#increase();
        yield await sleep(this.#options.speed);
      }
    }.bind(this),
    done: async function* (this: State) {
      this.#increase(0.3 + Math.random() * 0.4);
      yield await sleep(this.#options.speed);
      this.#set(1);
      yield await sleep(this.#options.speed);
      this.#done();
      yield await sleep(this.#options.speed);
      this.#reset();
    }.bind(this),
  };
  increase(amount?: number) {
    this.#increase(amount);
  }
  #set(t: number) {
    this.#t = clamp(t, this.#options.minimum, 1);
  }
  #increase(amount?: number) {
    if (amount != null) {
      this.#set(this.#t + amount);
      return;
    }

    this.#set(this.#t + getAmount(this.#t));

    function getAmount(n: number) {
      if (n < 0.2) return 0.1;
      if (n < 0.5) return 0.04;
      if (n < 0.8) return 0.02;
      if (n < 0.99) return 0.005;
      if (n < 0.997) return 0.001;
      return 0;
    }
  }
  #reset() {
    this.#t = 0;
  }
  #done() {
    this.#t = 1.01;
  }
}

export const ls = new State();
