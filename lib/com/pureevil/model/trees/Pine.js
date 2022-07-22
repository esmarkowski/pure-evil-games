// import {Geometry, ConeGeometry, CylinderGeometry, Mesh, MeshLambertMaterial}  from 'three';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Random } from '../../PureEvil';
import { Tree } from './Tree';

export class Pine extends Tree {

    constructor(trunkSize = 2, needleRadius = 10, height = 18, needleColor = 0x00FF00, trunkColor = 0xBB6600) {
        super();
        const colorTarget = new THREE.Color(Random.color());

        height = height < 8 ? 10 : height;
        this.height = height;
        needleRadius = needleRadius < 4 ? 4 : needleRadius;
        trunkSize = trunkSize * Math.sqrt(height / needleRadius)/1.6;
        needleColor = new THREE.Color(needleColor).lerp(colorTarget, 0.3);
        trunkColor = new THREE.Color(trunkColor).lerp(colorTarget, 0.2);

        const level1 = new THREE.ConeBufferGeometry(needleRadius*0.5,height * 0.4)
        level1.translate(0,height*0.9,0)

        const level2 = new THREE.ConeBufferGeometry(needleRadius*0.8,height * 0.5)
        level2.translate(0,height* 0.68,0)

        const level3 = new THREE.ConeBufferGeometry(needleRadius,height * 0.58)
        level3.translate(0,height * 0.45,0)


        const trunk = new THREE.CylinderBufferGeometry(trunkSize*0.8,trunkSize * 1.4, height )
        trunk.translate(0,height/2,0)

        const top = BufferGeometryUtils.mergeBufferGeometries([level1, level2, level3], false);
        top.translate(0, -trunkSize + height/2,0)

        const pineGeometry = BufferGeometryUtils.mergeBufferGeometries([top,  trunk], true);
        // pineGeometry.receiveShadow = true;

        this._mesh = new THREE.Mesh(
            pineGeometry,
            [
                new THREE.MeshToonMaterial({vertexColors: false, color: needleColor}),
                new THREE.MeshToonMaterial({vertexColors: false, color: trunkColor})
            ]
        )

    }
}