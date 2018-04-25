/*
Code written by Wondible by request of Acesoyster for this guide to custom CSG:
https://drive.google.com/open?id=1Blptknucz0uRbAvAIyq2ynCOD9TVVGWjHr-DhUQKe7M

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>
*/

console.log("Generating buttons for custom CSG from csg_example");
(function() {
  var start = /[^\/]*$/;
  var end = /[.]json[^\/]*$/;

  var specToTitle = function (csg) {

    if (!csg || !csg.brush_spec)
      return csg;

    var zeros = /0+(?=\d)/;
    var title = csg.brush_spec;

    title = title.substring(title.search(start), title.search(end));
    title = title.replace(zeros, '');
    title = title.replace(/_/g, ' ');
    csg.title = title;
  };

  var specToImage = function (csg) {

    if (!csg || !csg.brush_spec)
      return '';

    var title = csg.brush_spec;
    title = title.substring(title.search(start), title.search(end));

    var image = 'coui://ui/main/game/system_editor/img/brushes/' + title + '.png';
    csg.image = image;
  };

  var brushMapRule = ko.computed(function () {
    if (model.brushMap()['crystal']) return
    if (model.brushMap()['tools']) return

    var process = function (biome) {
      var deferred = $.Deferred();
      var url = 'coui://pa/terrain/' + biome + '/' + biome + '.json';
      $.get(url).always(function (contents) {
        var result = [];

        try {
          contents = decode(contents);
          result = contents.brushes;
        }
        catch (e)
        {
          console.error('failed to parse biome:' + url);
        }

        deferred.resolve(result);
      });

      return deferred;
    };

    /* don't use the grass biome here  */
    var brush_groups_biomes = ['crystal', 'tools'];

    UberUtility.waitForAll(_.map(brush_groups_biomes, process)).then(function (list) {

      var result = model.brushMap()

      var process = function (element) {
        /* brushes are added to layer zero to indicate a WIP. they should not be used. */
        if (!element || element.layer === 0)
          return null;

        specToImage(element);
        specToTitle(element);

        return _.omit(element, ['bias',
                      'biom_distance_range',
                      'layer',
                      'noise_range',
                      'note',
                      'scale_variation',
                      'threshold',
                      'weight',
                      'weight_hard',
                      'weight_scale',
                      'planet_size_range',
                      'max_instances',
                      'elevation_range',
                      'fixed_orient',
                      'pole_distance_range',
                      'latitude_snap',
                      'longitude_snap']);
      };

      _.forEach(list, function (element, index) {
        var brushes = _.compact(_.map(element, process));
        var groups = {};

        _.forEach(brushes, function (brush) {
          var group = brush.group;
          if (!group)
            return;

          if (!groups[group])
            groups[group] = [];

          groups[group].push(brush)
        });

        if (brushes.length)
          result[brush_groups_biomes[index]] = groups;
      });

      model.brushMap(result);
    });
  });
})();

model.biomes.push('crystal')