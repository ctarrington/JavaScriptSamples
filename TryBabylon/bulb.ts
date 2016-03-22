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

        var threadsMaterial = new BABYLON.StandardMaterial('threadsMaterial', scene);
        var threadsTexture = new BABYLON.Texture('assets/threads.jpg', scene);
        threadsTexture.uScale = 1.0;
        threadsTexture.vScale = 1.3;
        threadsMaterial.diffuseTexture = threadsTexture;
        threadsMaterial.bumpTexture = threadsTexture;
        
        var bulbMaterial = new BABYLON.StandardMaterial('bulbMaterial', scene);
        bulbMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        bulbMaterial.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        bulbMaterial.specularColor = new BABYLON.Color3(1, 0.8, 0.8);
        bulbMaterial.alpha = 0.5;
        
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
        
        var lightBulbPosition = new BABYLON.Vector3(-5, 1.6, 16);
        
        var largeBlueBox = BABYLON.Mesh.CreateBox('largeBlueBox', 2, scene);
        largeBlueBox.scaling = new BABYLON.Vector3(3,5,1);
        largeBlueBox.position = new BABYLON.Vector3(7, 5, -7);
        largeBlueBox.material = blueMaterial;
        
        var smallYellowCylinder = BABYLON.Mesh.CreateCylinder('smallYellowCylinder', 5, 3, 4.2, 32, 32, scene);
        smallYellowCylinder.position = new BABYLON.Vector3(2, 2.5, 2);
        smallYellowCylinder.material = yellowMaterial;
        
        var filamentLight = new BABYLON.PointLight('filamentLight', new BABYLON.Vector3(-8, 3, 15), scene);
        filamentLight.diffuse = new BABYLON.Color3(1, 1, 1);
        filamentLight.specular = new BABYLON.Color3(1, 1, 1);
        filamentLight.intensity = 0.2;
        
        var filamentProxy = BABYLON.Mesh.CreateSphere('filamentProxy', 4, 0.3, scene);  
        filamentProxy.material = glowingMaterial;  
        
        var base = BABYLON.Mesh.CreateCylinder('base', 1.2, 1.2, 0.9, 20, 8, scene);
        base.position = new BABYLON.Vector3(0, -1, 0);
        
        base.material = threadsMaterial;
        
        var bulb = BABYLON.Mesh.CreateSphere('bulb', 16, 1.9, scene);
        bulb.position = new BABYLON.Vector3(0, 0, 0);
        bulb.material = bulbMaterial;
        bulb.isPickable = true;
        
        var nib = BABYLON.Mesh.CreateSphere('bulb', 16, 0.6, scene);
        nib.position = new BABYLON.Vector3(0, -1.5, 0);
        
        filamentProxy.parent = filamentLight;
        base.parent = filamentLight;
        bulb.parent = filamentLight;
        nib.parent = filamentLight;
        
        var shadowGenerator = new BABYLON.ShadowGenerator(1024, filamentLight);
        shadowGenerator.usePoissonSampling = false;
        shadowGenerator.useVarianceShadowMap = true;
        shadowGenerator.useBlurVarianceShadowMap = false;
        
        var shadowCasters = shadowGenerator.getShadowMap().renderList;
        shadowCasters.push(smallYellowCylinder, largeBlueBox, nib);
        
        smallYellowCylinder.receiveShadows = true;
        largeBlueBox.receiveShadows = true;
        ground.receiveShadows = true;
        
        function onBulbPicked():void {
            var intensity = filamentLight.intensity+0.2;
            if (intensity > 0.8) { intensity = 0.0; }
            
            filamentLight.intensity = intensity;
            bulbMaterial.emissiveColor = new BABYLON.Color3(intensity/1.2, intensity/1.2, intensity/2);
            bulbMaterial.alpha = (intensity+0.5)/2;
            glowingMaterial.emissiveColor = new BABYLON.Color3(intensity/0.8, intensity/0.8, intensity/2);
        }
        onBulbPicked(); 
        
        var bulbAction = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, onBulbPicked);
        bulb.actionManager = new BABYLON.ActionManager(scene);
        bulb.actionManager.registerAction(bulbAction);
        
        var animation = new BABYLON.Animation('animationForBulb', 'position', 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        animation.setKeys([
            {frame:0, value:   new BABYLON.Vector3(-14, 3, 15)},
            {frame:100, value: new BABYLON.Vector3(-14, 3, -3)},
            {frame: 200, value:new BABYLON.Vector3(14, 3, -3)},
            {frame:300, value: new BABYLON.Vector3(14, 3, 15)},
            {frame:400, value: new BABYLON.Vector3(-14, 3, 15)}
        ]);
        
        filamentLight.animations.push(animation);
        scene.beginAnimation(filamentLight, 0, 400, true);

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