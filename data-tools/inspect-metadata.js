
const path = require("path");
const GeoTIFF = require("geotiff");
const fs = require("fs");

async function inspectMetadata() {
    const filePath = path.join(
        __dirname,
        "..",
        "Earth",
        "Elevation",
        "ASTER_GDEM",
        "ASTGTMV003_S25W070_dem.tif"
    );

    try {
        const tiff = await GeoTIFF.fromFile(filePath);
        const image = await tiff.getImage();

        const metadata = {
            dataset: "ASTER GDEM V003",
            filename: "ASTGTMV003_S25W070_dem.tif",
            width: image.getWidth(),
            height: image.getHeight(),
            boundingBox: image.getBoundingBox(),
            origin: image.getOrigin(),
            resolution: image.getResolution(),
            geoKeys: image.getGeoKeys(),
            noDataValue: image.getGDALNoData()
        };

        console.log("NASA GEOGRAPHIC METADATA");
        console.log(JSON.stringify(metadata, null, 2));

        const outputPath = path.join(
            __dirname,
            "..",
            "Dataset_Catalogue",
            "aster_gdem_s25w070_metadata.json"
        );

        fs.writeFileSync(
            outputPath,
            JSON.stringify(metadata, null, 2)
        );

        console.log("\nMetadata saved successfully!");
        console.log(outputPath);

    } catch (error) {
        console.error("Metadata error:", error.message);
    }
}

inspectMetadata();
