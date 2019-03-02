export default abstract class RingBuffer<T> {
  protected capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  abstract push(value: T): void;
  abstract shift(): T;
  abstract available(): boolean;
}