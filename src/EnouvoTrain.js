import { Map, GeoJSON } from 'leaflet';
import { basemapLayer } from './Layers/BasemapLayer';
import { stationAsset } from './Assets/StationAsset';
import { trainAsset } from './Assets/TrainAsset';
import { EventEmitter } from './EventEmitter';

export class EnouvoTrain {
  constructor(el, options) {
    this.poolListener = [];
    this.layerSelected = new Proxy([], {
      set: (target, property, value, receiver) => {
        target[property] = value;
        return true;
      }
    });

    this._createObserver();
    this._createMap(el, options);
  }

  _createObserver() {
    this.observer = new EventEmitter();
    const events = {
      click: message => {
        this.poolListener.filter(l => l.event === 'click').forEach(listener => {
          if (typeof listener.action === 'function') {
            listener.action(message);
          }
        });
      },
      hover: message => {
        this.poolListener.filter(l => l.event === 'hover').forEach(listener => {
          if (typeof listener.action === 'function') {
            listener.action(message);
          }
        });
      },

      selectedTrains: message => {
        this.poolListener
          .filter(l => l.event === 'selectedTrains')
          .forEach(listener => {
            if (typeof listener.action === 'function') {
              let layers = [];
              this.networkMaps.eachLayer(l => {
                if (l.selected) {
                  layers.push(l.feature);
                }
              });
              listener.action(layers);
            }
          });
      }
    };
    this.observer.addListeners(events);
  }

  _createMap(el, options) {
    this._map = new Map(el, options);
    this._createLayer();
  }

  _createLayer() {
    basemapLayer('Streets').addTo(this._map);
  }

  _addEventListener(feature, layer) {
    if (feature && feature.geometry.type === 'LineString') {
      const label =
        feature.geometry.type === 'LineString'
          ? 'Line: ' + feature.properties.name
          : 'Train: ' + feature.properties.name;
      layer.bindTooltip(label);
    }

    layer.on('click', event => {
      const message = {
        originEvent: event,
        data: feature
      };
      this.observer.emitEvent('click', [message]);
      this.observer.emitEvent('selectedTrains', [message]);
    });

    layer.on('mouseover', event => {
      const message = {
        originEvent: event,
        data: feature
      };
      this.observer.emitEvent('hover', message);
    });

    layer.on('mouseout', event => {
      const message = {
        originEvent: event,
        data: feature
      };
      this.observer.emitEvent('hover', message);
    });
  }

  setNetworkMaps(networkMapsData) {
    const that = this;
    this.networkMapsData = networkMapsData;
    this.networkMaps = new GeoJSON(networkMapsData, {
      style: function() {
        return { weight: 7 };
      },
      onEachFeature: this._addEventListener.bind(that),
      pointToLayer: (feature, latlng) => {
        return feature.properties.type === 'STATION'
          ? stationAsset(latlng, feature)
          : trainAsset(latlng, feature);
      }
    });
    this.networkMaps.addTo(this._map);
  }

  addListener(listener) {
    this.poolListener.push(listener);
  }

  addListeners(listeners) {
    this.poolListener = this.poolListener.concat(listeners);
  }

  setView(latLng, zoom, options) {
    this._map.setView(latLng, zoom, options);
  }

  toggleAsset(assetId) {
    this.networkMaps.eachLayer(layer => {
      if (layer.feature.id === assetId) {
        layer.action && layer.action('toggle');
      }
    });
  }

  selectedAsset(assetId) {
    this.networkMaps.eachLayer(layer => {
      if (layer.feature.id === assetId) {
        layer.feature.selected = true;
        layer.action && layer.action('selected');
      }
    });
  }

  selectedAssets(assets) {
    this.networkMaps.eachLayer(l => {
      const layer = assets.find(assetId => {
        if (assetId !== l.feature.id) {
          return false;
        }
        return l;
      });

      if (layer) {
        layer.feature.selected = true;
      }
    });
  }

  selectedAssetsAll() {
    this.networkMaps.eachLayer(l => {
      if (l) {
        l.feature.selected = true;
      }
    });
  }

  unSelectedAsset(Id) {
    this.networkMaps.eachLayer(layer => {
      if (layer.feature.properties.Id === Id) {
        layer.feature.selected = false;
        layer.selected = false;
        layer.feature.properties.selected = false;
      }
    });
  }

  unSelectedAssets(assets) {
    this.networkMaps.eachLayer(l => {
      let layer = assets.find(assetId => {
        if (assetId !== l.feature.id) {
          return false;
        }
        return l;
      });

      if (layer) {
        layer.feature.selected = false;
      }
    });
  }

  unSelectedAssetsAll() {
    this.networkMaps.eachLayer(l => {
      if (l) {
        l.feature.selected = false;
      }
    });
  }
}

export function enouvoTrainInit(el, options) {
  return new EnouvoTrain(el, options);
}
