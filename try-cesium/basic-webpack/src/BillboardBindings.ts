import Cesium from 'cesium/Cesium';

type StringResolver = (model:any) => string;
type StringProvider = string | StringResolver;

type NumberResolver = (model:any) => number;
type NumberProvider = number | NumberResolver;

type ColorResolver = (model:any) => object;
type ColorProvider = object | ColorResolver;

type Position = [number, number];
type PositionResolver = (model:any) => Position;
type PositionProvider = Position | PositionResolver;

type KeyFunction = (model:any) => string;

function passOrWrap(type:string, provider:any) {
    if (typeof provider === type) {
        return (model:any) => provider;
    }

    return provider;
}

export class BillboardBindings {
    target: any;
    avatarMap: any;
    keyFunction:KeyFunction;
    resolveImage: StringResolver;
    resolveColor: ColorResolver;
    resolveWidth: NumberResolver;
    resolveHeight: NumberResolver;
    resolvePosition: PositionResolver;

    constructor(target:any, keyFunction: KeyFunction) {
        this.target = target;
        this.keyFunction = keyFunction;
        this.avatarMap = {};
    }

    update(models:any[]):void {
        const evicted = {...this.avatarMap};

        for (let model of models) {
            const key = this.keyFunction(model);
            const billboard = {
                image: this.resolveImage(model),
                color: this.resolveColor(model),
                width: this.resolveWidth(model),
                height: this.resolveHeight(model),
            };

            const points = this.resolvePosition(model);
            const billboardEntity = this.target.add({
                position: Cesium.Cartesian3.fromDegrees(...points),
                billboard,
            })
        }
    }

    image(imageProvider:StringProvider):BillboardBindings {
        this.resolveImage = passOrWrap('string', imageProvider);
        return this;
    }

    color(colorProvider:ColorProvider):BillboardBindings {
        this.resolveColor = passOrWrap('object', colorProvider);
        return this;
    }

    width(widthProvider:NumberProvider):BillboardBindings {
        this.resolveWidth = passOrWrap('number', widthProvider);
        return this;
    }

    height(heightProvider:NumberProvider):BillboardBindings {
        this.resolveHeight = passOrWrap('number', heightProvider);
        return this;
    }

    position(positionProvider:PositionProvider):BillboardBindings {
        this.resolvePosition = passOrWrap('object', positionProvider);
        return this;
    }
}