import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { onResize } from './utils.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import logo from './dodec2.glb';
import cabin from './cabin8-var3.glb';
import { Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json'

export const init = ({ canvas }) => {

    const scene = new THREE.Scene()

    scene.background = new THREE.Color(0x000000)

    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      2000
    )


    camera.updateProjectionMatrix()
    camera.position.set(12, 0, 12)
    const controls = new OrbitControls(camera, canvas)
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.update()
    let renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.shadowMap.autoUpdate = true;


    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    const loader = new GLTFLoader();

    let swlogo
    loader.load( logo, function ( gltf ) {
      gltf.scene.name="swlogo"
      swlogo = gltf.scene.children[0]

      gltf.scene.traverse( function( node ) {
          if ( node.isMesh ) { node.castShadow = true; }
      } );

      scene.add( gltf.scene );
    }, undefined, function ( error ) {
    	console.error( error );
    } );
    

    let swcabin
    loader.load( cabin, function ( gltf ) {
      gltf.scene.name="cabin"
      swcabin = gltf.scene.children

      gltf.scene.traverse( function( node ) {
          if ( node.isMesh ) { 
            node.castShadow = true;
            node.receiveShadow = true; 
          }
      } );
      
      
      gltf.scene.rotation.y = -Math.PI / 2;
      scene.add( gltf.scene );
    }, undefined, function ( error ) {
    	console.error( error );
    } );
    console.log("cabin")
    console.log(swcabin);
    const handleResize = (event) => {
      event.preventDefault()
      onResize({ canvas, camera, renderer })
    }
    window.addEventListener('resize', handleResize, false)
    onResize({ canvas, camera, renderer })
    const light1 = new THREE.DirectionalLight(0xffffff, .1)
    light1.position.set(100, 100, 100)
    light1.castShadow=true
    light1.shadow.mapSize.width = 1024; // default
    light1.shadow.mapSize.height = 1024; // default
    light1.shadow.camera.near = 1; // default
    light1.shadow.camera.far = 10000; // default
    //light1.shadow.camera = new THREE.OrthographicCamera(-5,5 ,-5,5,10,500);


    const targetObject = new THREE.Object3D(); 
    scene.add(targetObject);
    targetObject.position.set(-100, -100,-100)
    light1.target=targetObject;

    const light2 = new THREE.PointLight(0xff0000, .4, 100)
    light2.position.set(0, 0, 0)
    light2.castShadow=true
    light2.shadow.mapSize.width = 1024; // default
    light2.shadow.mapSize.height = 1024; // default
    light2.shadow.camera.near = 0.5; // default
    light2.shadow.camera.far = 500; // default

    const geometrys2 = new THREE.SphereGeometry( .2, 10, 10 );
    const materials2 = new THREE.MeshBasicMaterial( { color: 0xff1100 } );
    const sphere2 = new THREE.Mesh( geometrys2, materials2 );
    light2.add(sphere2)



    const light3 = new THREE.PointLight(0xffff00, .3, 100)
    light3.position.set(0, 0, 0)
    light3.castShadow=true
    light3.shadow.mapSize.width = 1024; // default
    light3.shadow.mapSize.height = 1024; // default
    light3.shadow.camera.near = 0.5; // default
    light3.shadow.camera.far = 500; // default

    const geometrys3 = new THREE.SphereGeometry( .2, 10, 10 );
    const materials3 = new THREE.MeshBasicMaterial( { color: 0xff8800 } );
    const sphere3 = new THREE.Mesh( geometrys3, materials3 );
    light3.add(sphere3)

    const light4 = new THREE.PointLight(0xff0000, 0.4, 100)
    light4.position.set(0, 0, 0)
    light4.castShadow=true
    light4.shadow.mapSize.width = 1024; // default
    light4.shadow.mapSize.height = 1024; // default
    light4.shadow.camera.near = 0.5; // default
    light4.shadow.camera.far = 500; // default

    const geometrys4 = new THREE.SphereGeometry( .2, 10, 10 );
    const materials4 = new THREE.MeshBasicMaterial( { color: 0xff3300 } );
    const sphere4 = new THREE.Mesh( geometrys4, materials4 );
    light4.add(sphere4)

    scene.add(light1)
    scene.add(light2)
    scene.add(light3)
    scene.add(light4)

  // const geometry = new THREE.PlaneGeometry(1000, 1000)
  // const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  // material.side=THREE.DoubleSide
  // const cube = new THREE.Mesh(geometry, material)
  // cube.position.set(0,0,0)
  // cube.receiveShadow=true;
  // cube.rotation.x = -Math.PI / 2; // Rotates the plane to be horizontal (like a floor)
  // cube.position.y = -3
 // scene.add(cube)
  const font = new Font(helvetiker)

  const geometrys5 = new THREE.SphereGeometry( 20, 100, 100 );
  const materials5 = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  materials5.side=THREE.DoubleSide;

  const sphere5 = new THREE.Mesh( geometrys5, materials5 );
  sphere5.receiveShadow=true;
scene.add(sphere5)
//sphere5.position.set(0,-2004,0);


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
    secretText.rotateY(.78)
    secretText.rotateX(1.57)
    secretText.castShadow=true;
    secretText.traverse( function( node ) {
        if ( node.isMesh ) { node.castShadow = true; }
    } );
    //scene.add(secretText)
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

  //scene.add( spotLight );

    const clock = new THREE.Clock()
    const animate = () => {
      if (!renderer) {
        return
      }
      requestAnimationFrame(animate)
      renderer.render(scene, camera)

      if(swlogo){
        const delta = clock.getDelta();
        // Rotate around world axes
        swlogo.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), delta * .1); // World X
        swlogo.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), delta * .1); // World Y
        swlogo.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), delta * .1); // World Z
      }
      //flicker the light
      let randval =0
      let randvalx =0
      let randvaly =0
      let randvalz =0
      if(renderer.info.render.frame%1==0){

        randval =(.5-Math.random())
        randvalx =(.5-Math.random())
        randvaly =(.5-Math.random())
        randvalz =(.5-Math.random())
        light2.intensity= .5+randval/10

        randval=randval/10
        randvalx=randvalx/10
        randvaly=randvaly/10
        randvalz=randvalz/10
        light2.position.set(randval,randval,randval)
}
        if(renderer.info.render.frame%2==0){

        randvalx =(.5-Math.random())/20
        randvaly =(.5-Math.random())/20
        randvalz =(.5-Math.random())/20
        randval =(.5-Math.random())
        light3.intensity= 0.5+randval/10
        light3.position.set(randvalx,randvaly,randvalz)
        }
        if(renderer.info.render.frame%5==0){

         randvalx =(.5-Math.random())/6
         randvaly =(.5-Math.random())/6
         randvalz =(.5-Math.random())/6
        randval =(.5-Math.random())
        light4.intensity=0.5+ randval/10
        randval=randval/6
        light4.position.set(randvalx,randvaly,randvalz)
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
