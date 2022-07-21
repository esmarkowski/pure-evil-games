
export class Delaunator {
    static EDGE_STACK = (function($this) {var $r;var array = null;var vector = null;var view = null;var buffer = null;var len = null;var this1 = new Uint32Array(512);$r = this1;return $r;}(this));
    static EPSILON = Math.pow(2,-52);

    constructor(points) {

        this.points = points;

        var n = points.length;

        var maxTriangles = 2 * n - 5;

        var elements = maxTriangles * 3;

        var array = null;

        var vector = null;

        var view = null;

        var buffer = null;

        var len = null;

        var this1;

        if(elements != null) {

            this1 = new Uint32Array(elements);

        } else if(array != null) {

            this1 = new Uint32Array(array);

        } else if(vector != null) {

            this1 = new Uint32Array(vector.__array);

        } else if(view != null) {

            this1 = new Uint32Array(view);

        } else if(buffer != null) {

            if(len == null) {

                this1 = new Uint32Array(buffer,0);

            } else {

                this1 = new Uint32Array(buffer,0,len);

            }

        } else {

            this1 = null;

        }

        this.triangles = this1;

        var elements = maxTriangles * 3;

        var array = null;

        var vector = null;

        var view = null;

        var buffer = null;

        var len = null;

        var this1;

        if(elements != null) {

            this1 = new Int32Array(elements);

        } else if(array != null) {

            this1 = new Int32Array(array);

        } else if(vector != null) {

            this1 = new Int32Array(vector.__array);

        } else if(view != null) {

            this1 = new Int32Array(view);

        } else if(buffer != null) {

            if(len == null) {

                this1 = new Int32Array(buffer,0);

            } else {

                this1 = new Int32Array(buffer,0,len);

            }

        } else {

            this1 = null;

        }

        this.halfedges = this1;

        this.hashSize = Math.ceil(Math.sqrt(n));

        var array = null;

        var vector = null;

        var view = null;

        var buffer = null;

        var len = null;

        var this1;

        if(n != null) {

            this1 = new Uint32Array(n);

        } else if(array != null) {

            this1 = new Uint32Array(array);

        } else if(vector != null) {

            this1 = new Uint32Array(vector.__array);

        } else if(view != null) {

            this1 = new Uint32Array(view);

        } else if(buffer != null) {

            if(len == null) {

                this1 = new Uint32Array(buffer,0);

            } else {

                this1 = new Uint32Array(buffer,0,len);

            }

        } else {

            this1 = null;

        }

        this.hullPrev = this1;

        var array = null;

        var vector = null;

        var view = null;

        var buffer = null;

        var len = null;

        var this1;

        if(n != null) {

            this1 = new Uint32Array(n);

        } else if(array != null) {

            this1 = new Uint32Array(array);

        } else if(vector != null) {

            this1 = new Uint32Array(vector.__array);

        } else if(view != null) {

            this1 = new Uint32Array(view);

        } else if(buffer != null) {

            if(len == null) {

                this1 = new Uint32Array(buffer,0);

            } else {

                this1 = new Uint32Array(buffer,0,len);

            }

        } else {

            this1 = null;

        }

        this.hullNext = this1;

        var array = null;

        var vector = null;

        var view = null;

        var buffer = null;

        var len = null;

        var this1;

        if(n != null) {

            this1 = new Uint32Array(n);

        } else if(array != null) {

            this1 = new Uint32Array(array);

        } else if(vector != null) {

            this1 = new Uint32Array(vector.__array);

        } else if(view != null) {

            this1 = new Uint32Array(view);

        } else if(buffer != null) {

            if(len == null) {

                this1 = new Uint32Array(buffer,0);

            } else {

                this1 = new Uint32Array(buffer,0,len);

            }

        } else {

            this1 = null;

        }

        this.hullTri = this1;

        var elements = this.hashSize;

        var array = null;

        var vector = null;

        var view = null;

        var buffer = null;

        var len = null;

        var this1;

        if(elements != null) {

            this1 = new Int32Array(elements);

        } else if(array != null) {

            this1 = new Int32Array(array);

        } else if(vector != null) {

            this1 = new Int32Array(vector.__array);

        } else if(view != null) {

            this1 = new Int32Array(view);

        } else if(buffer != null) {

            if(len == null) {

                this1 = new Int32Array(buffer,0);

            } else {

                this1 = new Int32Array(buffer,0,len);

            }

        } else {

            this1 = null;

        }

        this.hullHash = this1;

        this.update();

    };

// $hxClasses["com.watabou.geom.Delaunator"] = Delaunator;

// Delaunator.__name__ = "com.watabou.geom.Delaunator";

static pseudoAngle(dx,dy) {
	var p = dx / (Math.abs(dx) + Math.abs(dy));
	return (dy > 0 ? 3 - p : 1 + p) / 4;

};

static dist(ax,ay,bx,by) {

	var dx = ax - bx;
	var dy = ay - by;
	return dx * dx + dy * dy;

};

static orientIfSured(px,py,rx,ry,qx,qy) {

	var l = (ry - py) * (qx - px);
	var r = (rx - px) * (qy - py);

	if(Math.abs(l - r) >= 3.3306690738754716e-16 * Math.abs(l + r)) {
		return l - r;
	} else {
		return 0;
	}

};

static orientd(px,py,qx,qy,rx,ry) {

	var v = Delaunator.orientIfSure(px,py,qx,qy,rx,ry);

	if(v != 0) {

		return v < 0;

	}

	var v = Delaunator.orientIfSure(qx,qy,rx,ry,px,py);

	if(v != 0) {

		return v < 0;

	}

	var v = Delaunator.orientIfSure(rx,ry,px,py,qx,qy);

	if(v != 0) {

		return v < 0;

	}

	return false;

};

static relax(points, aSize = 25, bSize = 15) {
    var seeds = points;
    return points.map((p) => {
    // for(var p of points) {
			
        var farEnough = true;
        var a = aSize;
        var b = bSize;
        var p1;

        var realR = this.radius * Math.sqrt(2);
        var diameter = this.realR * 2;
        var gridSize = 128;
        var cellSize = diameter / 128;
        var center = this.gridSize / 2;
        // console.log(Delaunator.dist(p.x, p.y))
        if(Delaunator.dist(p.x, p.y) < realR) {
            p1 = density[(p.y + realR) / cellSize | 0][(p.x + realR) / cellSize | 0];
        } 

        if(p1 == null) {
            p1 = 0.5;
        }

        var minDist = a + (b - a) * p1;
        for(var seed of seeds) {
            if(Delaunator.distance(p,seed) <= minDist) {
                farEnough = false;
                break;
            }
        }

        if(farEnough) {
            return p;
            // _g.push(p);
        }

    });
}

static distance(a, b) {
    return Math.sqrt(Delaunator.dist(a.x,a.y,b.x,b.y));
}

static inCircled(ax,ay,bx,by,cx,cy,px,py) {

	var dx = ax - px;

	var dy = ay - py;

	var ex = bx - px;

	var ey = by - py;

	var fx = cx - px;

	var fy = cy - py;

	var ap = dx * dx + dy * dy;

	var bp = ex * ex + ey * ey;

	var cp = fx * fx + fy * fy;

	return dx * (ey * cp - bp * fy) - dy * (ex * cp - bp * fx) + ap * (ex * fy - ey * fx) < 0;

};

static circumradius2(ax,ay,bx,by,cx,cy) {

	var dx = bx - ax;

	var dy = by - ay;

	var ex = cx - ax;

	var ey = cy - ay;

	var bl = dx * dx + dy * dy;

	var cl = ex * ex + ey * ey;

	var d = 0.5 / (dx * ey - dy * ex);

	var x = (ey * bl - dy * cl) * d;

	var y = (dx * cl - ex * bl) * d;

	return x * x + y * y;

};

static circumcenter(ax,ay,bx,by,cx,cy) {

	var dx = bx - ax;

	var dy = by - ay;

	var ex = cx - ax;

	var ey = cy - ay;

	var bl = dx * dx + dy * dy;

	var cl = ex * ex + ey * ey;

	var d = 0.5 / (dx * ey - dy * ex);

	var x = ax + (ey * bl - dy * cl) * d;

	var y = ay + (dx * cl - ex * bl) * d;

	return new openfl_geom_Point(x,y);

};

static triCircumcenter(a,b,c) {

	var ad = a.x * a.x + a.y * a.y;

	var bd = b.x * b.x + b.y * b.y;

	var cd = c.x * c.x + c.y * c.y;

	var D = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));

	return new openfl_geom_Point(1 / D * (ad * (b.y - c.y) + bd * (c.y - a.y) + cd * (a.y - b.y)),1 / D * (ad * (c.x - b.x) + bd * (a.x - c.x) + cd * (b.x - a.x)));

};




	update() {

		var minx = Infinity;

		var miny = Infinity;

		var maxx = -Infinity;

		var maxy = -Infinity;

		for(var p of this.points) {

			if(p.x < minx) {
				minx = p.x;
			}

			if(p.y < miny) {
				miny = p.y;
			}

			if(p.x > maxx) {
				maxx = p.x;
			}

			if(p.y > maxy) {
				maxy = p.y;
			}

		}

		var cx = (minx + maxx) / 2;
		var cy = (miny + maxy) / 2;

		var p0 = null;
		var p1 = null;
		var p2 = null;

		var minDist = Infinity;

		for(var p of this.points) {

			var d = Delaunator.dist(p.x,p.y,cx,cy);

			if(minDist > d) {
				minDist = d;
				p0 = p;
			}

		}

		var minDist = Infinity;

		for(var p of this.points) {

			if(p != p0) {
				var d = Delaunator.dist(p.x,p.y,p0.x,p0.y);

				if(minDist > d) {
					minDist = d;
					p1 = p;
				}
			}
		}

		var minRadius = Infinity;

		for(var p of this.points) {

			if(p != p0 && p != p1) {

				var r = Delaunator.circumradius2(p0.x,p0.y,p1.x,p1.y,p.x,p.y);

				if(minRadius > r) {
					minRadius = r;
					p2 = p;
				}
			}

		}

		// var tmp = minRadius == Infinity;

		if(Delaunator.orient(p0.x,p0.y,p1.x,p1.y,p2.x,p2.y)) {

			var t = p1;
			p1 = p2;
			p2 = t;

		}

		this.center = Delaunator.circumcenter(p0.x,p0.y,p1.x,p1.y,p2.x,p2.y);

		let ids = this.points.map((p, i) => i);

		let dist = this.points.map((p) => openfl_geom_Point.distance(p,this.center));

		ids.sort(function(i1,i2) {

			var value = dist[i1] - dist[i2];

			if(value == 0) {
				return 0;
			} else if(value < 0) {
				return -1;
			} else {
				return 1;
			}

		});

		this.points = this.points.map((p, i) => this.points[ids[i]]);

		var i0 = this.points.indexOf(p0);
		var i1 = this.points.indexOf(p1);
		var i2 = this.points.indexOf(p2);

		this.hullStart = i0;

		this.hullNext[i0] =  this.hullPrev[i2] = i1;;
		this.hullNext[i1] = this.hullPrev[i0] = i2;
		this.hullNext[i2] = this.hullPrev[i1] = i0;

		this.hullTri[i0] = 0;
		this.hullTri[i1] = 1;
		this.hullTri[i2] = 2;

		var len = this.hashSize;

		for(var i = 0; i < len; i++) {
			this.hullHash[i] = -1;
		}

		this.hullHash[this.hashKey(p0)] = i0;
		this.hullHash[this.hashKey(p1)] = i1;
		this.hullHash[this.hashKey(p2)] = i2;

		this.trianglesLen = 0;

		this.addTriangle(i0,i1,i2,-1,-1,-1);

		var xp = Infinity;
		var yp = -Infinity;

		for(var p of this.points) {

			if(p != p0 && p != p1 && p != p2) {

				var px = p.x;
				var py = p.y;

				if(Math.abs(px - xp) <= Delaunator.EPSILON && Math.abs(py - yp) <= Delaunator.EPSILON) {
					continue;
				}

				var i = this.points.indexOf(p);
				var start = -1;
				var key = this.hashKey(p);

				for(var j = 0; j < len; j++) {
					start = this.hullHash[(key + j) % this.hashSize];

					if(start != -1 && start != this.hullNext[start]) {
						break;
					}

				}

				var start1 = this.hullPrev[start];
				var e = start1;
				var q = this.hullNext[e];

				while(!Delaunator.orient(px,py,this.points[e].x,this.points[e].y,this.points[q].x,this.points[q].y)) {

					e = q;
					if(e == start1) {
						e = -1;
						break;
					}

					q = this.hullNext[e];

				}

				if(e == -1) {
					continue;
				}

				var t = this.addTriangle(e,i,this.hullNext[e],-1,-1,this.hullTri[e]);

				this.hullTri[i] = this.legalize(t + 2);
				this.hullTri[e] = t;

				var n = this.hullNext[e];
				var q1 = this.hullNext[n];

				while(Delaunator.orient(px,py,this.points[n].x,this.points[n].y,this.points[q1].x,this.points[q1].y)) {

					t = this.addTriangle(n,i,q1,this.hullTri[i],-1,this.hullTri[n]);
					this.hullTri[i] = this.legalize(t + 2);
					this.hullNext[n] = n;
					n = q1;
					q1 = this.hullNext[n];
				}

				if(e == start1) {

					var q2 = this.hullPrev[e];

					while(Delaunator.orient(px,py,this.points[q2].x,this.points[q2].y,this.points[e].x,this.points[e].y)) {

						t = this.addTriangle(q2,i,e,-1,this.hullTri[e],this.hullTri[q2]);
						this.legalize(t + 2);
						this.hullTri[q2] = t;
						this.hullNext[e] = e;
						e = q2;
						q2 = this.hullPrev[e];
					}

				}

				this.hullStart = this.hullPrev[i] = e;
				var val = this.hullPrev[n] = i;
				this.hullNext[e] = val;
				this.hullNext[i] = n;
				this.hullHash[key] = i;
				this.hullHash[this.hashKey(this.points[e])] = e;

			}

		}

		this.triangles = this.triangles.subarray(0,this.trianglesLen);
		this.halfedges = this.halfedges.subarray(0,this.trianglesLen);

	}

	hashKey(p) {
		return Math.floor(Delaunator.pseudoAngle(p.x - this.center.x,p.y - this.center.y) * this.hashSize) % this.hashSize;
	}

	legalize(a) {

		var i = 0;
		var ar = 0;

		while(true) {

			var b = this.halfedges[a];
			var a0 = a - a % 3;
			ar = a0 + (a + 2) % 3;

			if(b == -1) {

				if(i == 0) {
					break;
				}

				a = Delaunator.EDGE_STACK[--i];

				continue;

			}

			var b0 = b - b % 3;
			var al = a0 + (a + 1) % 3;
			var bl = b0 + (b + 2) % 3;

			var p0 = this.triangles[ar];
			var pr = this.triangles[a];
			var pl = this.triangles[al];
			var p1 = this.triangles[bl];

			var illegal = Delaunator.inCircle(this.points[p0].x,this.points[p0].y,this.points[pr].x,this.points[pr].y,this.points[pl].x,this.points[pl].y,this.points[p1].x,this.points[p1].y);

			if(illegal) {

				this.triangles[a] = p1;
				this.triangles[b] = p0;

				var hbl = this.halfedges[bl];

				if(hbl == -1) {
					var e = this.hullStart;

					while(true) {
						if(this.hullTri[e] == bl) {
							this.hullTri[e] = a;
							break;
						}

						e = this.hullPrev[e];

						if(!(e != this.hullStart)) {
							break;
						}

					}

				}

				this.link(a,hbl);
				this.link(b,this.halfedges[ar]);
				this.link(ar,bl);

				var br = b0 + (b + 1) % 3;

				if(i < Delaunator.EDGE_STACK.length) {
					Delaunator.EDGE_STACK[i++] = br;
				}

			} else {

				if(i == 0) {
					break;
				}

				a = Delaunator.EDGE_STACK[--i];

			}

		}

		return ar;

	}

	addTriangle(i0,i1,i2,a,b,c) {

		var t = this.trianglesLen;

		this.triangles[t] = i0;
		this.triangles[t + 1] = i1;
		this.triangles[t + 2] = i2;

		this.link(t,a);
		this.link(t + 1,b);
		this.link(t + 2,c);
		this.trianglesLen += 3;

		return t;

	}

	link(a,b) {
		this.halfedges[a] = b;
		if(b != -1) {
			this.halfedges[b] = a;
		}
	}

	getHull() {

		var hull = [];
		var e = this.hullStart;

		while(true) {
			hull.push(this.points[e]);
			e = this.hullNext[e];
			if(!(e != this.hullStart)) {
				break;
			}
		}

		return hull;

	}

	getTriangles() {

		let list = [];
		let len = this.triangles.length;

		for(var i = 0; i < len; i += 3) {
			var _g = [];

			_g.push(this.points[this.triangles[i]]);
			_g.push(this.points[this.triangles[i + 1]]);
			_g.push(this.points[this.triangles[i + 2]]);

			list.push(_g);

			i += 3;
		}

		return list;

	}

	getVoronoi() {

		let map = new haxe_ds_ObjectMap();
		let len = this.triangles.length;
		let centers = new Array((len / 3 | 0)).fill(null);
		let seen = new Array(this.points.length).fill(false);

		for(let e = 0; e < len; e++) { 
			let p = this.triangles[e % 3 == 2 ? e - 2 : e + 1];
			if(!seen[p]) {
				seen[p] = true;
				let vertices = this.edgesAroundPoint(e).map((edge) => {
					var t = edge / 3 | 0;
					var center = centers[t];
					if(center == null) {
						center = centers[t] = this.triangleCenter(t);
					}
					return center;
				})
				map.set(this.points[p],vertices);
			}
		}

		return map;

	}

	edgesOfTriangle(t) {

		return [3 * t,3 * t + 1,3 * t + 2];

	}

	pointsOfTriangle(t) {
		return [this.triangles[3 * t],this.triangles[3 * t + 1],this.triangles[3 * t + 2]];
	}

	triangleOfEdge(e) {
		return e / 3 | 0;
	}

	nextHalfedge(e) {
		if(e % 3 == 2) {
			return e - 2;
		} else {
			return e + 1;
		}
	}

	prevHalfedge(e) {
		return e % 3 == 0 ? e + 2 : e - 1;
	}

	forEachTriangleEdge(callback) {

		let len = this.triangles.length;
		for(let e = 0; e < len; e++) {
			if(e > this.halfedges[e]) {
				let p = this.points[this.triangles[e]];
				let q = this.points[this.triangles[e % 3 == 2 ? e - 2 : e + 1]];
				callback(e,p,q);
			}
		}

	}

	forEachTriangle(callback) {
		let len = this.trianglesLen / 3 | 0;

		for(var t = 0; t < len; t++) {
			var p = this.triangles[3 * t];
			var p1 = this.triangles[3 * t + 1];
			var p2 = this.triangles[3 * t + 2];
			callback(t,[this.points[p], this.points[p1], this.points[p2]]);
		}

	}

	trianglesAdjacentToTriangle(t) {

		var adjacentTriangles = [];

		var e = 3 * t;

		var opposite = this.halfedges[e];

		if(opposite >= 0) {
			adjacentTriangles.push(opposite / 3 | 0);
		}

		var e = 3 * t + 1;

		var opposite = this.halfedges[e];

		if(opposite >= 0) {
			adjacentTriangles.push(opposite / 3 | 0);
		}

		var e = 3 * t + 2;

		var opposite = this.halfedges[e];

		if(opposite >= 0) {
			adjacentTriangles.push(opposite / 3 | 0);
		}

		return adjacentTriangles;

	}

	triangleCenter(t) {

		return Delaunator.triCircumcenter(this.points[this.triangles[3 * t]],this.points[this.triangles[3 * t + 1]],this.points[this.triangles[3 * t + 2]]);

	}

	forEachVoronoiEdge(callback) {

		const len = this.triangles.length;

		for(let e = 0; e < len; e++) {
			if(e < this.halfedges[e]) {
				let p = this.triangleCenter(e / 3 | 0);
				let q = this.triangleCenter(this.halfedges[e] / 3 | 0);
				callback(e,p,q);
			}
		}

	}

	edgesAroundPoint(start) {

		let result = [];
		let incoming = start;

		while(true) {
			result.push(incoming);
			let outgoing = incoming % 3 == 2 ? incoming - 2 : incoming + 1;
			incoming = this.halfedges[outgoing];

			if(!(incoming != -1 && incoming != start)) {
				break;
			}
		}

		return result;

	}

	forEachVoronoiCell(callback) {

		let seen = [];
		let len = this.triangles.length;

		for(var e = 0; e < len; e++) {

			var p = this.triangles[e % 3 == 2 ? e - 2 : e + 1];

			if(seen.indexOf(p) == -1) {
				seen.push(p);
				var edges = this.edgesAroundPoint(e);
				let vertices = edges.map((edge) => {
					return this.triangleCenter(edge / 3 | 0);
				});

				callback(p,vertices);

			}

		}

	}


}

