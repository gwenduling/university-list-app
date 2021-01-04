import Universities from "./universities";
import Country from "../../components/country/country";
import Search from "../../components/search/search";
import Loading from "../../components/loading/loading";
import Error from "../../components/error/error";
import flushPromises from "flush-promises";

import { shallow, mount } from "enzyme";
import { StateUI } from "../../models/ui";
import { mockUniversity, mockUniversity2 } from "../../test-data/university";
import { mockCountry, mockCountry2 } from "../../test-data/country";

global.fetch = jest.fn(() => Promise.reject());
console.error = jest.fn();

describe("Universities Component", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<Universities />);
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
    const mountWrapper = mount(<Universities />);

    // @ts-ignore
    mountWrapper.instance().fetchUniversities = jest.fn();
    mountWrapper.setState({ stateUI: StateUI.Error });
    mountWrapper.find("button").simulate("click");
    // @ts-ignore
    expect(mountWrapper.instance().fetchUniversities).toHaveBeenCalledTimes(1);
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
    expect(wrapper.find(Search)).toHaveLength(2);
  });

  it("should render countries", () => {
    wrapper.setState({
      stateUI: StateUI.Success,
      countries: [
        { ...mockCountry, count: 1, total: 1 },
        { ...mockCountry2, count: 1, total: 1 },
      ],
      universities: [mockUniversity, mockUniversity2],
    });

    expect(wrapper.find(Country)).toHaveLength(2);
  });

  it("should trigger show more", () => {
    const mountWrapper = mount(<Universities />);

    // @ts-ignore
    mountWrapper.instance().showMore = jest.fn();
    mountWrapper.setState({
      stateUI: StateUI.Success,
      countries: [{ ...mockCountry, count: 9, total: 20 }],
      universities: [],
    });
    mountWrapper.find("button").simulate("click");
    // @ts-ignore
    expect(mountWrapper.instance().showMore).toHaveBeenCalledTimes(1);
  });

  it("should add 9 universities in UI on show more", () => {
    wrapper.setState({
      stateUI: StateUI.Success,
      countries: [{ ...mockCountry, count: 9, total: 20 }],
      universities: [],
    });

    wrapper.instance().showMore("PH");
    expect(wrapper.state("countries")[0].count).toBe(18);
  });

  it("should set count to total count on show more if remaining is less than 9", () => {
    wrapper.setState({
      stateUI: StateUI.Success,
      countries: [{ ...mockCountry, count: 9, total: 12 }],
      universities: [],
    });

    wrapper.instance().showMore("PH");
    expect(wrapper.state("countries")[0].count).toBe(12);
  });

  it("should filter countries", () => {
    wrapper.setState({
      stateUI: StateUI.Success,
      countries: [
        { ...mockCountry2, count: 1, total: 1 },
        { ...mockCountry, count: 1, total: 1 },
      ],
      universities: [mockUniversity, mockUniversity2],
      searchCountry: "PH",
    });

    expect(wrapper.find(Country)).toHaveLength(1);
  });

  it("should filter out countries with 0 total", () => {
    wrapper.setState({
      stateUI: StateUI.Success,
      countries: [mockCountry2],
      universities: [],
    });

    expect(wrapper.find(Country)).toHaveLength(0);
  });

  it("should update country search value", () => {
    wrapper.setState({
      stateUI: StateUI.Success,
      country: mockCountry,
      universityList: [],
    });
    wrapper.instance().handleCountrySearchChange("test");
    expect(wrapper.state("searchCountry")).toBe("test");
  });

  it("should update university search value", () => {
    jest.spyOn(wrapper.instance(), "searchUniversities");
    wrapper.setState({
      stateUI: StateUI.Success,
      country: mockCountry,
      universityList: [],
    });
    wrapper.instance().handleUniversitySearchChange("test");
    expect(wrapper.state("searchUniversity")).toBe("test");
  });

  it("should filter universities", async () => {
    // @ts-ignore
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => [mockUniversity],
      })
    );

    wrapper.setState({
      stateUI: StateUI.Success,
      countries: [
        { ...mockCountry2, count: 1, total: 1 },
        { ...mockCountry, count: 1, total: 1 },
      ],
      universities: [mockUniversity, mockUniversity2],
      searchUniversity: "PH",
    });

    expect(wrapper.state("universities")).toHaveLength(2);

    wrapper.instance().searchUniversities();
    await flushPromises();

    expect(wrapper.state("universities")).toHaveLength(1);
  });

  it("should fetch countries after universities fetch", async () => {
    jest.spyOn(wrapper.instance(), "fetchCountries");

    // @ts-ignore
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => [mockUniversity, mockUniversity2],
      })
    );

    wrapper.instance().fetchUniversities();
    await flushPromises();

    expect(wrapper.instance().fetchCountries).toHaveBeenCalled();
  });

  it("should display success view after successful fetch", async () => {
    // @ts-ignore
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => [mockCountry, mockCountry2],
      })
    );

    wrapper.instance().fetchCountries();
    await flushPromises();

    expect(wrapper.state("stateUI")).toBe(StateUI.Success);
  });

  it("should display error view after error fetch", async () => {
    // @ts-ignore
    global.fetch = jest.fn(async () => Promise.reject());

    wrapper.instance().fetchCountries();
    await flushPromises();

    expect(wrapper.state("stateUI")).toBe(StateUI.Error);
  });
});
