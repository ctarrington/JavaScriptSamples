
import Cesium from 'cesium/Cesium';
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

const dotEntity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(baseWest, baseNorth),
    billboard: dot,
});

const line = {
    material : Cesium.Material.fromType(Cesium.Material.PolylineGlowType, {
        glowPower : 0.25,
        color : new Cesium.Color(1.0, 0.5, 0.0, 1.0)
    }),
    positions: Cesium.Cartesian3.fromDegreesArray([-100, 35, -70, 35]),
    width: 2.0,
};

const polylines = viewer.scene.primitives.add(new Cesium.PolylineCollection());
const polyline = polylines.add(line);

setInterval(()=>{
    const newPosition = Cesium.Cartesian3.fromDegrees(baseWest+Math.random(), baseNorth+Math.random());
    dotEntity.position.setValue(newPosition);
}, 200);




