
const fs = require("fs");
const path = require("path");
const GeoTIFF = require("geotiff");

async function inspectNum() {
    const filePath = path.join(
        __dirname,
        "..",
        "Earth",
        "Elevation",
        "ASTER_GDEM",
        "ASTGTMV003_S25W070_num.tif"
    );

    try {
        const tiff = await GeoTIFF.fromFile(filePath);
        const image = await tiff.getImage();
        const raster = await image.readRasters();

        const values = raster[0];
        const counts = new Map();

        let min = Infinity;
        let max = -Infinity;
        let validPixels = 0;

        for (const value of values) {
            if (!Number.isFinite(value)) continue;

            min = Math.min(min, value);
            max = Math.max(max, value);
            validPixels++;

            counts.set(value, (counts.get(value) || 0) + 1);
        }

        const histogram = Object.fromEntries(
            [...counts.entries()].sort((a, b) => a[0] - b[0])
        );

        const result = {
            dataset: "ASTER GDEM V003 NUM",
            filename: "ASTGTMV003_S25W070_num.tif",
            width: image.getWidth(),
            height: image.getHeight(),
            minimum_value: min,
            maximum_value: max,
            valid_pixels: validPixels,
            unique_values: counts.size,
            histogram: histogram
        };

        const outputPath = path.join(
            __dirname,
            "..",
            "Dataset_Catalogue",
            "aster_gdem_s25w070_num_full_analysis.json"
        );

        fs.writeFileSync(
            outputPath,
            JSON.stringify(result, null, 2)
        );

        console.log("NASA NUM ANALYSIS COMPLETED");
        console.log("---------------------------");
        console.log("Width:", result.width);
        console.log("Height:", result.height);
        console.log("Minimum:", min);
        console.log("Maximum:", max);
        console.log("Valid pixels:", validPixels);
        console.log("Unique values:", counts.size);
        console.log("Saved to:", outputPath);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

inspectNum();
