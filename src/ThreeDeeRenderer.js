export default class ThreeDeeRenderer {

  constructor() {
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000000 );
    this.camera.position.z = 1000;
    this.initialY = -1000000;
    this.camera.rotation.x = -5.11;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );

    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    var geometry = new THREE.PlaneGeometry( 500, 50000, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide, transparent: true, opacity: 0.5} );
    this.plane = new THREE.Mesh( geometry, material );
    this.scene.add( this.plane );

    document.body.appendChild( this.renderer.domElement );
    this.render()

    this.raf = this.raf.bind(this)
    requestAnimationFrame(this.raf)
  }

  raf(t) {
    this.t0 = this.t0 || t;
    const deltaT = t - this.t0;

    const deltaY = this.initialY + deltaT * 299.792;

    console.log(deltaY)

    this.plane.position.y = deltaY;
    this.camera.position.y = deltaY;
    this.render()
    requestAnimationFrame(this.raf)
  }

  angleCamera(x,y) {
    this.camera.rotation.y = - (x - .5) * Math.PI
    this.camera.rotation.x = - (y - .5) * Math.PI

    // console.log(this.camera.rotation.x)
    // console.log(this.camera.rotation.y)
    // this.camera.rotation.y = y
  }


  addGeometry(radius, color, distance){
    var geometry = new THREE.SphereGeometry( radius, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: color, transparent: true,  opacity: 0.5 } );
    var sphere = new THREE.Mesh( geometry, material );
    sphere.position.y = distance
    sphere.position.z = - radius -  1000
    this.scene.add( sphere );
  }

  render(){
    this.renderer.render( this.scene, this.camera );
  }

}