#version 300 es

precision highp int;
precision highp float;

// UNIFORMS
// matrices
uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
// transfer function
uniform vec4 uTF;
uniform float uTFOpacity;
uniform vec3 uTFColor;
// light
uniform float uLightLambda;
uniform float uLightPhi;
uniform float uLightRadius;
uniform float uLightDistance;
uniform int uLightNRays;
// textures
uniform vec3 uDimensions;
uniform highp sampler3D uVolume;

// VARYINGS
in vec3 vTextureCoord;
in vec3 fragPos;

out vec4 frag_color;

const float samplingTolerance = 1e-3;

void main(void)
{
	mat4 inverseView = inverse(uModelViewMatrix);
	vec4 cameraPos = inverseView * vec4(0.0f, 0.0f, 0.0f, 1.0f);
	vec3 direction = normalize(fragPos - cameraPos.xyz);

	// Sample 4 times the requency of the image just to be sure
	float maxDim = 4.0f * max(max(uDimensions.x, uDimensions.y), uDimensions.z);

	highp vec4 texelColor;
	float grayvalue;
	float scaling = 0.0f;
	float sampleDistance = 1.0f / maxDim;

	float intensityThroughTF;

	for (int i = 0; i < int(3.0f / sampleDistance); i++)
	{

		// New sample point along the ray
		vec3 samplePoint = vTextureCoord + direction * scaling;

		// We stop when we get out of the volume since the texture is clamped we could get artifacts
		if (samplePoint.x < -samplingTolerance || samplePoint.y < -samplingTolerance || samplePoint.z < -samplingTolerance)
			break;
		if (samplePoint.x > 1.0f + samplingTolerance || samplePoint.y > 1.0f + samplingTolerance || samplePoint.z > 1.0f + samplingTolerance)
			break;

		// Advance sample point
		scaling = scaling + sampleDistance;

		// Get color
		texelColor = texture(uVolume, samplePoint);

		// Do some magic with the TF, still need to implement it
		if(texelColor.r < uTF.x || texelColor.r > uTF.w)
			continue;

		if (uTF.y <= texelColor.r && texelColor.r <= uTF.z)
		{
			intensityThroughTF = uTFOpacity;
		}
		else if(texelColor.r <= uTF.y)
		{
			intensityThroughTF = (texelColor.r - uTF.x) / (uTF.y - uTF.x) * uTFOpacity;
		}
		else
		{
			intensityThroughTF = uTFOpacity - (texelColor.r - uTF.z) / (uTF.w - uTF.z) * uTFOpacity;
		}
		grayvalue += intensityThroughTF * sampleDistance;

		// Stop when the accumulation is already too high
		if (grayvalue > 0.95f)
			break;
	}

	frag_color = vec4(grayvalue * uTFColor, 1.0f);
}

// send the data to the texture!
