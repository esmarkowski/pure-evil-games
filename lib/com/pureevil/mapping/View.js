export class View {

    constructor(gameScene, layer = 0) {
        this._scene = gameScene
        this.layer = layer;
    }

    get renderer() {
        return this._scene.renderer;
    }

    get camera() {
        return this._scene.camera;
    }

    get clock() {
        return this._scene.clock;
    }

    get scene() {
        return this._scene.scene;
    }

    add(object, layer = null) {
        let layerNumber = layer || this.layer;

        object.layers.set( layerNumber );
        this.scene.add(object);
    }

    render() {
        this.renderer.render(this.scene, this.camera);    
    }

};