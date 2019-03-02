import {concatenateBuffers} from "./util";

export type AccumulationCallback = (data: ArrayBuffer) => void;

const SIZEOF_INT32 = 4;

export default class Accumulator {
  delimiter: number;
  onAccumulation: AccumulationCallback

  rawBuffer: ArrayBuffer;
  rawPosition: number;

  buffer: ArrayBuffer;
  bufferPosition: number;

  constructor(onAccumulation: AccumulationCallback, delimiter: number = 0xDADABEEF) {
    this.onAccumulation = onAccumulation;
    this.delimiter = delimiter;

    this.rawBuffer = new ArrayBuffer(0);
    this.rawPosition = 0;

    this.buffer = new ArrayBuffer(0);
    this.bufferPosition = 0;
  }

  add(data: ArrayBuffer) {
    if (!data || data.byteLength === 0) { return; }

    if (this.rawBuffer.byteLength === 0) {
      this.rawBuffer = data;
    } else {
      this.rawBuffer = concatenateBuffers(this.rawBuffer, data);
    }

    if (this.rawPosition === 0) {
      this.seekToDelimiter();
    }

    if (this.rawPosition === 0) {
      return;
    }

    if (this.buffer.byteLength === 0) {
      this.seekToLength();
    }

    if (this.buffer.byteLength === 0) {
      return;
    }

    this.copyBytes();

    if (this.bufferPosition === this.buffer.byteLength) {
      this.finishAccumulation();
    }
  }

  private copyBytes() {
    const bufferView = new Uint8Array(this.buffer);

    const availableBytes = this.rawBuffer.byteLength - this.rawPosition;
    const neededBytes = this.buffer.byteLength - this.bufferPosition;
    const takeBytes = Math.min(availableBytes, neededBytes);

    const rawView = new Uint8Array(this.rawBuffer, this.rawPosition, takeBytes);
    bufferView.set(rawView, this.bufferPosition);
    this.rawPosition += takeBytes;
    this.bufferPosition += takeBytes;
  }

  private finishAccumulation() {
    this.onAccumulation(this.buffer);
    this.buffer = new ArrayBuffer(0);
    this.bufferPosition = 0;

    this.rawBuffer = new Uint8Array(this.rawBuffer, this.rawPosition);
    this.rawPosition = 0;
  }

  private seekToDelimiter() {
    const rawView = new Uint32Array(this.rawBuffer);
    const length = this.rawBuffer.byteLength / SIZEOF_INT32;

    for (let ctr = 0; ctr < length; ctr++) {
      if (rawView[ctr] === this.delimiter) {
        this.rawPosition = (ctr+1) * SIZEOF_INT32;
        return;
      }
    }
  }

  private seekToLength() {
    if (this.rawBuffer.byteLength - this.rawPosition > SIZEOF_INT32) {
      const rawView = new Uint32Array(this.rawBuffer, this.rawPosition);
      const length = rawView[0];
      this.buffer = new ArrayBuffer(length);
      this.rawPosition += SIZEOF_INT32;
    }
  }
}