export class Random {
    static between(min, max) {
        return Math.random() * (max - min) + min;
    }

    static number(max) {
        return Math.floor(Math.random() * max);
    }

    static negPos() {
        return Math.random() < 0.5 ? -1 : 1;
    }

    static color() {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }
}