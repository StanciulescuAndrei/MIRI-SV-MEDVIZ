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
in vec3 fragPos;

out vec4 frag_color;



void main(void) {
  
  highp vec4 texelColor = texture(uVolume, vTextureCoord);

  frag_color = vec4(vTextureCoord, 1);
  mat4 inverseView = inverse(uModelViewMatrix);
  vec4 cameraPos = inverseView * vec4(0.0f, 0.0f, 0.0f, 1.0f);
  vec3 direction = normalize(fragPos - cameraPos.xyz);

  highp vec4 texelColor;
  float grayvalue;
  float scaling = 0.0f;

  for(int i=0;i<150;i++){
    scaling = scaling + 0.01f;
    texelColor = texture(uVolume, vTextureCoord + direction * scaling);
    grayvalue += (texelColor.r - uTF.x) / (uTF.w - uTF.x) / 50.0f;
    if(grayvalue > 0.95f)
      break;
  }
  frag_color = vec4(grayvalue, grayvalue, grayvalue, 1.0f );
  
}

//send the data to the texture!
