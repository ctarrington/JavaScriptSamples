
import Cesium from 'cesium/Cesium';
import {BillboardBindings} from './BillboardBindings';

require('cesium/Widgets/widgets.css');

const baseWest = -115;
const baseNorth = 40;

const viewer = new Cesium.Viewer('cesiumContainer');

const dot = {
  image: './assets/images/dot.svg',
  color: Cesium.Color.BLUE,
  width: 25,
  height: 25,
};

const halo = {
  image: './assets/images/empty-circle.svg',
  color: Cesium.Color.YELLOW,
  width: 50,
  height: 50,
};

const dotEntity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(baseWest, baseNorth),
    billboard: dot,
});

const haloEntity = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(baseWest, baseNorth),
  billboard: halo,
});

const line = {
    material : Cesium.Material.fromType(Cesium.Material.PolylineGlowType, {
        glowPower : 0.25,
        color : new Cesium.Color(1.0, 0.5, 0.0, 1.0)
    }),
    positions: Cesium.Cartesian3.fromDegreesArray([-100, 35, -70, 35]),
    width: 2.0,
};

const position = [baseWest, baseNorth];
let deltaLon = 0;
let deltaLat = 0;

const polylines = viewer.scene.primitives.add(new Cesium.PolylineCollection());
const polyline = polylines.add(line);

const ufos = [{
   id: 1,
   position: {lon: -70, lat: 40},
   deltaPosition: {lon: 0.1, lat: 0.1},
},
    {id: 2,
    position: {lon: -72, lat: 42},
deltaPosition: {lon: 0.1, lat: 0.1},
    }];

const ufoBinding = new BillboardBindings(viewer.entities, (model) => ''+model.id)
    .image('./assets/images/empty-circle.svg')
    .color(Cesium.Color.RED)
    .width(50)
    .height(50)
    .position([-30, -80]);

ufoBinding.update(ufos);

/*
Test
 - simple creation and static attributes
 - all dynamic attributes
 - add, remove, keep models
 - altitude


 */




