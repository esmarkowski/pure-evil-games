import { Vector2 } from "three";

export class Polygon {
    static area(poly) {
        poly = poly.map(p => { return new Vector2(p[0],p[1]) });
        var size = poly.length;
        var v1 = poly[size - 1];
        var v2 = poly[0];
        var s = v1.x * v2.y - v2.x * v1.y;
    
        for(var i = 1; i < size; i++) {
            v1 = v2;
            v2 = poly[i];
            s += v1.x * v2.y - v2.x * v1.y;
        }
    
        return s * 0.5;
    }

    static drawPolygonAt(g,poly,x,y) {
        var p = poly[poly.length - 1];
        g.moveTo(p.x + x,p.y + y);
        for(var p of poly) {
            g.lineTo(p.x + x,p.y + y);
        }
    
    };
    
    static drawPolyline(g,p) {
        var p1 = p[0];
        g.moveTo(p1.x,p1.y);
        for(var i = 1; i < p.length; i++) {
            var p1 = p[i];
            g.lineTo(p1.x,p1.y);
        }
    
    };
    
    static drawPolylineAt(g,poly,x,y) {
        g.moveTo(poly[0].x + x,poly[0].y + y);
    
        var len = poly.length;
        for(var i = 1; i < len; i++) {  
            var p = poly[i];
            g.lineTo(p.x + x,p.y + y);
        }
    };
}