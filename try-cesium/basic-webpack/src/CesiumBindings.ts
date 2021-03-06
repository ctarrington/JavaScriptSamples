export type Avatar = {
  remove:()=>void,
  update: (model:any)=>void,
  primitiveId:()=>string
};

export type StringProvider = string | StringResolver;
export type NumberResolver = (model:any) => number;

export type NumberProvider = number | NumberResolver;
export type StringResolver = (model:any) => string;

export type ColorResolver = (model:any) => object;
export type ColorProvider = object | ColorResolver;

export type Position = [number, number];
export type PositionResolver = (model:any) => Position;
export type PositionProvider = Position | PositionResolver;

export type Positions = number[];
export type PositionsResolver = (model:any) => Positions;
export type PositionsProvider = Positions | PositionsResolver;

export type KeyFunction = (model:any) => string;

export function passOrWrap(type:string, provider:any) {
    if (typeof provider === type) {
        return (model:any) => provider;
    }

    return provider;
}

export abstract class CesiumBindings {
  avatarMap: any;
  modelMap: any;
  keyFunction:KeyFunction;

  constructor(keyFunction: KeyFunction) {
    this.keyFunction = keyFunction;
    this.avatarMap = {};
    this.modelMap = {};
  }

  update(models:any[]):void {
    const evicted = (<any>Object).assign({}, this.avatarMap);

    for (let model of models) {
      const key = this.keyFunction(model);
      const existingAvatar = this.avatarMap[key];
      if (existingAvatar) {
        existingAvatar.update(model);
        this.modelMap[existingAvatar.primitiveId()] = model;
        delete evicted[key];
      } else {
        const avatar = this.createAvatar(model);
        this.avatarMap[key] = avatar;
        this.modelMap[avatar.primitiveId()] = model;

      }
    }

    for (let key of Object.keys(evicted)) {
      this.avatarMap[key].remove();
      delete this.avatarMap[key];
    }
  }

  findModel(primitive:any):any {
    if (!primitive || !primitive.id) {
      return null;
    }

    return this.modelMap[primitive.id.id];
  }

  updateOne(model:any):void {
    const key = this.keyFunction(model);
    const existingAvatar = this.avatarMap[key];
    existingAvatar.update(model);
  }
  
  abstract createAvatar(model:any):Avatar;
}

