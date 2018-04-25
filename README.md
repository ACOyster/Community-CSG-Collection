# The Community CSG Collection

To try and keep the number of custom CSG mods down, Metapod and I colluded to put together one giant mod to store all the best of the community's CSG work. This has the benefit of simplifying map pack dependencies, and presenting a clearer experience to players. Whilst we ensure that a high quality of work is maintained, we do not curate this collection. Contributions are accepted and encouraged, and we are keen to help anyone trying to get into PA modding in any way we can. 

My guide to creating custom CSG can be found at https://drive.google.com/open?id=1Blptknucz0uRbAvAIyq2ynCOD9TVVGWjHr-DhUQKe7M

#### Contributions

To contribute to this project, submit a pull request containing:

 - Your .papa and .json files in the correct file system format for both the client and server mod
 - An updated changelog with respect to your contribution
 - Your name added to the author field of both modinfo.json files if neccessary e.g. 
 		"author": "acesoyster, metapod, ..., yourname",
 - UI code that has been updated to reference your biome if neccesary

Please ensure that your pull requests are up to date aainst the master branch of this project.

Pull requests will be reviewed against the following criteria in order:

 - Is the pull request up to date with the master branch?
 - Do the file names follow the 'biome_object_00_type' format? e.g. "flowers_daffodil_03_diffuse.papa"
 - Have all non-papa media files been removed?
 - Does the community mod manager correctly recognsie the mod?
 - Does the mod allow system editors to manually place the CSG, with correct rendering?
 - Is the default size for the CSG sensible?
 - If relevent, does the mod allow system editors to generate reasonable planets with the custom biome?
 - Do the artistic elements of the CSG meet the quality standards of the project. Specifically:
 -- Do the models have sensible vertex counts?
 -- Are they textured and normalled to fit the art style of PA's CSG?
 -- Do they cause zero or few pathing problems?
 - Does the pull request contain any materials that conflict with the project's licence?

All pull requests will recieve feedback, and we will try and provide help on technical issues if requested.

Note that we do not require CSG to be part of a generatable biome to be included.

Also note that any pull request that removes a CSG brush will not be accepted, as this will cause the system editor to crash.

Happy Modding! - acesoyster
