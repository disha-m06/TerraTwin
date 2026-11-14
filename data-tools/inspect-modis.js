
const fs = require("fs");
const path = require("path");

const baseDir = path.join(
  __dirname,
  "..",
  "Earth",
  "Temperature",
  "MODIS_LST"
);

const files = [
  "LST_Day_1km.tif",
  "LST_Night_1km.tif",
  "QC_Day.tif",
  "QC_Night.tif"
];

console.log("TerraTwin MODIS Dataset Check");
console.log("--------------------------------");

for (const file of files) {
  const filePath = path.join(baseDir, file);

  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);

    console.log(`\n${file}`);
    console.log(`Size: ${stats.size} bytes`);
    console.log("Status: Available");
  } else {
    console.log(`\n${file}`);
    console.log("Status: Missing");
  }
}
