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
        
        var blueMaterial = new BABYLON.StandardMaterial('blueMaterial', scene);
        blueMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.3, 1);
        blueMaterial.specularColor = new BABYLON.Color3(1, 0.8, 0.8);
        blueMaterial.alpha = 1.0;
        
        var bumpyWallTexture = new BABYLON.Texture('assets/wall-bump.png', scene);
        bumpyWallTexture.uScale = 5;
        bumpyWallTexture.vScale = 8;
        
        var treeTexture = new BABYLON.Texture('assets/tree-for-sphere.png', scene);
        treeTexture.hasAlpha = true;
       
        blueMaterial.ambientTexture = treeTexture;
        blueMaterial.bumpTexture = bumpyWallTexture;        
        
        var yellowMaterial = new BABYLON.StandardMaterial('yellowMaterial', scene);
        yellowMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.2);
        yellowMaterial.specularColor = new BABYLON.Color3(1, 0.8, 0.8);
        yellowMaterial.alpha = 1.0;
        
        var ground = BABYLON.Mesh.CreateGround('ground', 40, 40, 2, scene);
        
        var lightBulbPosition = new BABYLON.Vector3(-5, 1.6, 16);
        
        var hSpriteNb =  6;  // 6 sprites per raw
        var vSpriteNb =  4;  // 4 sprite raws
        var faceUV = new Array(6);

        for (var i = 0; i < 6; i++) {
            faceUV[i] = new BABYLON.Vector4(0, 0, 0.1, 0.1);
        }
        
        faceUV[0] = new BABYLON.Vector4(0.0, 0.0, 0.75, 0.75);
        faceUV[1] = new BABYLON.Vector4(0.25, 0.25, 1.0, 1.0);
        faceUV[2] = new BABYLON.Vector4(0.4, 0.0, 0.7, 0.3);
        
        var options = {
            width: 3,
            height: 5,
            depth: 1,
            faceUV: faceUV
        };

        var largeBlueBox = BABYLON.MeshBuilder.CreateBox('largeBlueBox', options, scene);
        largeBlueBox.position = new BABYLON.Vector3(7, 5, -7);
        largeBlueBox.material = blueMaterial;
        
        var smallYellowCylinder = BABYLON.Mesh.CreateCylinder('smallYellowCylinder', 5, 3, 4.2, 32, 32, scene);
        smallYellowCylinder.position = new BABYLON.Vector3(2, 2.5, 2);
        smallYellowCylinder.material = yellowMaterial;
        
        smallYellowCylinder.receiveShadows = true;
        largeBlueBox.receiveShadows = true;
        ground.receiveShadows = true;
        
        var tallYellowCylinder = BABYLON.Mesh.CreateCylinder('tallYellowCylinder', 10, 3, 4.2, 32, 32, scene);
        tallYellowCylinder.position = new BABYLON.Vector3(-3, 5.5, 0);
        tallYellowCylinder.material = yellowMaterial;
        
        tallYellowCylinder.receiveShadows = true;
        smallYellowCylinder.receiveShadows = true;
        largeBlueBox.receiveShadows = true;
        ground.receiveShadows = true;
        
        var lightBulb = new LightBulb(scene);
        lightBulb.addShadowCaster(smallYellowCylinder);
        lightBulb.addShadowCaster(tallYellowCylinder);
        lightBulb.addShadowCaster(largeBlueBox);
        
        var animation = new BABYLON.Animation('animationForBulb', 'position', 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        animation.setKeys([
            {frame:0, value:   new BABYLON.Vector3(-14, 3, 15)},
            {frame:100, value: new BABYLON.Vector3(-14, 3, -3)},
            {frame: 200, value:new BABYLON.Vector3(14, 3, -3)},
            {frame:300, value: new BABYLON.Vector3(14, 3, 15)},
            {frame:400, value: new BABYLON.Vector3(-14, 3, 15)}
        ]);
        
        lightBulb.getAnchor().animations.push(animation);
        scene.beginAnimation(lightBulb.getAnchor(), 0, 400, true);
        
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