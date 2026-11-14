
const fs = require("fs");
const GeoTIFF = require("geotiff");
const path = require("path");

async function inspectDEM() {
    try {
        const filePath = path.join(
            __dirname,
            "..",
            "Earth",
            "Elevation",
            "ASTER_GDEM",
            "ASTGTMV003_S25W070_dem.tif"
        );

        console.log("Reading NASA elevation dataset...");

        const fileBuffer = fs.readFileSync(filePath);
        const tiff = await GeoTIFF.fromArrayBuffer(
            fileBuffer.buffer.slice(
                fileBuffer.byteOffset,
                fileBuffer.byteOffset + fileBuffer.byteLength
            )
        );

        const image = await tiff.getImage();
        const raster = await image.readRasters();

        const elevations = raster[0];

        let min = Infinity;
        let max = -Infinity;
        let total = 0;
        let validCount = 0;

        for (const value of elevations) {
            if (value === -9999 || !Number.isFinite(value)) {
                continue;
            }

            min = Math.min(min, value);
            max = Math.max(max, value);
            total += value;
            validCount++;
        }

        console.log("\nNASA ASTER GDEM RESULTS");
        console.log("-----------------------");
        console.log("Width:", image.getWidth());
        console.log("Height:", image.getHeight());
        console.log("Minimum elevation:", min, "metres");
        console.log("Maximum elevation:", max, "metres");
        console.log(
            "Average elevation:",
            (total / validCount).toFixed(2),
            "metres"
        );
        console.log("Valid pixels:", validCount);

    } catch (error) {
        console.error("Error reading dataset:", error.message);
    }
}

inspectDEM();
