class Axes {
    
    private scene: BABYLON.Scene;
    private number: Number;
    private size: Number;
    
    constructor(scene: BABYLON.Scene, number = 5, size = 0.2) {
        this.scene = scene;
        this.number = number;
        this.size = size;
        
        var alpha = 0.7;
        
        var xMaterial = new BABYLON.StandardMaterial('xMaterial', scene);
        xMaterial.diffuseColor = BABYLON.Color3.Red();
        xMaterial.specularColor = BABYLON.Color3.Red();
        xMaterial.alpha = alpha;
        
        var yMaterial = new BABYLON.StandardMaterial('yMaterial', scene);
        yMaterial.diffuseColor = BABYLON.Color3.Green();
        yMaterial.specularColor = BABYLON.Color3.Green();
        yMaterial.alpha = alpha;
        
        var zMaterial = new BABYLON.StandardMaterial('zMaterial', scene);
        zMaterial.diffuseColor = BABYLON.Color3.Blue();
        zMaterial.specularColor = BABYLON.Color3.Blue();
        zMaterial.alpha = alpha;
        
        for (var ctr=-this.number; ctr <= this.number; ctr++)
        {
            var point = BABYLON.Mesh.CreateSphere(`x-${ctr}`, 8, size, scene);
            point.position = new BABYLON.Vector3(ctr, 0, 0);
            point.material = xMaterial;
            
            point = BABYLON.Mesh.CreateSphere(`y-${ctr}`, 8, size, scene);
            point.position = new BABYLON.Vector3(0, ctr, 0);
            point.material = yMaterial;
            
            point = BABYLON.Mesh.CreateSphere(`z-${ctr}`, 8, size, scene);
            point.position = new BABYLON.Vector3(0, 0, ctr);
            point.material = zMaterial;
        }
    }
}