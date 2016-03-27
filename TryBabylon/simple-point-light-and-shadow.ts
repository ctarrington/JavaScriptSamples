window.addEventListener('DOMContentLoaded', () => {
    // get the canvas DOM element
    var canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');

    // load the 3D engine
    var engine = new BABYLON.Engine(canvas, true);

    // createScene function that creates and return the scene
    var createScene = function() {
        var scene = new BABYLON.Scene(engine);

        var camera = new BABYLON.ArcRotateCamera('ArcRotateCamera', 0, 0, 0, BABYLON.Vector3.Zero(), scene);
        camera.setPosition(new BABYLON.Vector3(0, 20, 40));
        camera.attachControl(canvas, true, true);

        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1,1,1), scene);
        light.diffuse = new BABYLON.Color3(1,1,1);
        light.specular = new BABYLON.Color3(1,1,1);
        light.groundColor = new BABYLON.Color3(1,1,1);
        light.intensity = 0.3;
        
        var bulbMaterial = new BABYLON.StandardMaterial('bulbMaterial', scene);
        bulbMaterial.diffuseColor = new BABYLON.Color3(1, 0.3, 0.3);
        bulbMaterial.emissiveColor = new BABYLON.Color3(1, 0.3, 0.3);
        bulbMaterial.specularColor = new BABYLON.Color3(1, 0.8, 0.8);
        bulbMaterial.alpha = 0.8;
        
        var blueMaterial = new BABYLON.StandardMaterial('blueMaterial', scene);
        blueMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.3, 1);
        blueMaterial.specularColor = new BABYLON.Color3(1, 0.8, 0.8);
        blueMaterial.alpha = 1.0;
        
        var yellowMaterial = new BABYLON.StandardMaterial('yellowMaterial', scene);
        yellowMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.2);
        yellowMaterial.specularColor = new BABYLON.Color3(1, 0.8, 0.8);
        yellowMaterial.alpha = 1.0;
        
        var glowingMaterial = new BABYLON.StandardMaterial('glowingMaterial', scene);
        glowingMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.2);
        glowingMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
        glowingMaterial.emissiveColor = new BABYLON.Color3(0.8, 0.8, 0.2);
        
        var ground = BABYLON.Mesh.CreateGround('ground', 40, 40, 2, scene);
        
        var largeBlueBox = BABYLON.Mesh.CreateBox('largeBlueBox', 2, scene);
        largeBlueBox.scaling = new BABYLON.Vector3(3,5,1);
        largeBlueBox.position = new BABYLON.Vector3(7, 5, -7);
        largeBlueBox.material = blueMaterial;
        
        var smallYellowCylinder = BABYLON.Mesh.CreateCylinder('smallYellowCylinder', 5, 3, 4.2, 8, 8, scene);
        smallYellowCylinder.position = new BABYLON.Vector3(2, 2.5, 2);
        smallYellowCylinder.material = yellowMaterial;
        
        var filamentLight = new BABYLON.PointLight('filamentLight', new BABYLON.Vector3(0, 3.6, 16), scene);
        filamentLight.diffuse = new BABYLON.Color3(1, 1, 1);
        filamentLight.specular = new BABYLON.Color3(1, 1, 1);
        filamentLight.intensity = 0.4;
        
        var filamentProxy = BABYLON.Mesh.CreateSphere('filamentProxy', 4, 0.3, scene);
        filamentProxy.parent = filamentLight;     
        filamentProxy.material = glowingMaterial;
        
        var shadowGenerator = new BABYLON.ShadowGenerator(1024, filamentLight);
        shadowGenerator.usePoissonSampling = false;
        shadowGenerator.useVarianceShadowMap = false;
        shadowGenerator.useBlurVarianceShadowMap = true;
        
        var shadowCasters = shadowGenerator.getShadowMap().renderList;
        shadowCasters.push(smallYellowCylinder, largeBlueBox);
        
        largeBlueBox.receiveShadows = true;
        ground.receiveShadows = true;

        // return the created scene
        return scene;
    };

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