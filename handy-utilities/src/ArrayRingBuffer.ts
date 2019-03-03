import RingBuffer from './RingBuffer';


export default class ArrayRingBuffer<T> extends RingBuffer<T> {
  private readonly values: (T | null)[];
  private writePosition: number;
  private readPosition: number;

  constructor(capacity: number) {
    super(capacity);
    this.values = new Array<T>(capacity);
    this.readPosition = 0;
    this.writePosition = 0;
  }

  private incrementReadPosition() {
    if (++this.readPosition >= this.capacity) {
      this.readPosition = 0;
    }
  }

  private incrementWritePosition() {
    if (++this.writePosition >= this.capacity) {
      this.writePosition = 0;
    }
  }

  push(value: T): void {
    if (this.values[this.writePosition] !== null) {
      this.incrementReadPosition();
    }

    this.values[this.writePosition] = value;
    this.incrementWritePosition();
  }

  shift(): T {
    const value = this.values[this.readPosition];
    if (value === null) {
      throw new RangeError('No value is available');
    }

    this.values[this.readPosition] = null;
    this.incrementReadPosition();

    return value;
  }

  available(): boolean {
    return this.values[this.readPosition] !== null;
  }

  clear(): void {
    for (let pos = 0; pos < this.values.length; pos++) {
      this.values[pos] = null;
    }

    this.readPosition = 0;
    this.writePosition = 0;
  }

  debug(msg: string): void {
    console.log('\n' + msg);
    console.log(`readPosition: ${this.readPosition}, writePosition: ${this.writePosition}`);
    console.log('values: ' + this.values);
  }
}