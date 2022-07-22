// import {Geometry, ConeGeometry, CylinderGeometry, Mesh, MeshLambertMaterial}  from 'three';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Random } from '../../PureEvil';
import { Tree } from './Tree'

export class Deciduous extends Tree {

    constructor(trunkSize = 2, needleRadius = 10, height = 18, needleColor = 0x00FF00, trunkColor = 0xBB6600) {

        super();
        const colorTarget = new THREE.Color(Random.color());
        height = height < 8 ? 8 : height;
        this._height = height;
        needleRadius = needleRadius < 5 ? 5 : needleRadius;
        needleColor = new THREE.Color(needleColor).lerp(colorTarget, 0.3);
        trunkColor = new THREE.Color(trunkColor).lerp(colorTarget, 0.2);

        const level1 = new THREE.SphereBufferGeometry(needleRadius*0.5,height * 0.4)
        level1.translate(0,height*0.9,0)

        const level2 = new THREE.SphereBufferGeometry(needleRadius*0.8,height * 0.58)
        level2.translate(0,height* 0.68,0)

        const level3 = new THREE.SphereBufferGeometry(needleRadius,height * 0.55)
        level3.translate(0,height * 0.45,0)

        const canopy = [level1, level2, level3];

        // const core = new THREE.SphereBufferGeometry(needleRadius, height * 0.5, height / 4);
        // core.translate(0,height,0)

        // const canopy = [core];
        // const density = 25;
        // for(let i = 0; i < density; i++) {
        //     const radius = (needleRadius*Random.between(0.5, 0.8) * ((density - i)/density ));
        //     const patch = new THREE.SphereBufferGeometry(radius,height * i/density)
        //     patch.translate(
        //         (Random.between(-radius, radius) * 0.8) + Math.sin(needleRadius),
        //         height*Random.between(0.8, 0.9),
        //         (Random.between(-radius, radius) * 0.8) + Math.cos(needleRadius)) 
        //     canopy.push(patch)
        // }

        trunkSize = trunkSize * Math.sqrt(needleRadius / height);
        const trunk = new THREE.CylinderBufferGeometry(trunkSize*0.9,trunkSize*1.7, height)
        trunk.translate(0,height/2,0)

        const top = BufferGeometryUtils.mergeBufferGeometries(canopy, false);
        top.translate(0, -trunkSize + height/2,0)

        const pineGeometry = BufferGeometryUtils.mergeBufferGeometries([top, trunk], true);
        // pineGeometry.receiveShadow = true;
        this._mesh =  new THREE.Mesh(
            pineGeometry,
            [
                new THREE.MeshToonMaterial({vertexColors: false, color: needleColor}),
                new THREE.MeshToonMaterial({vertexColors: false, color: trunkColor})
            ]
        )

    }
}