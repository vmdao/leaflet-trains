import { Control, DomUtil, Util, DomEvent } from 'leaflet';
const Layers = Control.Layers;

export var OverlayControl = Layers.extend({
  onAdd: function() {
    this._initLayout();
    this._update();
    this._customizeOverlays();
    return this._container;
  },
  _update: function() {
    if (!this._container) {
      return this;
    }

    DomUtil.empty(this._baseLayersList);
    DomUtil.empty(this._overlaysList);

    this._layerControlInputs = [];
    var baseLayersPresent,
      overlaysPresent,
      i,
      obj,
      baseLayersCount = 0;

    for (i = this._layers.length - 1; i >= 0; i--) {
      obj = this._layers[i];
      this._addItem(obj);
      overlaysPresent = overlaysPresent || obj.overlay;
      baseLayersPresent = baseLayersPresent || !obj.overlay;
      baseLayersCount += !obj.overlay ? 1 : 0;
    }

    // Hide base layers section if there's only one layer.
    if (this.options.hideSingleBase) {
      baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
      this._baseLayersList.style.display = baseLayersPresent ? '' : 'none';
    }

    this._separator.style.display =
      overlaysPresent && baseLayersPresent ? '' : 'none';

    return this;
  },
  _addItem: function(obj) {
    var label = document.createElement('label'),
      checked = true,
      input;
    if (obj.overlay) {
      input = document.createElement('input');
      input.type = 'checkbox';
      input.className = 'leaflet-control-layers-selector';
      input.defaultChecked = checked;
    } else {
      input = this._createRadioElement('leaflet-base-layers', checked);
    }

    this._layerControlInputs.push(input);
    input.layerId = Util.stamp(obj.layer);

    DomEvent.on(input, 'click', this._onInputClick, this);

    var name = document.createElement('span');
    name.innerHTML = ' ' + obj.name;

    // Helps from preventing layer control flicker when checkboxes are disabled
    // https://github.com/Leaflet/Leaflet/issues/2771
    var holder = document.createElement('div');

    label.appendChild(holder);
    holder.appendChild(input);
    holder.appendChild(name);
    var createCustomizeOverlay = this.createCustomizeOverlay(obj.name);
    holder.appendChild(createCustomizeOverlay);
    var container = obj.overlay ? this._overlaysList : this._baseLayersList;
    container.appendChild(label);

    this._checkDisabledLayers();
    return label;
  },

  createCustomizeOverlay: function(name) {
    var box = document.createElement('div');
    box.className = 'leaflet-trains-overlays-layers-separator';
    box.innerHTML = this._getHTML(name);
    return box;
  },

  _getHTML(name) {
    switch (name) {
      case 'Line':
        return '<svg width="100%" height="100%" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><path d="M11.028 18.5921h.2491v1.735h-.2891v1.7349H9.253v-1.735H2.8916v1.735h-1.735v-1.735H0v-1.7349h1.1566v-1.735H0v-1.7349h1.1566v-1.735H0v-1.7349h1.1566V9.9174H0v-1.735h1.1566V6.4476H0v-1.735h1.1566V2.9777H0V1.2427h1.1566V.0861h1.735v11.5662h.9653c.4651-.6008.9898-1.1792 1.5738-1.7349H4.2476v-1.735H7.55c.6264-.4517 1.1938-.9036 1.703-1.3556v-.3793H4.2475v-1.735H9.253V2.9777H4.2476V1.2427H9.253V.0861h1.735v1.1566h.2891v1.735h-.2891v1.7349h.222C12.3068 3.203 12.767 1.6904 12.6155.1722L14.342 0c.2643 2.6501-.8756 5.1794-3.354 7.5816v.6009h.2892v1.7349h-.2891v1.735h.2891v.9542c.6123-.9482 1.3627-1.845 2.25-2.6892h-.8042v-1.735h2.9236c.8016-.578 1.5065-1.1563 2.1163-1.7349H15.036v-1.735h4.2703c.4198-.5777.7463-1.156.981-1.7349h-4.0946V1.2427h4.524a5.6306 5.6306 0 0 0-.005-1.0705L22.4384 0a7.449 7.449 0 0 1 .0206 1.2427H23v1.735h-.868c-.1822.5847-.4365 1.163-.7622 1.7349h.6959v1.735h-1.919c-.4937.5855-1.065 1.1639-1.713 1.7349h.506v1.7349H16.213c-3.1954 2.4033-4.9081 5.2801-5.1849 8.6747zm-4.8825-6.9398H9.253V9.9174H8.1165c-.7353.553-1.3921 1.1312-1.971 1.735zm-3.2139 6.9398H9.253v-1.735H3.2091a11.192 11.192 0 0 0-.2775 1.735zm.8607-3.4699H9.253v-1.735H4.7432c-.3738.559-.6907 1.1373-.9509 1.735z" fill="#6F7BC6" fill-rule="nonzero"/></svg>';
      case 'Stations':
        return '<svg width="100%" height="100%" viewBox="0 0 22 17" xmlns="http://www.w3.org/2000/svg"><g fill="#6f7bc6" fill-rule="evenodd"><path fill-rule="nonzero" d="M1.692 16h20v1h-20zM10.543 15.295H9.55a.553.553 0 0 1-.55-.556V4.019c0-.769.616-1.392 1.376-1.392h3.022v-.794h3.512v.794h3.022c.76 0 1.376.623 1.376 1.391v10.72a.553.553 0 0 1-.55.557H10.543zm1.919-1.539a.77.77 0 1 0-1.539 0 .77.77 0 0 0 1.539 0zm6.538.77a.77.77 0 1 0 0-1.539.77.77 0 0 0 0 1.539zm.504-4.616c.146 0 .265-.129.265-.288V4.044c0-.159-.119-.288-.265-.288h-8.7c-.147 0-.266.13-.266.288v5.578c0 .16.12.288.266.288h8.7z"/><path fill-rule="nonzero" d="M3.615 6.385h1.154V16.77H3.615z"/><path d="M4.192 6.885a3.385 3.385 0 1 1 0-6.77 3.385 3.385 0 0 1 0 6.77zm0-1a2.385 2.385 0 1 0 0-4.77 2.385 2.385 0 0 0 0 4.77z" fill-rule="nonzero"/><path d="M3.423 2.538h1.254c.274 0 .478.065.614.195s.204.315.204.555c0 .247-.074.44-.222.578-.148.139-.374.208-.679.208h-.413v.907h-.758V2.538zm.758 1.042h.185c.145 0 .248-.026.307-.076a.244.244 0 0 0 .088-.194.271.271 0 0 0-.077-.195c-.05-.053-.147-.08-.288-.08h-.215v.545z"/></g></svg>';
      case 'Trains':
        return '<svg width="100%" height="100%" viewBox="0 0 37 35" xmlns="http://www.w3.org/2000/svg"><path d="M8.5006 28.4561H6.3794c-.6495 0-1.176-.5265-1.176-1.1761V4.619c0-1.624 1.3164-2.9404 2.9403-2.9404h6.4562V0h7.5046v1.6786h6.4563c1.6239 0 2.9403 1.3165 2.9403 2.9404V27.28c0 .6495-.5265 1.176-1.1761 1.176h-2.1212L36.7045 35H31.24l-6.66-6.5439H12.1244L5.4643 35H0l8.5006-6.5439zm3.6237-3.7083c0-.9951-.8067-1.802-1.802-1.802-.9951 0-1.8018.8068-1.8018 1.802 0 .9952.8067 1.802 1.8019 1.802.9952 0 1.8019-.8069 1.8019-1.802zm14.132 1.802c.9952 0 1.802-.8068 1.802-1.802 0-.9951-.8068-1.802-1.802-1.802-.9951 0-1.8019.8068-1.8019 1.802 0 .9951.8068 1.802 1.802 1.802zm1.7305-9.3171a.588.588 0 0 0 .588-.588V5.257a.588.588 0 0 0-.588-.588H8.7176a.588.588 0 0 0-.588.588v11.3876a.588.588 0 0 0 .588.588h19.2692z" fill="#6f7bc6" fill-rule="nonzero"/></svg>';
      default:
        return '';
    }
  },

  _customizeOverlays: function() {
    var container = this._container;
    // add classname
    container.className = container.className + ' leaflet-trains-overlays';

    var labels = container.getElementsByTagName('label');
    [].forEach.call(labels, label => {
      var inner = label.getElementsByTagName('div')[0];
      var box = DomUtil.create(
        'div',
        'leaflet-trains-overlays-layers-separator',
        inner
      );
      box.innerHTML =
        '<svg width="100%" height="100%" viewBox="0 0 22 17" xmlns="http://www.w3.org/2000/svg"><g fill="#6f7bc6" fill-rule="evenodd"><path fill-rule="nonzero" d="M1.692 16h20v1h-20zM10.543 15.295H9.55a.553.553 0 0 1-.55-.556V4.019c0-.769.616-1.392 1.376-1.392h3.022v-.794h3.512v.794h3.022c.76 0 1.376.623 1.376 1.391v10.72a.553.553 0 0 1-.55.557H10.543zm1.919-1.539a.77.77 0 1 0-1.539 0 .77.77 0 0 0 1.539 0zm6.538.77a.77.77 0 1 0 0-1.539.77.77 0 0 0 0 1.539zm.504-4.616c.146 0 .265-.129.265-.288V4.044c0-.159-.119-.288-.265-.288h-8.7c-.147 0-.266.13-.266.288v5.578c0 .16.12.288.266.288h8.7z"/><path fill-rule="nonzero" d="M3.615 6.385h1.154V16.77H3.615z"/><path d="M4.192 6.885a3.385 3.385 0 1 1 0-6.77 3.385 3.385 0 0 1 0 6.77zm0-1a2.385 2.385 0 1 0 0-4.77 2.385 2.385 0 0 0 0 4.77z" fill-rule="nonzero"/><path d="M3.423 2.538h1.254c.274 0 .478.065.614.195s.204.315.204.555c0 .247-.074.44-.222.578-.148.139-.374.208-.679.208h-.413v.907h-.758V2.538zm.758 1.042h.185c.145 0 .248-.026.307-.076a.244.244 0 0 0 .088-.194.271.271 0 0 0-.077-.195c-.05-.053-.147-.08-.288-.08h-.215v.545z"/></g></svg>';
    });
  }
});

export var overlayControl = function(baseLayers, overlays, options) {
  return new OverlayControl(baseLayers, overlays, options);
};
