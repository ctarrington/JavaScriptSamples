import RingBuffer from './RingBuffer';


export default class ArrayRingBuffer<T> extends RingBuffer<T> {
  private readonly values: (T|null)[];
  private writePosition: number;
  private readPosition: number;

  constructor(capacity: number) {
    super(capacity);
    this.values = new Array<T>(capacity);
    this.readPosition = 0;
    this.writePosition = 0;
  }

  push(value: T): void {
    this.values[this.writePosition++] = value;
    if (this.writePosition >= this.capacity) {
      this.writePosition = 0;
    }
  }

  shift(): T {
    const value = this.values[this.readPosition];
    if (!value) {
      throw new RangeError('No value is available');
    }

    this.values[this.readPosition] = null;
    if (++this.readPosition >= this.capacity) {
      this.readPosition = 0;
    }

    return value;
  }

  available(): boolean {
    return !!this.values[this.readPosition];
  }


}