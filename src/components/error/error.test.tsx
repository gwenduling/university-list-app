import Error from "./error";

import { shallow } from "enzyme";

describe("Error Component", () => {
  it("should match the snapshot", () => {
    const wrapper = shallow(<Error content="" onClick={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should trigger callback", () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(
      <Error content="" onClick={() => mockCallBack()} />
    );

    wrapper.find("button").simulate("click");
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
