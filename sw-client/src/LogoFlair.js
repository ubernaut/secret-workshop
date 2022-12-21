import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { onResize } from './utils.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import logo from './swcube2textured.gltf'
import { Font } from 'three/examples/jsm/loaders/FontLoader.js';
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
    controls.enableZoom = false;
    controls.enablePan = false;
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

    const handleResize = (event) => {
      event.preventDefault()
      onResize({ canvas, camera, renderer })
    }
    window.addEventListener('resize', handleResize, false)
    onResize({ canvas, camera, renderer })
    const light1 = new THREE.PointLight(0xffffff, 1, 100)
    light1.position.set(0, 40, 0)

    const light2 = new THREE.PointLight(0xff0000, .4, 100)
    light2.position.set(0, 0, 0)
    light2.castShadow=true
    light2.shadow.mapSize.width = 512; // default
    light2.shadow.mapSize.height = 512; // default
    light2.shadow.camera.near = 0.5; // default
    light2.shadow.camera.far = 500; // default

    const geometrys2 = new THREE.SphereGeometry( .5, 10, 10 );
    const materials2 = new THREE.MeshBasicMaterial( { color: 0xff1100 } );
    const sphere2 = new THREE.Mesh( geometrys2, materials2 );
    light2.add(sphere2)



    const light3 = new THREE.PointLight(0xffff00, 1, 100)
    light3.position.set(0, 0, 0)
    light3.castShadow=true
    light3.shadow.mapSize.width = 512; // default
    light3.shadow.mapSize.height = 512; // default
    light3.shadow.camera.near = 0.5; // default
    light3.shadow.camera.far = 500; // default

    const geometrys3 = new THREE.SphereGeometry( .5, 10, 10 );
    const materials3 = new THREE.MeshBasicMaterial( { color: 0xff8800 } );
    const sphere3 = new THREE.Mesh( geometrys3, materials3 );
    light3.add(sphere3)

    const light4 = new THREE.PointLight(0xff0000, 0.4, 100)
    light4.position.set(0, 0, 0)
    light4.castShadow=true
    light4.shadow.mapSize.width = 512; // default
    light4.shadow.mapSize.height = 512; // default
    light4.shadow.camera.near = 0.5; // default
    light4.shadow.camera.far = 500; // default

    const geometrys4 = new THREE.SphereGeometry( .5, 10, 10 );
    const materials4 = new THREE.MeshBasicMaterial( { color: 0xff3300 } );
    const sphere4 = new THREE.Mesh( geometrys4, materials4 );
    light4.add(sphere4)

    //scene.add(light1)
    scene.add(light2)
    scene.add(light3)
    scene.add(light4)

  const geometry = new THREE.BoxGeometry(40, 40, 40)
  const material = new THREE.MeshStandardMaterial({ color: 0x333333 })
  material.side=THREE.DoubleSide
  const cube = new THREE.Mesh(geometry, material)
  cube.position.set(0,0,0)
  cube.receiveShadow=true;
  scene.add(cube)
  const font = new Font(helvetiker)
//  fontloader.load( helvetiker, function ( font ) {

    const textgeometry = new TextGeometry( 'Secret Workshop', {
      font: font,
      size: .4,
      height: .2,
      curveSegments: 12,
      bevelEnabled: false
    } );
    const textmaterial = new THREE.MeshPhongMaterial({ color: 0x000000 })
    const secretText = new THREE.Mesh(textgeometry, textmaterial)
    secretText.position.set(.3,-6.5,3)
    secretText.rotation.set(.9,.45,-.5)
    //secretText.rotateY(.78)
    //secretText.rotateX(1.57)
    //secretText.castShadow=true;
    secretText.traverse( function( node ) {
        if ( node.isMesh ) { node.castShadow = true; }
    } );
    scene.add(secretText)
  //} );

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.angle=Math.PI/6
  spotLight.position.set( 5, -10, 5 );
  spotLight.rotation.set(.7,0,0)
  //spotLight.map = new THREE.TextureLoader().load( url );

  spotLight.castShadow = true;

  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 400;
  spotLight.shadow.camera.fov = 30;

  scene.add( spotLight );

    const clock = new THREE.Clock()
    const animate = () => {
      if (!renderer) {
        return
      }
      //stats.begin()
      requestAnimationFrame(animate)
      renderer.render(scene, camera)



      if(swlogo){
        swlogo.rotateY(clock.getDelta() * -0.3)
        swlogo.rotateX(clock.getDelta() * -0.3)
        swlogo.rotateZ(clock.getDelta() * -0.3)
      }
      //flicker the light
      console.log(renderer.info.render.frame)
      if(renderer.info.render.frame%2==0){
        let randval =(.5-Math.random())
        light2.intensity= .5+randval/10
        sphere2.geometry.scale(1+randval/10,1+randval/10,1+randval/10)
        randval=randval/8
        light2.position.set(randval,randval,randval)
        randval =(.5-Math.random())
        sphere3.geometry.scale(1+randval/10,1+randval/10,1+randval/10)
        light3.intensity= 1+randval/10
        randval=randval/20
        light3.position.set(randval,randval,randval)
        randval =(.6-Math.random())
        //light4.intensity= 1+randval/10
        randval=randval/6
        light4.position.set(randval,randval,randval)
        //sphere3.scale(1+randval/10,1+randval/10,1+randval/10)
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
