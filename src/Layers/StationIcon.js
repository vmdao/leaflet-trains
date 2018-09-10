import { DivIcon } from 'leaflet';

export var StationIcon = DivIcon.extend({
  initialize: function(options) {
    const iconUrl = 'assets/images/ic-marker-station.svg';
    const html =
      '<div class="leaflet-trains-station-asset"><div class="leaflet-trains-station-asset-name">Kooyong</div><img class="leaflet-trains-station-asset-img" src="' +
      iconUrl +
      '"></div>';
    const sizeIcon = [24, 24];

    const _options = {
      html: html,
      iconSize: sizeIcon
    };
    DivIcon.prototype.initialize.call(this, _options);
  }
});

export var stationIcon = function(options) {
  return new StationIcon(options);
};
