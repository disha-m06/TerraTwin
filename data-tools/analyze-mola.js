
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const gdalInfo = "C:\\OSGeo4W\\bin\\gdalinfo.exe";

const datasets = [
    {
        name: "Jezero Region",
        file: "megt44n000hb.tif",
        coverage: {
            west: 0,
            east: 90,
            south: 0,
            north: 44
        }
    },
    {
        name: "Gale Region",
        file: "megt00n090hb.tif",
        coverage: {
            west: 90,
            east: 180,
            south: -44,
            north: 0
        }
    }
];

const output = [];

for (const dataset of datasets) {
    const rasterPath = path.resolve(
        __dirname,
        "..",
        "Mars",
        "Elevation",
        "MOLA",
        dataset.file
    );

    const result = execFileSync(
        gdalInfo,
        ["-json", "-stats", rasterPath],
        { encoding: "utf8" }
    );

    const info = JSON.parse(result);
    const band = info.bands[0];
    const bandMetadata = band.metadata?.[""] ?? {};

const stats = {
    min: Number(bandMetadata.STATISTICS_MINIMUM),
    max: Number(bandMetadata.STATISTICS_MAXIMUM),
    mean: Number(bandMetadata.STATISTICS_MEAN),
    stdDev: Number(bandMetadata.STATISTICS_STDDEV),
    validPercent: Number(bandMetadata.STATISTICS_VALID_PERCENT)
};

    const record = {
        dataset: dataset.name,
        product: "MGS MOLA MEGDR 128 pixels per degree",
        filename: dataset.file,
        dimensions: {
            width: info.size[0],
            height: info.size[1]
        },
        resolution: {
            value: Math.abs(info.geoTransform[1]),
            unit: "metres per pixel"
        },
        dataType: band.type,
        elevationUnit: band.unit,
        coverage: dataset.coverage,
        elevationStatistics: {
            minimum: stats.min,
            maximum: stats.max,
            mean: stats.mean,
            standardDeviation: stats.stdDev,
            validPixelPercentage: stats.validPercent
        },
        reference: "Mars areoid (GMM3 degree/order 50)",
        note: "Statistics describe the complete raster tile, not only the named crater."
    };

    output.push(record);

    console.log(`Analysed: ${dataset.name}`);
}

const outputPath = path.resolve(
    __dirname,
    "..",
    "Dataset_Catalogue",
    "mars_mola_analysis.json"
);

fs.writeFileSync(
    outputPath,
    JSON.stringify(output, null, 2)
);

console.log("\nMars MOLA analysis completed!");
console.log(`Output saved to: ${outputPath}`);
