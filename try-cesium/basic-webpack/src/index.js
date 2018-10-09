
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

setInterval(()=>{
    const newPosition = Cesium.Cartesian3.fromDegrees(baseWest+Math.random(), baseNorth+Math.random());
    dotEntity.position.setValue(newPosition);
}, 200);




