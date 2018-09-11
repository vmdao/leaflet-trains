import { DivIcon } from 'leaflet';

export var TrainIcon = DivIcon.extend({
  initialize: function(options) {
    const data = options.properties;
    const iconUrl = 'assets/images/ic-marker-train.svg';
    const html =
      '<div class="leaflet-trains-train-asset"><div class="leaflet-trains-train-asset-arrow arrow-es"><div class="train-arrow"></div></div><div class="leaflet-trains-train-asset-name">TH-' +
      data.TrainNo +
      '</div><img class="leaflet-trains-train-asset-img" src="' +
      iconUrl +
      '"></div>';
    const sizeIcon = [38, 38];

    const _options = {
      html: html,
      iconSize: sizeIcon,
      popupAnchor: [0, -41]
    };

    DivIcon.prototype.initialize.call(this, _options);
  }
});

export var trainIcon = function(options) {
  return new TrainIcon(options);
};
