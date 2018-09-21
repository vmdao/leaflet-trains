import { DivIcon } from 'leaflet';

export var TrainIcon = DivIcon.extend({
  initialize: function(options, properties) {
    var angle = options.angle || 0;
    var data = properties;
    var iconUrl = 'assets/images/ic-marker-train.svg';
    var html =
      '<div class="leaflet-trains-train-asset"><div class="leaflet-trains-train-asset-name">' +
      data.trainNo +
      '</div><img class="leaflet-trains-train-asset-img" src="' +
      iconUrl +
      '"></div><div class="leaflet-trains-train-asset-or" style="transform: rotate(' +
      angle +
      'deg);"><div class="leaflet-trains-train-asset-arrow arrow-es"><div class="train-arrow"><div class="train-arrow-after"></div></div></div></div>';
    var sizeIcon = [38, 38];

    var _options = {
      html: html,
      iconSize: sizeIcon,
      popupAnchor: [0, -41]
    };

    DivIcon.prototype.initialize.call(this, _options);
  }
});

export var trainIcon = function(options, properties) {
  return new TrainIcon(options, properties);
};
