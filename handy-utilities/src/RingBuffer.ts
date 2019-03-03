export default abstract class RingBuffer<T> {
  protected capacity: number;

  protected constructor(capacity: number) {
    this.capacity = capacity;
  }

  getCapacity(): number {
    return this.capacity;
  }

  abstract push(value: T): void;
  abstract shift(): T;
  abstract available(): boolean;
  abstract clear(): void;
  abstract debug(msg: string): void;
}