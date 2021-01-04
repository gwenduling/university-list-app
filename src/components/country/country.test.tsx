import Country from "./country";
import University from "../university/university";

import { shallow } from "enzyme";
import { mockCountry } from "../../test-data/country";
import { mockUniversity, mockUniversity2 } from "../../test-data/university";

describe("Country Component", () => {
  it("should match the snapshot with empty universities", () => {
    const wrapper = shallow(
      <Country country={mockCountry} universities={[]} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render all universities", () => {
    const country = { ...mockCountry, count: 2, total: 2 };
    const wrapper = shallow(
      <Country
        country={country}
        universities={[mockUniversity, mockUniversity2]}
      />
    );

    expect(wrapper.find(University).length).toBe(2);
  });

  it("should only render number universities from count property", () => {
    const country = { ...mockCountry, count: 1, total: 2 };
    const wrapper = shallow(
      <Country
        country={country}
        universities={[mockUniversity, mockUniversity2]}
      />
    );

    expect(wrapper.find(University).length).toBe(1);
  });

  it("should trigger click event", () => {
    const mockCallBack = jest.fn();

    const country = { ...mockCountry, count: 1, total: 2 };
    const wrapper = shallow(
      <Country
        onClick={() => mockCallBack()}
        country={country}
        universities={[mockUniversity, mockUniversity2]}
      />
    );

    wrapper.find("button").simulate("click");
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
