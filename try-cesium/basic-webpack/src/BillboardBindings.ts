import Cesium from 'cesium/Cesium';

import {CesiumBindings, passOrWrap, KeyFunction, StringProvider, StringResolver, ColorProvider, ColorResolver, NumberProvider, NumberResolver, PositionProvider, PositionResolver} from './CesiumBindings';

export class BillboardBindings extends CesiumBindings {
    target: any;
    resolveImage: StringResolver;
    resolveColor: ColorResolver;
    resolveWidth: NumberResolver;
    resolveHeight: NumberResolver;
    resolvePosition: PositionResolver;

    constructor(viewer:any, keyFunction: KeyFunction) {
        super(keyFunction);
        this.target = viewer.entities;
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

    createAvatar(model:any) {
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
        });

        const update = (model:any) => {
            const points = this.resolvePosition(model);
            const cesiumPoints = Cesium.Cartesian3.fromDegrees(...points);
            billboardEntity.position.setValue(cesiumPoints);

            billboardEntity.billboard.image.setValue(this.resolveImage(model));
            billboardEntity.billboard.color.setValue(this.resolveColor(model));
            billboardEntity.billboard.width.setValue(this.resolveWidth(model));
            billboardEntity.billboard.height.setValue(this.resolveHeight(model));
        };

        const remove = () => {
            this.target.remove(billboardEntity);
        };

        return {remove, update, id:billboardEntity.id.id};
    }
}