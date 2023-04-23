function addGraphicLayer(graphicsLayer) {
  graphicsLayer = new Cesium.GraphicsLayer(viewer, {
    clickGraphic: function (graphic) {
      if (!graphic) return;
      polyline = graphic;
      polyline.style.width = 20;
      polyline.style.color = Cesium.Color.fromCssColorString('#2e6099');
    },
  });
}

function startDrawing(graphicsLayer) {
  graphicsLayer.startDrawing({
    type: 'polyline',
    style: {
      color: Cesium.Color.fromCssColorString('#2e6099'),
      width: 20,
    },
  });
}
export { addGraphicLayer, startDrawing };

var graphicsLayer = new Cesium.GraphicsLayer(viewer, {
  getGraphic: getGraphic,
});
graphicsLayer.graphicsLayer.startDrawing({
  type: Cesium.Graphic.graphicType.box,
  style: { color: Cesium.color.BLUE, extrudedHeight: 100 },
  name: 'box1',
  attributes: { key: 'www', map: 4645 },
});
function getGraphic(e) {
  console.log(e);
}
