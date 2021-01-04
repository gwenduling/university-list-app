import CountryItem from "./country-item";

import { shallow } from "enzyme";
import { mockCountry } from "../../test-data/country";

describe("Country Item Component", () => {
  it("should match the snapshot", () => {
    const wrapper = shallow(<CountryItem country={mockCountry} />);
    expect(wrapper).toMatchSnapshot();
  });
});
