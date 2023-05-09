import * as algorithms from "@/scripts/algorithms"

describe("hr to energy", () => {
  test("fuzz test", async () => {
    for (let i = 0; i <= 1000; i ++) {
      const min = 90;
      const max = 210;
      const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
      algorithms.hrToEnergy(randomNum);
    };
  });

  test("throws exception", async () => {
    expect(() => {
      algorithms.hrToEnergy(89)
    }).toThrow("InvalidArgumentException - invalid hr");
    expect(() => {
      algorithms.hrToEnergy(211);
    }).toThrow("InvalidArgumentException - invalid hr");
    expect(() => {
      algorithms.hrToEnergy(-90);
    }).toThrow("InvalidArgumentException - invalid hr");
    expect(() => {
      algorithms.hrToEnergy(-210);
    }).toThrow("InvalidArgumentException - invalid hr");
  });

  test("returns correct output", async () => {
    expect(algorithms.hrToEnergy(100)).toEqual(0.08)
  });
});

describe("cadence to energy", () => {
  test("fuzz test", () => {
    for (let i = 0; i <= 1000; i ++) {
      const minH = 36;
      const maxH = 107;
      const randomHeight = Math.floor(Math.random() * (maxH - minH + 1) + minH);

      const minC = 50;
      const maxC = 300;
      const randomCadence = Math.floor(Math.random() * (maxC - minC + 1) + minC);
      algorithms.cadenceToEnergy(randomCadence, randomHeight, (Math.random() < 0.5))
    };
  });

  test("returns 1 if energy over 1", async () => {
    expect(algorithms.cadenceToEnergy(250, 65, true)).toEqual(1);
  });

  test("returns 0 if energy less than 0", async () => {
    expect(algorithms.cadenceToEnergy(50, 96, true)).toEqual(0);
  });

  test("returns expected output for normal input", async () => {
    expect(algorithms.cadenceToEnergy(180, 70, true)).toEqual(0.88);
  });
});