window.addEventListener('DOMContentLoaded', () => {
    // get the canvas DOM element
    var canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');

    // load the 3D engine
    var engine = new BABYLON.Engine(canvas, true);

    // createScene function that creates and return the scene
    var createScene = function() {
        var scene = new BABYLON.Scene(engine);

        var camera = new BABYLON.ArcRotateCamera('ArcRotateCamera', 0, 0, 0, BABYLON.Vector3.Zero(), scene);
        camera.setPosition(new BABYLON.Vector3(0, 7, 14));
        camera.attachControl(canvas, true, true);

        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1,1,1), scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
        light.groundColor = new BABYLON.Color3(0.25, 0.25, 0.25);
        light.intensity = 0.5;
        
        var ground = BABYLON.Mesh.CreateGround('ground', 20, 20, 2, scene);
        
        var largeCylinder = BABYLON.Mesh.CreateCylinder('largeCylinder', 10, 5, 5.2, 8, 8, scene);
        largeCylinder.position = new BABYLON.Vector3(7, 5, -7);
        
        var smallCylinder = BABYLON.Mesh.CreateCylinder('smallCylinder', 5, 3, 4.2, 8, 8, scene);
        smallCylinder.position = new BABYLON.Vector3(2, 2.5, 2);

        var threadsMaterial = new BABYLON.StandardMaterial('threadsMaterial', scene);
        var threadsTexture = new BABYLON.Texture('assets/threads.jpg', scene);
        threadsTexture.uScale = 1.0;
        threadsTexture.vScale = 1.3;
        threadsMaterial.diffuseTexture = threadsTexture;
        threadsMaterial.bumpTexture = threadsTexture;
        
        var bulbMaterial = new BABYLON.StandardMaterial('bulbMaterial', scene);
        bulbMaterial.diffuseColor = new BABYLON.Color3(1, 0.3, 0.3);
        bulbMaterial.emissiveColor = new BABYLON.Color3(1, 0.3, 0.3);
        bulbMaterial.specularColor = new BABYLON.Color3(1, 0.8, 0.8);
        bulbMaterial.alpha = 0.8;
        
        var filamentLight = new BABYLON.PointLight('filamentLight', new BABYLON.Vector3(0, 1.2, 0), scene);
        filamentLight.diffuse = new BABYLON.Color3(1, 0, 0);
        filamentLight.specular = new BABYLON.Color3(1, 1, 1);
        
        var shadowGenerator = new BABYLON.ShadowGenerator(1024, filamentLight);
	    shadowGenerator.getShadowMap().renderList.push(smallCylinder);
	    largeCylinder.receiveShadows = true;
        
        
        var base = BABYLON.Mesh.CreateCylinder('base', 1.2, 1.2, 0.9, 20, 8, scene);
        base.position = new BABYLON.Vector3(0, 0, 0);
        
        base.material = threadsMaterial;
        
        var bulb = BABYLON.Mesh.CreateSphere('bulb', 16, 1.9, scene);
        bulb.position = new BABYLON.Vector3(0, 1.2, 0);
        bulb.material = bulbMaterial;
        
        var nib = BABYLON.Mesh.CreateSphere('bulb', 16, 0.6, scene);
        nib.position = new BABYLON.Vector3(0, -0.5, 0);
        
        var lightBulb = BABYLON.Mesh.CreateBox('lightBulb', 1, scene);
        lightBulb.position = new BABYLON.Vector3(-6, 2, 10);
        lightBulb.isVisible = false;
        base.parent = lightBulb;
        bulb.parent = lightBulb;
        nib.parent = lightBulb;
        filamentLight.parent = lightBulb;

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