import Home from "./home";

import { shallow } from "enzyme";

describe("Home Component", () => {
  it("should match the snapshot", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});
