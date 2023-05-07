import Select from "react-select/dist/declarations/src/Select";

export default function HeartRateSelect() {
  return (
    <Select
      isClearable
      isSearchable={false}
      name="heart-rate"
      className="basic-select"
      classNamePrefix="select"
      placeholder="(Optional) Select your heart rate zone..."
      options={}
      onChange={}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "#3a3a3a",
          width: "35ch",
        }),
      }}
    />
  );
}
