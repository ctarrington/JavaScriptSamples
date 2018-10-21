
import Cesium from 'cesium/Cesium';
import {BillboardBindings} from './BillboardBindings';
import {PolylineBindings} from './PolylineBindings';

require('cesium/Widgets/widgets.css');
require('./main.css');

const baseWest = -115;
const baseNorth = 40;

const viewer = new Cesium.Viewer('cesiumContainer');

let id = 0;

const createUFO = () => {
    const ufo = {
        id: id++,
        position: {lon: -70, lat: 45},
        deltaPosition: {lon: 0.1, lat: 0.1},
        size: 40,
        stealthMode: false,
        history:[],
    };

    return ufo;
};

const ufos = [];

const colorProvider = (m:any) => m.id % 2 === 0 ? Cesium.Color.RED : Cesium.Color.BLUE;

const ufoBindings = new BillboardBindings(viewer, (model) => ''+model.id)
    .image(() => Math.random()>0.7 ? './assets/images/dot.svg' : './assets/images/empty-circle.svg')
    .color(colorProvider)
    .width((m) => m.size)
    .height((m) => m.size)
    .position((m)=> {
        return [m.position.lon, m.position.lat];
    });

const historyBinding = new PolylineBindings(viewer, (m) => ''+m.id)
  .color(colorProvider)
  .width((m)=>m.size/10)
  .positions( (m) => m.history);


setInterval(()=>{
    if (Math.random() > 0.95 && ufos.length < 5) {
        ufos.push(createUFO());
    }

    for (let ufo of ufos) {
        ufo.history = ufo.history.concat([ufo.position.lon, ufo.position.lat]);
        ufo.position.lon += ufo.deltaPosition.lon;
        ufo.position.lat += ufo.deltaPosition.lat;

        if (Math.random() > 0.8) {
            ufo.deltaPosition.lon += (Math.random()-0.5)/5;
            ufo.deltaPosition.lat += (Math.random()-0.5)/5;
            ufo.size = Math.random()*45+20;
        }

        if (Math.random()>0.98) {
            ufo.stealthMode = !ufo.stealthMode;
        }
    }

    ufoBindings.update(ufos.filter(u => !u.stealthMode));
    historyBinding.update(ufos.filter(u => !u.stealthMode));
}, 100);

const clickHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
clickHandler.setInputAction(function(click:any) {
    const pickedObject = viewer.scene.pick(click.position,30,30);
    let pickedModel = ufoBindings.findModel(pickedObject);
    if (!pickedModel) {
        pickedModel = historyBinding.findModel(pickedObject);
    }
    console.log('pickedModel', pickedModel);

}, Cesium.ScreenSpaceEventType.LEFT_CLICK);



/*
Test
 - use whole div  X
 - altitude in billboard
 - altitude in polyline


 */




