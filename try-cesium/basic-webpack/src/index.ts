
import Cesium from 'cesium/Cesium';
import {Positions} from './CesiumBindings';
import {BillboardBindings} from './BillboardBindings';
import {PolylineBindings} from './PolylineBindings';

require('cesium/Widgets/widgets.css');

const baseWest = -115;
const baseNorth = 40;

const viewer = new Cesium.Viewer('cesiumContainer');

const ufos = [{
    id: 1,
    position: {lon: -70, lat: 40},
    deltaPosition: {lon: 0.1, lat: 0.1},
    size: 40,
    stealthMode: false,
    history:[],
}, {
    id: 2,
    position: {lon: -72, lat: 42},
    deltaPosition: {lon: 0.1, lat: 0.1},
    size: 20,
    stealthMode: false,
    history:[],

}];

const colorProvider = (m) => m.id % 2 === 0 ? Cesium.Color.RED : Cesium.Color.BLUE;

const ufoBinding = new BillboardBindings(viewer, (model) => ''+model.id)
    .image(() => Math.random()>0.7 ? './assets/images/dot.svg' : './assets/images/empty-circle.svg')
    .color(colorProvider)
    .width((m) => m.size)
    .height((m) => m.size)
    .position((m)=> {
        return [m.position.lon, m.position.lat];
    });

const historyBinding = new PolylineBindings(viewer, (m) => ''+m.id)
  .color(colorProvider)
  .width(4)
  .positions( (m) => m.history);


setInterval(()=>{
    for (let ufo of ufos) {
        ufo.history = ufo.history.concat([ufo.position.lon, ufo.position.lat]);
        ufo.position.lon += ufo.deltaPosition.lon;
        ufo.position.lat += ufo.deltaPosition.lat;

        if (Math.random() > 0.8) {
            ufo.deltaPosition.lon += (Math.random()-0.5)/5;
            ufo.deltaPosition.lat += (Math.random()-0.5)/5;
            ufo.size = Math.random()*45+5;
            ufo.stealthMode = (Math.random()>0.9);
        }
    }

    ufoBinding.update(ufos.filter(u => !u.stealthMode));
    historyBinding.update(ufos.filter(u => !u.stealthMode));

}, 100);



/*
Test
 - simple creation and static attributes
 - all dynamic attributes
 - add, remove, keep models
 - altitude

 - polylines



 */




