import { BaseAsset } from './BaseAsset';
import { stationIcon } from '../Layers/StationIcon';

export var StationAsset = BaseAsset.extend({
  initialize: function(options, properties) {
    BaseAsset.prototype.initialize.call(this, options, properties);

    this.assetCanMove = false;
    this.assetCanSelect = false;
    this.assetSelected = false;
    this._createIcon(properties);
  },

  _createIcon(properties) {
    const icon = stationIcon({}, properties);
    this.setIcon(icon);
  }
});

export function stationAsset(options, properties) {
  return new StationAsset(options, properties);
}
