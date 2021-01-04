import Search from "./search";

import { shallow } from "enzyme";
import { DebounceInput } from "react-debounce-input";

describe("Search Component", () => {
  it("should match the snapshot", () => {
    const wrapper = shallow(
      <Search placeholder="" label="" value="" onValueChanged={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should trigger callback", () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(
      <Search
        placeholder=""
        label=""
        value=""
        onValueChanged={() => mockCallBack()}
      />
    );

    wrapper.find(DebounceInput).simulate("change", { target: { value: "" } });
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
