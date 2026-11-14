
const fs = require("fs");
const path = require("path");
const GeoTIFF = require("geotiff");

const folder = path.join(
  __dirname,
  "..",
  "Earth",
  "Temperature",
  "MODIS_LST"
);

async function readRaster(filename) {
  const filePath = path.join(folder, filename);
  const tiff = await GeoTIFF.fromFile(filePath);
  const image = await tiff.getImage();

  return {
    data: await image.readRasters({ interleave: true }),
    width: image.getWidth(),
    height: image.getHeight()
  };
}

async function main() {
  console.log("TERRATWIN - MODIS PIXEL ANALYSIS");
  console.log("--------------------------------");

  const day = await readRaster("LST_Day_1km.tif");
  const night = await readRaster("LST_Night_1km.tif");
  const qcDay = await readRaster("QC_Day.tif");
  const qcNight = await readRaster("QC_Night.tif");

  console.log("Daytime raster:", day.width, "x", day.height);
  console.log("Nighttime raster:", night.width, "x", night.height);
  console.log("Day quality raster:", qcDay.width, "x", qcDay.height);
  console.log("Night quality raster:", qcNight.width, "x", qcNight.height);

  console.log("\nAll four raster files read successfully!");
}

main().catch(error => {
  console.error("Analysis failed:", error);
});
