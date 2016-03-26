class LightBulb {
    
    private scene : BABYLON.Scene;
    private threadsMaterial : BABYLON.StandardMaterial;
    private bulbMaterial : BABYLON.StandardMaterial;
    private glowingMaterial : BABYLON.StandardMaterial;
    private filamentLight : BABYLON.PointLight;
    private filamentProxy : BABYLON.Mesh; 
    private base : BABYLON.Mesh;
    private bulb : BABYLON.Mesh;
    private nib : BABYLON.Mesh;
    private shadowCasters : BABYLON.AbstractMesh[];
    
    constructor(scene: BABYLON.Scene, lightPosition = new BABYLON.Vector3(0,0,0)) {
        this.scene = scene;
        
        this.threadsMaterial = new BABYLON.StandardMaterial('threadsMaterial', scene);
        var threadsTexture = new BABYLON.Texture('assets/threads.jpg', scene);
        threadsTexture.uScale = 1.0;
        threadsTexture.vScale = 1.3;
        this.threadsMaterial.diffuseTexture = threadsTexture;
        this.threadsMaterial.bumpTexture = threadsTexture; 
        
        this.bulbMaterial = new BABYLON.StandardMaterial('bulbMaterial', scene);
        this.bulbMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        this.bulbMaterial.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        this.bulbMaterial.specularColor = new BABYLON.Color3(1, 0.8, 0.8);
        this.bulbMaterial.alpha = 0.5;
        
        this.glowingMaterial = new BABYLON.StandardMaterial('glowingMaterial', scene);
        this.glowingMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.2);
        this.glowingMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
        this.glowingMaterial.emissiveColor = new BABYLON.Color3(0.8, 0.8, 0.2);
        
        this.filamentLight = new BABYLON.PointLight('filamentLight', lightPosition, scene);
        this.filamentLight.diffuse = new BABYLON.Color3(1, 1, 1);
        this.filamentLight.specular = new BABYLON.Color3(1, 1, 1);
        this.filamentLight.intensity = 0.2;
        
        this.filamentProxy = BABYLON.Mesh.CreateSphere('filamentProxy', 4, 0.3, scene);  
        this.filamentProxy.material = this.glowingMaterial; 
        
        this.base = BABYLON.Mesh.CreateCylinder('base', 1.2, 1.2, 0.9, 20, 8, scene);
        this.base.position = new BABYLON.Vector3(0, -1, 0);
        this.base.material = this.threadsMaterial;
        
        this.bulb = BABYLON.Mesh.CreateSphere('bulb', 16, 1.9, scene);
        this.bulb.position = new BABYLON.Vector3(0, 0, 0);
        this.bulb.material = this.bulbMaterial;
        this.bulb.isPickable = true;
        
        this.nib = BABYLON.Mesh.CreateSphere('nib', 16, 0.6, scene);
        this.nib.position = new BABYLON.Vector3(0, -1.5, 0);
        
        this.filamentProxy.parent = this.filamentLight;
        this.base.parent = this.filamentLight;
        this.bulb.parent = this.filamentLight;
        this.nib.parent = this.filamentLight; 
        
        var shadowGenerator = new BABYLON.ShadowGenerator(1024, this.filamentLight);
        shadowGenerator.usePoissonSampling = false;
        shadowGenerator.useVarianceShadowMap = true;
        shadowGenerator.useBlurVarianceShadowMap = false;
        
        this.shadowCasters = shadowGenerator.getShadowMap().renderList;
        this.shadowCasters.push(this.nib);
        
        this.incrementIntensity();
        var bulbAction = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => { this.incrementIntensity() } );
        this.bulb.actionManager = new BABYLON.ActionManager(scene);
        this.bulb.actionManager.registerAction(bulbAction);
    }
    
    getAnchor() : BABYLON.Light {
        return this.filamentLight;
    }
    
    addShadowCasters(items : BABYLON.AbstractMesh[]) : void {
        for (var ctr=0; ctr<items.length;ctr++) {
            this.shadowCasters.push(items[ctr]);
        }
    }
    
    getShadowCasters() : BABYLON.AbstractMesh[] {
        return [this.base, this.nib];
    }
    
    private incrementIntensity() {
        var intensity = this.filamentLight.intensity+0.2;
        if (intensity > 0.8) { intensity = 0.0; }
        
        this.filamentLight.intensity = intensity;
        this.bulbMaterial.emissiveColor = new BABYLON.Color3(intensity/1.2, intensity/1.2, intensity/2);
        this.bulbMaterial.alpha = (intensity+0.5)/2;
        this.glowingMaterial.emissiveColor = new BABYLON.Color3(intensity/0.8, intensity/0.8, intensity/2);
    }
    
}
