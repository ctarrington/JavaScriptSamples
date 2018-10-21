import Cesium from 'cesium/Cesium';

import {CesiumBindings, passOrWrap, KeyFunction, StringProvider, StringResolver, ColorProvider, ColorResolver, NumberProvider, NumberResolver, PositionsProvider, PositionsResolver} from './CesiumBindings';

export class PolylineBindings extends CesiumBindings {
  target: any;
  resolveColor: ColorResolver;
  resolveWidth: NumberResolver;
  resolvePositions: PositionsResolver;

  constructor(viewer:any, keyFunction: KeyFunction) {
    super(keyFunction);
    this.target = viewer.entities;
  }

  color(colorProvider:ColorProvider):PolylineBindings {
    this.resolveColor = passOrWrap('object', colorProvider);
    return this;
  }

  width(widthProvider:NumberProvider):PolylineBindings {
    this.resolveWidth = passOrWrap('number', widthProvider);
    return this;
  }

  positions(positionsProvider:PositionsProvider):PolylineBindings {
    this.resolvePositions = passOrWrap('object', positionsProvider);
    return this;
  }

  createAvatar(model:any) {
    const polylineEntity = this.target.add({
      polyline : {
        positions : Cesium.Cartesian3.fromDegreesArray(this.resolvePositions(model)),
        width : this.resolveWidth(model),
        material : new Cesium.ColorMaterialProperty(this.resolveColor(model))
      }
    });

    const update = (model:any) => {
      const points = this.resolvePositions(model);
      const cesiumPoints = Cesium.Cartesian3.fromDegreesArray(points);
      polylineEntity.polyline.positions.setValue(cesiumPoints);

      polylineEntity.polyline.material.color.setValue(this.resolveColor(model));
      polylineEntity.polyline.width.setValue(this.resolveWidth(model));
    };

    const remove = () => {
      this.target.remove(polylineEntity);
    };

    const primitiveId = () => {
      return polylineEntity.id;
    }

    return {remove, update, primitiveId};
  }
}