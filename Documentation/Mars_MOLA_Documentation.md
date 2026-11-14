

\# Mars MOLA Elevation Dataset Documentation



\## 1. Dataset Overview



Dataset Name: Mars Orbiter Laser Altimeter (MOLA) MEGDR  

Product: MGS MOLA MEGDR 128 Pixels per Degree  

Data Category: Planetary Elevation / Topography  

Planet: Mars  

Elevation Unit: Metres  

Reference: Mars Areoid (GMM3 Degree/Order 50)



\## 2. Data Sources



Instrument: Mars Orbiter Laser Altimeter (MOLA)  

Spacecraft: Mars Global Surveyor  

Observation Period: 15 September 1997 to 30 June 2001



Jezero Dataset Identifier:

megt44n000hb



Gale Dataset Identifier:

megt00n090hb



PDS4 Logical Identifiers:

\- urn:nasa:pds:mgs\_mola\_topography\_derived:data\_meg128:megt44n000hb

\- urn:nasa:pds:mgs\_mola\_topography\_derived:data\_meg128:megt00n090hb



\## 3. Spatial Coverage



\### Jezero Region Tile

\- Longitude: 0°E to 90°E

\- Latitude: 0°N to 44°N

\- File: megt44n000hb.tif



\### Gale Region Tile

\- Longitude: 90°E to 180°E

\- Latitude: 0°N to 44°S

\- File: megt00n090hb.tif



Note: These are tile coverage boundaries, not exact crater boundaries.



\## 4. Technical Specifications



| Parameter | Value |

|---|---|

| Raster width | 11,520 pixels |

| Raster height | 5,632 pixels |

| Resolution | 128 pixels per degree |

| Approximate pixel size | 463.0577 metres |

| Data type | Signed 16-bit integer |

| Elevation unit | Metres |

| Original format | IMG |

| Processed format | GeoTIFF |

| Compression | LZW |

| Projection | Equirectangular Mars |



\## 5. Elevation Statistics



\### Jezero Tile



\- Minimum: -5062 m

\- Maximum: 3210 m

\- Mean: -1020.9728 m

\- Standard deviation: 1618.9729 m

\- GDAL valid pixel percentage: 100%



\### Gale Tile



\- Minimum: -5750 m

\- Maximum: 6080 m

\- Mean: 660.0816 m

\- Standard deviation: 1508.0462 m

\- GDAL valid pixel percentage: 100%



These statistics describe the complete raster tiles, not only the Jezero and Gale craters.



\## 6. Processing Performed



1\. Downloaded the original MOLA IMG and XML files.

2\. Inspected metadata using GDAL.

3\. Converted IMG data into GeoTIFF format.

4\. Applied LZW compression and tiled storage.

5\. Extracted raster statistics using GDAL.

6\. Generated structured JSON output using JavaScript and Node.js.



\## 7. Output Files



Original data:

\- megt44n000hb.img

\- megt44n000hb.xml

\- megt00n090hb.img

\- megt00n090hb.xml



Processed data:

\- megt44n000hb.tif

\- megt00n090hb.tif



Analysis:

\- data-tools/analyze-mola.js

\- Dataset\_Catalogue/mars\_mola\_analysis.json



\## 8. Limitations and Notes



\- Statistics are whole-tile statistics, not crater-specific statistics.

\- The MOLA elevation values represent topography relative to the Mars areoid reference.

\- The reported valid pixel percentage is GDAL's statistics metadata and does not independently establish that every pixel contains a valid observation.

\- The original MOLA product includes interpolated values in areas without direct observations.

\- Coordinate transformations must be checked after resolving the current PROJ installation warning.



\## 9. Purpose in TerraTwin



The MOLA elevation datasets provide Mars terrain information for the TerraTwin project.



They will support:

\- Terrain comparison between Earth and Mars.

\- Elevation analysis.

\- Identification of potentially suitable analog locations.

\- Future slope and terrain analysis by the GIS processing team.



