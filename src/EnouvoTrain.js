import { EventEmitter } from './EventEmitter';
import { Map, GeoJSON, layerGroup, latLng } from 'leaflet';
import { overlayControl } from './Layers/OverlayControl';
import { basemapLayer } from './Layers/BasemapLayer';
import { stationAsset } from './Assets/StationAsset';
import { trainAsset } from './Assets/TrainAsset';

export class EnouvoTrains {
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
              this.networkTrains.eachLayer(l => {
                if (l.selected) {
                  layers.push(l.feature);
                }
              });
              listener.action(message);
            }
          });
      }
    };
    this.observer.addListeners(events);
  }

  _createMap(el, options) {
    this._map = new Map(el, options);
    this._map._container.className =
      this._map._container.className + ' leaflet-trains';
    this._map.zoomControl.setPosition('bottomleft');
    this._createLayer();
    this._createOverlayControl();
    this._map.on('areaSelect', event => {
      var assets = this.selectedAssetsWithBounds(event.areaSelectBounds);
      const message = {
        originEvent: event.event,
        data: assets
      };
      this.observer.emitEvent('selectedTrains', [message]);
    });
  }

  _createLayer() {
    basemapLayer('Streets').addTo(this._map);
  }

  _createOverlayControl() {
    this.overlaysControl = overlayControl(
      [],
      {},
      {
        position: 'bottomleft',
        collapsed: false
      }
    ).addTo(this._map);
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
    let layers = [];
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
            id: data.properties.id,
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

      layers.push(networkMap);

      networkMap.addTo(this._map);

      return {
        id: data.properties.id,
        networkMap: networkMap,
        name: data.properties.name
      };
    });

    this.overlaysControl.addOverlay(layerGroup(layers), 'Line');
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
        return stationAsset(latlng, feature);
      }
    });
    this.networkStations.addTo(this._map);
    this.overlaysControl.addOverlay(this.networkStations, 'Stations');
    this.networkStations.setZIndex(2);
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
        try {
          const lineId = feature.properties.segment.route.line.id;
          const networkMap = this.networkMaps.find(n => n.id === lineId);
          const _feature = Object.assign(
            { networkMap: networkMap.networkMap, _map: this._map },
            feature
          );
          return trainAsset(latlng, _feature);
        } catch (error) {
          console.log(error);
        }
      }
    });
    this.networkTrains.addTo(this._map);
    this.networkTrains.setZIndex(10000000);
    this.overlaysControl.addOverlay(this.networkTrains, 'Trains');
  }

  addTrain(trainData) {
    const latlng = latLng(trainData.latitude, trainData.longitude);
    const lineId = trainData.segment.route.line.id;
    const networkMap = this.networkMaps.find(n => n.id === lineId);
    const _feature = Object.assign(
      { properties: trainData },
      {
        networkMap: networkMap.networkMap,
        _map: this._map
      }
    );

    const trainLayer = trainAsset(latlng, _feature);
    trainLayer.addTo(this._map);
    this.networkTrains.addLayer(trainLayer);
  }

  updateTrain(trainData) {
    const trainsLayer = this.networkTrains.getLayers();
    const trainFinded = trainsLayer.find(t => {
      return t.feature.properties.id === trainData.id;
    });

    if (trainFinded) {
      trainFinded.feature.properties = Object.assign(
        trainFinded.feature.properties,
        trainData
      );
      const latlng = latLng(trainData.latitude, trainData.longitude);
      trainFinded.setLatLng(latlng);
    }
    return trainFinded;
  }

  replaceTrain(trainData) {
    if (!trainData) {
      return;
    }

    const trainUpdated = this.updateTrain(trainData);

    if (!trainUpdated) {
      this.addTrain(trainData);
    }
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

  controlPopupAsset(assetId, switchPopup) {
    this.networkTrains.eachLayer(train => {
      if (train.feature.properties.id === assetId) {
        switchPopup ? train.openPopup() : train.closePopup();
      }
    });
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

  selectedAssetsWithBounds(bounds) {
    const layers = this.networkTrains.getLayers();
    const layersSelected = layers
      .filter(l => {
        return bounds.contains(l.getLatLng());
      })
      .map(l => {
        l.feature.selected = true;
        l.action && l.action('selected');
        return l.feature;
      });
    return layersSelected;
  }

  selectedAssetsAll() {
    this.networkTrains.eachLayer(l => {
      if (l) {
        l.feature.selected = true;
      }
    });
  }

  unSelectedAsset(id) {
    this.networkTrains.eachLayer(layer => {
      if (layer.feature.properties.id === id) {
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
