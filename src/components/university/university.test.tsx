import University from "./university";

import { shallow } from "enzyme";
import { mockUniversity } from "../../test-data/university";

describe("Univesity Component", () => {
  it("should match the snapshot", () => {
    const wrapper = shallow(<University university={mockUniversity} />);
    expect(wrapper).toMatchSnapshot();
  });
});
