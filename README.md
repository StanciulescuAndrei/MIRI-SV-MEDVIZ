# MIRI-SV-MEDVIZ
## Requirements
- You will need some virtual server to execute this skeleton.
  - It is recommendable to use **VS Code** with the *Live server* extension.
- It is mandatory to install Chart.js library
  - In VS Code, you can install it in the terminal with:

    ```> npm install chart.js```

## How to use it
  - By default, the cube shows the texture coordinates of the fragments encoded as colors.
  - The navigation is as follows:
    - Left click and drag => to rotate the camera.
    - Wheel => Zoom in/out.
  - The *Load Model* groupbox allows the user to select a volume model (in raw format) and to load it.
    - **Important:** => In current version, skeleton fails if you try to upload two models one after the other. You need to reload the page first!
  - The Transfer function groupbox allows the user to configure the function. 
    - There is an slider for the opacity and a button for the color. 
    - The user can define the position (in the volumen range) of each of the vertices of the trapeze (*X0*, *X1*, *X2* and *X3*) that defines the transfer function.
  - The light configuration groupbox allows the user to configure the light.
    - *Lambda* and *Phi* define the spherical coordinates of the camera position.
    - *Distance* defines the distance from the center of the cube to the light position
    - *Radius* defines the radius of the lighting disk/sphere.
    - *Number of rays* defines the number of rays traced to compute lighting.
      - 0 rays => No lighting.
      - 1 ray => Only hard shadows.
      - \>1 ray => Including soft shadows.

## Tasks:
1. Create a tutorial on how to preprocess volumetric data by pairs.
   1. It includes a python script to convert volumetric models to raw format.
2. Implement a *Fragment Shader* to visualize volumetric models taking into account the transfer function defined by the user.
3. Implement a lighting algorithm in the *Fragment Shader* following the lighting settings provided by the user.