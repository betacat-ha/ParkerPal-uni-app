/**
 * Converts GCJ-02 (China's offset coordinate system) to WGS-84 (World Geodetic System).
 * @param lat The latitude in GCJ-02.
 * @param lng The longitude in GCJ-02.
 * @returns A tuple containing the converted latitude and longitude in WGS-84.
 */
export function gcj02ToWgs84(lat: number, lng: number): [number, number] {
  if (isOutsideChina(lng, lat)) {
    return [lat, lng]
  }

  const a = 6378245.0 // Semi-major axis of the reference ellipsoid in meters.
  let dLat = transformLat(lng - 105.0, lat - 35.0)
  let dLng = transformLng(lng - 105.0, lat - 35.0)
  const radLat = lat / 180.0 * Math.PI
  let magic = Math.sin(radLat)
  magic = 1 - 0.006693421622965943 * magic * magic
  const sqrtMagic = Math.sqrt(magic)
  dLat = (dLat * 180.0) / ((a * (1 - 0.006693421622965943)) / (180.0 * sqrtMagic * sqrtMagic))
  dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * 180.0)
  const mgLat = lat + dLat
  const mgLng = lng + dLng

  return [mgLat, mgLng]
}

function isOutsideChina(lng: number, lat: number): boolean {
  return (lng < 72.004 || lng > 137.8347) || (lat < 0.8293 || lat > 55.8271)
}

function transformLat(x: number, y: number): number {
  return -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
}

function transformLng(x: number, y: number): number {
  return 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(y))
}
