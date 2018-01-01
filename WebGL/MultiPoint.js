// var VSHADER_SOURCE =
//   'void main(){\n'+
//   ' gl_Position = vec4(0.3, 0.4, 0.0, 1.0);\n'+
//   ' gl_PointSize = 10.0;\n'+
//   '}\n';
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n'+
  'uniform mat4 u_xformMatrix;\n'+
  'void main(){\n'+
    'gl_Position = a_Position + u_Translation;\n'+
  '}\n';
var FSHADER_SOURCE =
  'void main(){\n'+
  ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n'+
  '}\n';

function main(){

  var canvas = document.getElementById("webgl");
  var gl = getWebGLContext(canvas);

  if(!gl){
    console.log('not supported for webGL');
    return;
  }

  // initialize shader
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
    console.log('failed to init shader');
    return;
  }

  var n = initVertexBuffers(gl);
  if (n<0){
    console.log('fail to set vertex buffers.');
    return;
  }

  var u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
  gl.uniform4f(u_Translation, 0.3,0.3,0.0 ,0.0);

  // background
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl){
  var vertices = new Float32Array([
    -0.4,0.5, -0.4,-0.5, 0.4,-0.5
  ]);
  var n = 3;

  var vertexBuffer = gl.createBuffer();
  if(!vertexBuffer){
    console.log('Failed create buffer object');
    return -1;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0,0);
  gl.enableVertexAttribArray(a_Position);

  return n;
}























