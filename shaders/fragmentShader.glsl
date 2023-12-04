#version 300 es

precision highp int;
precision highp float;

//UNIFORMS
//matrices
uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
//transfer function
uniform vec4 uTF;
uniform float uTFOpacity;
uniform vec3 uTFColor;
//light
uniform float uLightLambda;
uniform float uLightPhi;
uniform float uLightRadius;
uniform float uLightDistance;
uniform int uLightNRays;
//textures
uniform vec3 uDimensions;
uniform highp sampler3D uVolume;

//VARYINGS
in vec3 vTextureCoord;

out vec4 frag_color;



void main(void) {
  
  highp vec4 texelColor = texture(uVolume, vTextureCoord);

  frag_color = vec4(vTextureCoord, 1);
  
}

//send the data to the texture!
