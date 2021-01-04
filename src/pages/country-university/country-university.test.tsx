import CountryUniversity from "./country-university";
import Loading from "../../components/loading/loading";
import Error from "../../components/error/error";
import Search from "../../components/search/search";
import Country from "../../components/country/country";
import flushPromises from "flush-promises";

import { shallow, mount } from "enzyme";
import { StateUI } from "../../models/ui";
import { mockUniversity, mockUniversity2 } from "../../test-data/university";
import { mockCountry } from "../../test-data/country";

global.fetch = jest.fn(() => Promise.reject());
console.error = jest.fn();

describe("Country Unviersity Component", () => {
  let wrapper: any;
  const props = {
    match: {
      params: {
        code: "PH",
      },
    },
  };

  beforeEach(() => {
    wrapper = shallow(<CountryUniversity {...props} />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render error UI", () => {
    wrapper.setState({ stateUI: StateUI.Error });

    expect(wrapper.find(Error)).toHaveLength(1);
    expect(wrapper.find(Loading)).toHaveLength(0);
  });

  it("should trigger error callback", () => {
    const mountWrapper = mount(<CountryUniversity {...props} />);

    // @ts-ignore
    mountWrapper.instance().fetchCountry = jest.fn();
    mountWrapper.setState({ stateUI: StateUI.Error });
    mountWrapper.find("button").simulate("click");
    // @ts-ignore
    expect(mountWrapper.instance().fetchCountry).toHaveBeenCalledTimes(1);
  });

  it("should render loading UI", () => {
    wrapper.setState({ stateUI: StateUI.Loading });

    expect(wrapper.find(Error)).toHaveLength(0);
    expect(wrapper.find(Loading)).toHaveLength(1);
  });

  it("should render search", () => {
    wrapper.setState({ stateUI: StateUI.Success });

    expect(wrapper.find(Error)).toHaveLength(0);
    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find(Search)).toHaveLength(1);
  });

  it("should update search value", () => {
    const instance = wrapper.instance();

    wrapper.setState({
      stateUI: StateUI.Success,
      country: mockCountry,
      universityList: [mockUniversity, mockUniversity2],
    });
    instance.handleChange("test");
    expect(wrapper.state("searchUniversity")).toBe("test");
  });

  it("should render country", () => {
    wrapper.setState({
      stateUI: StateUI.Success,
      universityList: [mockUniversity, mockUniversity2],
    });

    expect(wrapper.find(Country)).toHaveLength(1);
  });

  it("should filter universities", () => {
    const instance = wrapper.instance();

    wrapper.setState({
      stateUI: StateUI.Success,
      country: mockCountry,
      universitiesList: [mockUniversity, mockUniversity2],
      universities: [mockUniversity, mockUniversity2],
    });
    instance.handleChange(mockUniversity.name);
    expect(wrapper.state("universities")).toHaveLength(1);
  });

  it("should fetch universities after country fetch", async () => {
    jest.spyOn(wrapper.instance(), "fetchUniversities");

    // @ts-ignore
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => [mockCountry],
      })
    );

    wrapper.instance().fetchCountry();
    await flushPromises();

    expect(wrapper.instance().fetchUniversities).toHaveBeenCalled();
  });

  it("should display success view after successful fetch", async () => {
    // @ts-ignore
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => [mockUniversity, mockUniversity2],
      })
    );

    wrapper.instance().fetchUniversities();
    await flushPromises();

    expect(wrapper.state("stateUI")).toBe(StateUI.Success);
  });
});
