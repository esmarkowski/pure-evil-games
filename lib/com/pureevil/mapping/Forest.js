import * as THREE from 'three';
import { Pine } from '../model/trees/Pine';
import { Deciduous } from '../model/trees/Deciduous';
import { Random } from '../util/Random';
import { View } from './View';
import {Delaunay} from 'd3-delaunay';
import { Delaunator } from '../voronoi/Delaunator';
import { Poisson } from '../voronoi/Poisson';
import { Polygon } from '../util/Polygon';

export class Forest extends View {


    constructor(gameScene, layer = 0) {
        super(gameScene, layer);

    }


    init(pineCount = 20, deciduousCount = 20, width) {
            

            this.pineCount = pineCount;
            this.deciduousCount = deciduousCount;
            
            const points = [];
            width = window.innerWidth > 500 ? window.innerWidth : 900;
            const innerWidth = width || window.innerWidth;


            const sites = {}
            for(let i = 0; i < this.pineCount; i++) {
                const cluster = innerWidth/4;
                const totalArea = cluster*cluster;
                const distributionX = Random.between(-cluster, cluster)
                const distributionZ = Random.between(-cluster, cluster)
                sites[i] = {x: distributionX, y: 0, z: distributionZ, scale: totalArea, type: "Pine"};
                points.push([distributionX,distributionZ]);
            }

            for(var i = points.length; i < this.pineCount + this.deciduousCount; i++) {
                const cluster = innerWidth/6;
                const totalArea = cluster*cluster;
                const distributionX = Random.between(-cluster, cluster)
                const distributionZ = Random.between(-cluster, cluster)
                sites[i] = {x: distributionX, y: 0, z: distributionZ, scale: totalArea, type: "Deciduous"};
                points.push([distributionX,distributionZ]);
            }


            // const radius = 2;
            // const pnt = [...Poisson.poissonDiscSampler(width /2, height/2 , width, height , radius)]
            // const delaunay = new Delaunay(Float64Array.of(0, 0, 0, 1, 1, 0, 1, 1));
            // var relaxed = points;
            // for(var i = 0; i < 1000; i++ ) {
            //     relaxed = Delaunator.relax(relaxed, 300, 100)
 
            // }
            // const relaxed = Delaunator.relax(points, 80, 15)

            const delaunay = Delaunay.from(points);
            const voronoi = delaunay.voronoi([-innerWidth/4, -innerWidth/4, innerWidth/4, innerWidth/4]);

            const cells = voronoi.cellPolygons()
            for(let polygon of cells) {
                let voronoiPath = new THREE.Shape(polygon.map(([x,y]) => new THREE.Vector2(x,y)));
                voronoiPath.autoClose = true;

                var area = Polygon.area(polygon);
                
                sites[polygon.index].area = area;

                this.addTree(sites[polygon.index]);
                let geom = new THREE.ShapeBufferGeometry(voronoiPath);
                let voronoiMesh = new THREE.Mesh(geom, new THREE.MeshStandardMaterial({side: THREE.DoubleSide, color: new THREE.Color(Random.color())}));
                voronoiMesh.rotation.x = Math.PI/2;
                voronoiMesh.position.y = 0;
                this.add(voronoiMesh, 7)
            }


            // var circumcenters = delaunay.points;
            // var color = 0xff0000;
            // console.log(JSON.stringify(points));
            // for (let i = 0, n = circumcenters.length; i < n; i += 2) {
            //     const x = circumcenters[i], y = circumcenters[i+1];
            //     let marker = this.createMarker(color, 2)
            //     marker.position.x =x;
            //     marker.position.z =y;
            //     this.add(marker);
            // }




    }

    addTree(site) {
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        let scale = ((site.area / site.scale)) ;
        let radius = clamp(Math.sqrt(site.area/Math.PI) * ((1/scale) / 100), 4, site.area*0.015)
        let height = (radius * 1.6) + Random.between(0, radius * 0.2);

        var tree;
        switch(site.type) {
            case "Pine":
               tree = new Pine(1, radius, height, 0x99d200);
               break;
            case "Deciduous":
                tree = new Deciduous(1, radius, height * 1.6, 0x71b300);
                break;
        }

        tree.mesh.position.x = site.x;
        tree.mesh.position.z = site.z;
        tree.mesh.position.y = 0;

        this.add( tree.mesh );
    }

    createMarker(color = 0x000000, size = 2) {
        const geometry = new THREE.BoxBufferGeometry(size, size, size);
        const material = new THREE.MeshBasicMaterial({color: color});
        const marker = new THREE.Mesh(geometry, material);
        return marker;
    }


}