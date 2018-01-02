
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n'+
  'attribute vec2 a_TexCoord;\n'+
  'varying vec2 v_TexCoord;\n' +
  'void main(){\n'+
    'gl_Position = a_Position;\n'+
    'v_TexCoord = a_TexCoord;\n'+
  '}\n';
var FSHADER_SOURCE =
  'precision mediump float;\n'+
  'uniform sampler2D u_Sampler;\n'+
  'varying vec2 v_TexCoord;\n'+
  'void main(){\n'+
    'gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n'+
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

  var Tx=0.6;
  // background
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
  
  var currentAngle = 0.0;
  var modelMatrix = new Matrix4();
  
  
}

function initVertexBuffers(gl){
  var vertices = new Float32Array([
    -0.5,0.5, 0.0,1.0,
    -0.5,-0.5, 0.0,0.0,
    0.5,0.5, 1.0,1.0,
    0.5,-0.5, 1.0,0.0
  ]);
  var n = 4;

  var vertexBuffer = gl.createBuffer();
  var FSIZE = vertices.BYTES_PER_ELEMENT;
  
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*4,0);
  gl.enableVertexAttribArray(a_Position);
  
  var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE*4, FSIZE*2);
  gl.enableVertexAttribArray(a_TexCoord);
  
  return n;
}

function initTextures(gl,n){
    var texture = gl.createTexture();
    var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
    
    var image = new Image();
    image.onload = function(){ loadTexture(gl,n,texture, u_Sampler, image); };
    image.src = 'resources/sky.jpg';
    
    return true;
}

function loadTexture(gl,n,texture,u_Sampler,image) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE2D, texture);
    
    gl.textParameteri(gl.TEXTURE2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniformli(u_Sampler, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
}









