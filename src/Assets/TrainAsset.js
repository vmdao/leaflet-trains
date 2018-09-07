import { BaseAsset } from './BaseAsset';

export var TrainAsset = BaseAsset.extend({
    initialize: function (type, latlng, options) {
        BaseAsset.prototype.initialize.call(this, type, latlng, options);
        this.canMove = true;
        this._createPopup();
    },
    _createPopup() {
        this.bindPopup('Train: ' + this.feature.properties.name)
    },

    updatePosition(latlng) {
        var newLatLng = new L.LatLng(latlng);
        this.setLatLng(newLatLng);
    }
});

export function trainAsset(latlng, options) {
    return new TrainAsset('train', latlng, options);
}