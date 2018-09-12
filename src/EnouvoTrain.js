import { Map, GeoJSON, control } from 'leaflet';
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
    this.networkMaps = [];
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
    this._map.zoomControl.setPosition('bottomleft');

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
    let overlays = {};
    this.networkMaps = networkMapsData.map(data => {
      const template = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: data.paths
            },
            id: data.properties.Id,
            properties: data.properties
          }
        ]
      };

      const networkMap = new GeoJSON(template, {
        style: function() {
          return { weight: 7 };
        },
        onEachFeature: this._addEventListener.bind(that)
      });
      overlays[data.properties.Name] = networkMap;
      networkMap.addTo(this._map);
      return {
        Id: data.properties.Id,
        networkMap: networkMap,
        name: data.properties.Name
      };
    });

    control
      .layers([], overlays, { position: 'bottomleft', collapsed: false })
      .addTo(this._map);
  }

  clearNetworkMaps() {
    if (this.networkMaps) {
      this.networkMaps.clearLayers();
      this.networkMapsData = null;
    }
  }

  setNetworkStations(networkStationsData) {
    const that = this;
    this.networkStationsData = networkStationsData;
    this.networkStations = new GeoJSON(networkStationsData, {
      onEachFeature: this._addEventListener.bind(that),
      pointToLayer: (feature, latlng) => {
        return feature.properties.type === 'STATION'
          ? stationAsset(latlng, feature)
          : trainAsset(latlng, feature);
      }
    });
    this.networkStations.setZIndex(2);
    this.networkStations.addTo(this._map);
    control
      .layers(
        [],
        { Station: this.networkStations },
        { position: 'bottomleft', collapsed: false }
      )
      .addTo(this._map);
  }

  clearNetworkStations() {
    if (this.networkStations) {
      this.networkStations.clearLayers();
      this.networkStationsData = null;
    }
  }

  setNetworkTrains(networkTrainsData) {
    const that = this;
    this.networkTrainsData = networkTrainsData;
    this.networkTrains = new GeoJSON(networkTrainsData, {
      onEachFeature: this._addEventListener.bind(that),
      pointToLayer: (feature, latlng) => {
        const lineId = feature.properties.Segment.Route.Line.Id;
        const networkMap = this.networkMaps.find(n => n.Id === lineId);
        const _feature = Object.assign(
          { networkMap: networkMap.networkMap, _map: this._map },
          feature
        );
        return feature.properties.type === 'STATION'
          ? stationAsset(latlng, _feature)
          : trainAsset(latlng, _feature);
      }
    });
    this.networkTrains.setZIndex(99);
    this.networkTrains.addTo(this._map);
    control.layers(
      [],
      { Train: this.networkTrains },
      { position: 'bottomleft', collapsed: false }
    );
  }

  clearNetworkTrains() {
    if (this.networkTrains) {
      this.networkTrains.clearLayers();
      this.networkTrainsData = null;
    }
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
    this.networkTrains.eachLayer(layer => {
      if (layer.feature.id === assetId) {
        layer.action && layer.action('toggle');
      }
    });
  }

  selectedAsset(assetId) {
    this.networkTrains.eachLayer(layer => {
      if (layer.feature.id === assetId) {
        layer.feature.selected = true;
        layer.action && layer.action('selected');
      }
    });
  }

  selectedAssets(assets) {
    this.networkTrains.eachLayer(l => {
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
    this.networkTrains.eachLayer(l => {
      if (l) {
        l.feature.selected = true;
      }
    });
  }

  unSelectedAsset(Id) {
    this.networkTrains.eachLayer(layer => {
      if (layer.feature.properties.Id === Id) {
        layer.feature.selected = false;
        layer.selected = false;
        layer.feature.properties.selected = false;
      }
    });
  }

  unSelectedAssets(assets) {
    this.networkTrains.eachLayer(l => {
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
    this.networkTrains.eachLayer(layer => {
      if (layer) {
        layer.feature.selected = false;
        layer.selected = false;
        layer.feature.properties.selected = false;
      }
    });
  }
}

export function enouvoTrainInit(el, options) {
  return new EnouvoTrain(el, options);
}
