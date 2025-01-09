# Threefreshed Model Viewer

This Model viewer was started as an attempt to practice using Three.js concepts I've been learning.

It started off really simple with a cube that was created internally by passing geometry and material variables to a Mesh. 
Lil-gui was then used to create a debugging UI that has options to change the color of the active model (the cube at this point), set the visibility, change the view mode from solid to wireframe, adjust the width, height and depth segments. 
In addition to these, you can also translate the object along the y-axis, as well as rotate it around the y-axis. I intentionally didn't include other axes for translation and rotation to reduce the amount of controls in the UI. 
I was also able to add actions you could perform on the active object. After successfully adding these functionalities, I decided to expand the scope of the app by adding the option to switch the active model through the UI, then I went a step further to integrate drag and drop functionality into the app which unfortunately, broke a lot of things and I haven't fixed those breakages as of now. 
Regardless, I moved on to texturing the ground plane in the scene suing a texture from freepik. couldn't see the texture on the mesh after instantiating a `gridTexture` variable, creating a textureLoader object and passing it to texture. After trying a few tweaks without success, I resized the image from 4500 x 4500 to 4096 x 4096 and this seemed to fix the problem. I understand that using textures with sizes that are powers of 2 is important because mipmapping is carried out automatically by the GPU and if the number can't be perfectly halved, it could lead to distortions in the texture. 
I also added a converted glb file (originally and FBX animation file from Mixamo) to the model presets in the scene but could never get it to load up properly. This step, however, taught me how to convert `FBX` files to `GLTF` using a CLI tool called `fbx2gltf`. 

I'm considering doing an extensive documentation of this project but I think I'll pass as I have more pressing priorities. 
I may continue to implement new functions as I learn more.