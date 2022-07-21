import * as PureEvil from "../../com/pureevil/PureEvil";

export class ForestScene extends PureEvil.Scene {

    init() {
        const forestView = new PureEvil.Forest(this, this.layers.forest).init(150, 160);
        super.init();
        console.log("INIT")
    }
}