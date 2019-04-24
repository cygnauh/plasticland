import { Object3D, PlaneBufferGeometry, Mesh, Vector2, Color, TextureLoader, RepeatWrapping, DoubleSide } from 'three';
import MagicShader from 'magicshader'

export default class Water extends Object3D {
    constructor(scene) {
        super()
        this.scene = scene

        this.initPlane(40, 40 , 20, 20)
        this.addEventListeners()
    }

    initPlane(width, height, widthSegments, heightSegments) {
        this.geometry = new PlaneBufferGeometry(width, height, widthSegments, heightSegments)
        this.geometry.rotateX(-Math.PI / 2);

        this.initShader();

        this.plane = new Mesh(this.geometry,this.material)
        this.plane.position.y = 1;
        this.scene.add(this.plane)
    }

    initShader() {
        this.vertexShader = `
            precision highp float;
            
            attribute vec3 position;
            attribute vec2 uv;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            
            varying vec2 vUv;
            uniform float uTime;
            
            const float SCALE = 10.0; 
            const float STRENGTH = 1.0; 
            
            float calculateSurface(float x, float z) {
                float y = 0.0;
                y += (sin(x * 1.0 / SCALE + uTime * 1.0) + sin(x * 2.3 / SCALE + uTime * 1.5) + sin(x * 3.3 / SCALE + uTime * 0.4)) / 4.0;
                y += (sin(z * 0.2 / SCALE + uTime * 1.8) + sin(z * 1.8 / SCALE + uTime * 1.8) + sin(z * 2.8 / SCALE + uTime * 0.8)) / 2.0;
                return y;
            }
            
            void main() {
                vUv = uv;
                vec3 pos = position;
                
                pos.y += STRENGTH * calculateSurface(pos.x, pos.z);
                // pos.y -= STRENGTH * calculateSurface(0.0, 0.0) ;
            
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }  
        `;

        this.fragmentShader = `
            precision highp float;
        
            varying vec2 vUv; 
            uniform sampler2D uMap;
            uniform float uTime;
            uniform vec2 uKeyboard; 
            uniform vec2 uMouse;  
            uniform vec3 uColor; // ms({ value: '#ff0000' })
            
            void main() {
                vec2 uv = vUv * 10.0 + vec2(uTime * (0.05 * uMouse * 0.05));
            
                uv.y += 0.01 * (sin(uv.x * 3.5 + uTime * 0.35) + sin(uv.x * 4.8 + uTime * 1.05) + sin(uv.x * 7.3 + uTime * 0.45)) / 3.0;
                uv.x += 0.12 * (sin(uv.y * 4.0 + uTime * 0.5) + sin(uv.y * 6.8 + uTime * 0.75) + sin(uv.y * 11.3 + uTime * 0.2 )) / 3.0 ;
                uv.y += 0.12 * (sin(uv.x * 4.2 + uTime * 0.64) + sin(uv.x * 6.3 + uTime * 1.65) + sin(uv.x * 8.2 + uTime * 0.45)) / 3.0;
                
                vec2 key = uKeyboard;
                
                vec4 tex1 = texture2D(uMap, uv + vec2(key.x, key.y)); 
                vec4 tex2 = texture2D(uMap, uv + vec2(key.x + 0.3, key.y + 0.3));
                vec3 blue = uColor; 
                float alpha = 0.02;
                gl_FragColor = vec4(blue + vec3(tex1.a * alpha - tex2.a * alpha), 1.0);
            }
        `;

        this.material = new MagicShader({
            uniforms: {
                uMap: {value: new TextureLoader().load("https://cinemont.com/tutorials/zelda/water.png", (texture) => {
                    texture.wrapS = texture.wrapT = RepeatWrapping;
                })},
                uTime: {type: 'f', value: 0.0},
                uColor: {type: 'f', value: new Color('#d1d3e1')},
                uKeyboard: {type: 'v2', value: new Vector2(0,0)},
                uMouse: {type: 'v2', value: new Vector2(0,0)}
            },
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader,
            side: DoubleSide,
            vertexColors: true
        });
    }

    addEventListeners() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowRight':
                    //console.log("turned right")
                    this.plane.material.uniforms.uKeyboard.value.x += 0.1
                    console.log(this.plane.material.uniforms.uKeyboard.value.x, this.plane.material.uniforms.uKeyboard.value.y)
                    break
                case 'ArrowLeft':
                    //console.log("turned left")
                    this.plane.material.uniforms.uKeyboard.value.x -= 0.1
                    console.log(this.plane.material.uniforms.uKeyboard.value.x, this.plane.material.uniforms.uKeyboard.value.y)
                    break
                case 'ArrowDown':
                    //console.log("go down")
                    this.plane.material.uniforms.uKeyboard.value.y -= 0.1
                    console.log(this.plane.material.uniforms.uKeyboard.value.x, this.plane.material.uniforms.uKeyboard.value.y)
                    break
                case 'ArrowUp':
                    //console.log("go up")
                    this.plane.material.uniforms.uKeyboard.value.y += 0.1
                    console.log(this.plane.material.uniforms.uKeyboard.value.x, this.plane.material.uniforms.uKeyboard.value.y)
                    break
                default:
                    break
            }
        }, false)
        document.addEventListener('mousemove', (e) => {
            this.plane.material.uniforms.uMouse.value.x = e.clientX / 100;
            this.plane.material.uniforms.uMouse.value.y = e.clientY / 100;

            //console.log(this.plane.material.uniforms.uMouse.value)
        }, false)
    }

    update(time, mouse) {
        this.plane.material.uniforms.uTime.value = time
        //this.plane.material.uniforms.uMouse.x = mouse.x * 100
        //this.plane.material.uniforms.uMouse.y = mouse.y
    }
}
