import Countries from "./countries";
import Loading from "../../components/loading/loading";
import Error from "../../components/error/error";
import CountryItem from "../../components/country-item/country-item";
import Search from "../../components/search/search";
import flushPromises from "flush-promises";

import { shallow, mount } from "enzyme";
import { StateUI } from "../../models/ui";
import { mockCountry, mockCountry2 } from "../../test-data/country";

global.fetch = jest.fn(() => Promise.reject());
console.error = jest.fn();

describe("Countries Component", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<Countries />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render loading UI", () => {
    wrapper.setState({ stateUI: StateUI.Error });
    expect(wrapper.find(Error)).toHaveLength(1);

    wrapper.setState({ stateUI: StateUI.Loading });
    expect(wrapper.find(Error)).toHaveLength(0);
    expect(wrapper.find(Loading)).toHaveLength(1);
  });

  it("should render error UI", () => {
    wrapper.setState({ stateUI: StateUI.Error });

    expect(wrapper.find(Error)).toHaveLength(1);
    expect(wrapper.find(Loading)).toHaveLength(0);
  });

  it("should trigger error callback", () => {
    const mountWrapper = mount(<Countries />);

    // @ts-ignore
    mountWrapper.instance().fetchCountries = jest.fn();
    mountWrapper.setState({ stateUI: StateUI.Error });
    mountWrapper.find("button").simulate("click");
    // @ts-ignore
    expect(mountWrapper.instance().fetchCountries).toHaveBeenCalledTimes(1);
  });

  it("should render search", () => {
    wrapper.setState({ stateUI: StateUI.Success });

    expect(wrapper.find(Error)).toHaveLength(0);
    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find(Search)).toHaveLength(1);
  });

  it("should update search value", () => {
    const instance = wrapper.instance();

    wrapper.setState({ stateUI: StateUI.Success });
    instance.handleChange("test");
    expect(wrapper.state("searchCountry")).toBe("test");
  });

  it("should render each country item", () => {
    wrapper.setState({
      stateUI: StateUI.Success,
      countries: [mockCountry, mockCountry2],
    });

    expect(wrapper.find(CountryItem)).toHaveLength(2);
  });

  it("should filter countries", () => {
    wrapper.setState({
      stateUI: StateUI.Success,
      countries: [mockCountry, mockCountry2],
      searchCountry: "PH",
    });

    expect(wrapper.find(CountryItem)).toHaveLength(1);
  });

  it("should setup countries after successful fetch", async () => {
    // @ts-ignore
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => [mockCountry, mockCountry2],
      })
    );

    wrapper.instance().fetchCountries();
    await flushPromises();

    expect(wrapper.state("countries")).toHaveLength(2);
  });
});
