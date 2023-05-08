export enum Sex {
  Male = "male",
  Female = "female",
  // Future implementation: other/intersex? would have to modify algorithm
}

export function parseSex(sexString: string): Sex {
  switch (sexString.toLowerCase()) {
    case "male":
      return Sex.Male;
    case "female":
      return Sex.Female;
    case "intersex":
    case "other":
      throw new Error(
        `Illegal argument: ${sexString} (${sexString.toLowerCase} has not yet been implemented with our algorithm)`
      );
    default:
      throw new Error(`Illegal argument: ${sexString}`);
  }
}
