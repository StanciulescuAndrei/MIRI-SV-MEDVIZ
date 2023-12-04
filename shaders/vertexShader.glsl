#version 300 es
precision highp int;
precision highp float;

layout(location=0) in vec4 aVertexPosition;
layout(location=1) in vec3 aVertexNormal;
layout(location=2) in vec3 aTextureCoord;

//matrices
uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

out vec3 vTextureCoord;
out vec3 fragPos;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  fragPos = aVertexPosition.xyz;
  vTextureCoord = aTextureCoord;
}