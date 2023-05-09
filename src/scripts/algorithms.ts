import {
  AVG_CADENCE,
  AVG_HEIGHT_MAN_INCHES,
  AVG_HEIGHT_WOMAN_INCHES,
  INCH_INCREASE_TO_CADENCE_OFFSET,
} from "@/resources/metrics";

/**
 *
 * @param hr
 * @throws an illegal argument exception if heart rate is invalid
 * @returns
 */
export function hrToEnergy(hr: number): number {
  if (hr < 90 || hr > 210) {
    throw new Error("InvalidArgumentException - invalid hr");
  }
  let res = (hr - 90) / (210 - 90);
  res = Math.round(res * 100) / 100;
  return res;
}

export function cadenceToEnergy(
  cadence: number,
  height: number,
  male: boolean
) {
  let avg_height = male ? AVG_HEIGHT_MAN_INCHES : AVG_HEIGHT_WOMAN_INCHES;
  let diff = height - avg_height;
  let cadence_offset = diff * INCH_INCREASE_TO_CADENCE_OFFSET;
  let expected_cadence = AVG_CADENCE + cadence_offset;
  let max = Math.round(expected_cadence * 1.1);
  let min = Math.round(expected_cadence * 0.9);
  let energy = (cadence - min) / (max - min);
  if (energy > 1) energy = 1;
  else if (energy < 0) energy = 0;
  return Math.round(energy * 100) / 100;
}
