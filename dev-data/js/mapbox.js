mapboxgl.accessToken = 'pk.eyJ1IjoiYW1hbi1iaXNodCIsImEiOiJja2U2NnlvNDAxOXdxMnV1bGpvNXdrb2ViIn0.mQNeppkjfRLofCFeVYmvqQ';
var map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/aman-bisht/ckm6nx92729d417poq4a5hk5i', // style URL
center: [-64.77984334940605, 46.08867675806678], // starting position [lng, lat]
zoom: 14 // starting zoom
});

var marker = new mapboxgl.Marker()
.setLngLat([-64.77984334940605, 46.08867675806678])
.addTo(map);



