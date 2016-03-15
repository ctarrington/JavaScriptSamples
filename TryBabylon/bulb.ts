window.addEventListener('DOMContentLoaded', () => {
    // get the canvas DOM element
    var canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');

    // load the 3D engine
    var engine = new BABYLON.Engine(canvas, true);

    // createScene function that creates and return the scene
    var createScene = function() {
        var scene = new BABYLON.Scene(engine);

        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(3, 3,-15), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, false);

        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1,1,1), scene);

        var base = BABYLON.Mesh.CreateCylinder('base', 2.0, 1.2, 0.9, 20, 8, scene);
        base.position = new BABYLON.Vector3(0, 0, 0);
        var bulb = BABYLON.Mesh.CreateSphere('bulb', 16, 1.9, scene);
        bulb.position = new BABYLON.Vector3(0, 1.0, 0);
        
        var lightBulb = BABYLON.Mesh.CreateBox('lightBulb', 1, scene);
        base.position = new BABYLON.Vector3(0, 0, 0)
        lightBulb.isVisible = false;
        base.parent = lightBulb;
        bulb.parent = lightBulb;

        // return the created scene
        return scene;
    }

    // call the createScene function
    var scene = createScene();

    // run the render loop
    engine.runRenderLoop(() => {
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', () => {
        engine.resize();
    });
});