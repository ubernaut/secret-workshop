export const onResize = ({ canvas, renderer, camera }) => {
  // camera.aspect = canvas.clientWidth / canvas.clientHeight
  // camera.updateProjectionMatrix()
  // renderer.setSize(canvas.clientWidth, canvas.clientHeight)

  camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();

   renderer.setSize( window.innerWidth, window.innerHeight );
}
