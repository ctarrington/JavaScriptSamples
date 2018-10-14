
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
    size: 40,
    stealthMode: false,
}, {
    id: 2,
    position: {lon: -72, lat: 42},
    deltaPosition: {lon: 0.1, lat: 0.1},
    size: 20,
    stealthMode: false,
}];

const ufoBinding = new BillboardBindings(viewer.entities, (model) => ''+model.id)
    .image(() => Math.random()>0.7 ? './assets/images/dot.svg' : './assets/images/empty-circle.svg')
    .color(() => Math.random()>0.9 ? Cesium.Color.BLUE : Cesium.Color.RED)
    .width((m) => m.size)
    .height((m) => m.size)
    .position((m)=> {
        return [m.position.lon, m.position.lat];
    });

const ufoStaticBinding = new BillboardBindings(viewer.entities, (model) => ''+model.id)
    .image('./assets/images/dot.svg')
    .color(Cesium.Color.RED)
    .width(25)
    .height(25)
    .position( [-30, 0]);

ufoStaticBinding.update(ufos);

setInterval(()=>{
    for (let ufo of ufos) {
        ufo.position.lon += ufo.deltaPosition.lon;
        ufo.position.lat += ufo.deltaPosition.lat;

        if (Math.random() > 0.8) {
            ufo.deltaPosition.lon += (Math.random()-0.5)/5;
            ufo.deltaPosition.lat += (Math.random()-0.5)/5;
            ufo.size = Math.random()*45+5;
            ufo.stealthMode = !ufo.stealthMode;
        }
    }


    ufoBinding.update(ufos.filter(u => !u.stealthMode));
}, 100);



/*
Test
 - simple creation and static attributes
 - all dynamic attributes
 - add, remove, keep models
 - altitude

 - polylines



 */




