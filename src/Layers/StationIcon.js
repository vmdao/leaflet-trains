import { DivIcon } from 'leaflet';

export var StationIcon = DivIcon.extend({
  initialize: function(options, properties) {
    var data = properties;
    var iconUrl = 'assets/images/ic-marker-station.svg';
    var html =
      '<div class="leaflet-trains-station-asset"><div class="leaflet-trains-station-asset-name">' +
      data.name +
      '</div><img class="leaflet-trains-station-asset-img" src="' +
      iconUrl +
      '"></div>';
    var sizeIcon = [24, 24];

    var _options = {
      html: html,
      iconSize: sizeIcon
    };

    DivIcon.prototype.initialize.call(this, _options);
  }
});

export var stationIcon = function(options, properties) {
  return new StationIcon(options, properties);
};
