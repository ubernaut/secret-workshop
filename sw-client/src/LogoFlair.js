import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { onResize } from './utils.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import logo from './swcube2textured.gltf'
import { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json'

export const init = ({ canvas, container }) => {

    const scene = new THREE.Scene()

    scene.background = new THREE.Color(0x000000)

    //const stats = new Stats()
    //stats.showPanel(0)
    //container.appendChild(stats.dom)
    //stats.dom.className = 'stats'

    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      2000
    )


    camera.updateProjectionMatrix()
    camera.position.set(12, 0, 12)
    const controls = new OrbitControls(camera, canvas)
    controls.update()
    let renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    const loader = new GLTFLoader();

    let swlogo
    loader.load( logo, function ( gltf ) {
      gltf.scene.name="swlogo"
      console.log(gltf)
      swlogo = gltf.scene.children[0]

      gltf.scene.traverse( function( node ) {
          if ( node.isMesh ) { node.castShadow = true; }
      } );

      scene.add( gltf.scene );
    }, undefined, function ( error ) {
    	console.error( error );
    } );
    console.log(swlogo)

    const handleResize = (event) => {
      event.preventDefault()
      onResize({ canvas, camera, renderer })
    }
    window.addEventListener('resize', handleResize, false)
    onResize({ canvas, camera, renderer })
    const light1 = new THREE.PointLight(0xffffff, 1, 100)
    light1.position.set(40, 40, 40)

    const light2 = new THREE.PointLight(0xff3300, 2, 100)
    light2.position.set(0, 0, 0)
    light2.castShadow=true
    light2.shadow.mapSize.width = 512; // default
    light2.shadow.mapSize.height = 512; // default
    light2.shadow.camera.near = 0.5; // default
    light2.shadow.camera.far = 500; // default

    scene.add(light1)
    scene.add(light2)

  const geometry = new THREE.BoxGeometry(30, 30, 30)
  const material = new THREE.MeshStandardMaterial({ color: 0x333333 })
  material.side=THREE.DoubleSide
  const cube = new THREE.Mesh(geometry, material)
  cube.position.set(0,0,0)
  cube.receiveShadow=true;
  scene.add(cube)
  const fontloader = new FontLoader();
  const font = new Font(helvetiker)
//  fontloader.load( helvetiker, function ( font ) {

    const textgeometry = new TextGeometry( 'Secret Workshop', {
      font: font,
      size: 1,
      height: .2,
      curveSegments: 12,
      bevelEnabled: false
    } );
    const textmaterial = new THREE.MeshStandardMaterial({ color: 0x000000 })
    const secretText = new THREE.Mesh(textgeometry, textmaterial)
    secretText.position.set(-7,-4,0)
    secretText.rotateY(.78)
    //secretText.rotateX(1.57)
    //secretText.castShadow=true;
    secretText.traverse( function( node ) {
        if ( node.isMesh ) { node.castShadow = true; }
    } );
    scene.add(secretText)
  //} );


    const clock = new THREE.Clock()
    const animate = () => {
      if (!renderer) {
        return
      }
      //stats.begin()
      requestAnimationFrame(animate)
      renderer.render(scene, camera)

      //flicker the light
      let randval =(.6-Math.random())
      light2.intensity= 1+randval/10
      randval=randval/60
      light2.position.set(randval,randval,randval)



      if(swlogo){
        swlogo.rotateY(clock.getDelta() * -0.3)
        swlogo.rotateX(clock.getDelta() * -0.3)
        swlogo.rotateZ(clock.getDelta() * -0.3)
      }
      //stats.end()
    }
    animate()

    return () => {
      renderer.dispose()
      //stats.scene = null
      //container.removeChild(//stats.dom)
      renderer = null
      window.removeEventListener('resize', handleResize)
      controls.dispose()
    }
}
export default init
