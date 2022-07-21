import * as PureEvil from "../../com/pureevil/PureEvil";

export class TreeShaderScene extends PureEvil.Scene {

    init() {

        const forestView = new PureEvil.Forest(this, this.layers.forest).init(1, 1, 200);

        this.camera.position.set(0, 0, 100)
        this.animate();
    }
}