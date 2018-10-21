
import Cesium from 'cesium/Cesium';
import {BillboardBindings} from './BillboardBindings';
import {PolylineBindings} from './PolylineBindings';

require('cesium/Widgets/widgets.css');
require('./main.css');

const viewer = new Cesium.Viewer('cesiumContainer');
let id = 0;

const createUFO = () => {
    const ufo = {
        id: id++,
        position: {lon: -70+Math.random()*3, lat: 45+Math.random()*3},
        deltaPosition: {lon: 0.1, lat: 0.1},
        anger: 20,
        stealthMode: false,
        history:[],
        selected: false,
    };

    return ufo;
};

const ufos = [];
ufos.push(createUFO());


const colorProvider = (m:any) => {
    if (m.selected) {
        return Cesium.Color.YELLOW;
    }
    return m.id % 2 === 0 ? Cesium.Color.RED : Cesium.Color.BLUE;
}

const ufoBindings = new BillboardBindings(viewer, (model) => ''+model.id)
    .image((m) => m.anger > 30 ? './assets/images/dot.svg' : './assets/images/empty-circle.svg')
    .color(colorProvider)
    .width((m) => m.anger)
    .height((m) => m.anger)
    .position((m)=> {
        return [m.position.lon, m.position.lat];
    });

const historyBinding = new PolylineBindings(viewer, (m) => ''+m.id)
  .color(colorProvider)
  .width((m)=>m.anger/7)
  .positions( (m) => m.history);


setInterval(()=>{
    if (Math.random() > 0.9 && ufos.length < 5) {
        ufos.push(createUFO());
    }

    for (let ufo of ufos) {
        ufo.history = ufo.history.concat([ufo.position.lon, ufo.position.lat]);
        ufo.position.lon += ufo.deltaPosition.lon;
        ufo.position.lat += ufo.deltaPosition.lat;
        ufo.anger = ufo.anger + 1;
        if (ufo.anger > 80) {
            ufo.anger = 10;
        }


      if (Math.random() > 0.8) {
            ufo.deltaPosition.lon += (Math.random()-0.5)/5;
            ufo.deltaPosition.lat += (Math.random()-0.5)/5;
        }

        if (Math.random()>0.98) {
            ufo.stealthMode = false;
        }
    }

    ufoBindings.update(ufos.filter(u => !u.stealthMode));
    historyBinding.update(ufos.filter(u => !u.stealthMode));
}, 2000);

const clickHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
clickHandler.setInputAction(function(click:any) {
    const pickedObject = viewer.scene.pick(click.position,30,30);
    let pickedModel = ufoBindings.findModel(pickedObject);
    if (!pickedModel) {
        pickedModel = historyBinding.findModel(pickedObject);
    }

    const toBeChanged = ufos.filter(m=>m.selected);
    if (pickedModel && !pickedModel.selected) {
      toBeChanged.push(pickedModel);
    }

    for (let ufo of toBeChanged) {
        ufo.selected = !ufo.selected;
        ufoBindings.updateOne(ufo);
        historyBinding.updateOne(ufo);
    }
    console.log('pickedModel', pickedModel);

}, Cesium.ScreenSpaceEventType.LEFT_CLICK);



/*
Test
 - use whole div  X
 - altitude in billboard
 - altitude in polyline


 */




