import * as THREE from 'three'

export default class Boat {
    constructor(scene) {
        this.scene = scene
        this.initBoat()
    }

    initBoat() {
        // this.geometry = new THREE.BufferGeometry(200, 200, 200)
        // this.geometry.rotateX(-Math.PI / 2);

        this.initShader();
        // var texture = new THREE.TextureLoader().load( 'https://cinemont.com/tutorials/zelda/water.png' );
        this.geometry = new THREE.BoxBufferGeometry( 2, 2, 2 )
        // this.material = new THREE.MeshNormalMaterial()
        this.object = new THREE.Mesh(this.geometry,this.material)
        this.object.position.y = 1
        this.scene.add(this.object)
    }

    initShader() {
        this.vertexShader = `
            #define SCALE 10.0

            varying vec2 vUv;
            
            uniform float uTime;
            
            float calculateSurface(float x, float z) {
                float y = 0.0;
                y += (sin(x * 1.0 / SCALE + uTime * 1.0) + sin(x * 2.3 / SCALE + uTime * 1.5) + sin(x * 3.3 / SCALE + uTime * 0.4)) / 3.0;
                y += (sin(z * 0.2 / SCALE + uTime * 1.8) + sin(z * 1.8 / SCALE + uTime * 1.8) + sin(z * 2.8 / SCALE + uTime * 0.8)) / 3.0;
                return y;
            }
            
            void main() {
                vUv = uv;
                vec3 pos = position;
                
                float strength = 1.0;
                pos.y += strength * calculateSurface(pos.x, pos.z);
                pos.y -= strength * calculateSurface(0.0, 0.0);
            
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }  
        `;

        this.fragmentShader = `
           
        `;

        this.material = new THREE.ShaderMaterial( {
            uniforms: {
                uTime: {value: 0},
                uColor: {value: new THREE.Color('#545454')},
            },
            vertexShader: this.vertexShader,
            side: THREE.DoubleSide,
            vertexColors: true
        });
    }

    update(time) {
        this.object.material.uniforms.uTime.value = time
    }
}
