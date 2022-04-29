import { BaseStruct } from './base';

export class Request extends BaseStruct {
  constructor(raw: Buffer) {
    super(raw);
  }
}
