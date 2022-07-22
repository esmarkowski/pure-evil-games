import * as PureEvil from "../../com/pureevil/PureEvil";

export class ForestScene extends PureEvil.Scene {

    init() {

        this.forestView = new PureEvil.Forest(this, this.layers.forest)
        this.pineCount = 100;
        this.deciduousCount = 80;
        super.init();
        this.update();
        // console.log("INIT")


    }

    set pineCount(n) {
        this.forestView.pineCount = Math.round(n);
        // this.update()
    }

    set deciduousCount(n) {
        this.forestView.deciduousCount = Math.round(n);
        // this.update()
    }

    get pineCount() {
        return this.forestView.pineCount;
    }
    
    get deciduousCount() {
        return this.forestView.deciduousCount;
    }

    update() {

        // this.forestView.clear();
        this.forestView.init(this.pineCount, this.deciduousCount);
    }
}