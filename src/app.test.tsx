import App from "./app";
import Home from "./pages/home/home";
import Universities from "./pages/universities/universities";
import Countries from "./pages/countries/countries";
import CountryUniversity from "./pages/country-university/country-university";

import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router";

const rrd = require("react-router-dom");
// @ts-ignore
rrd.BrowserRouter = ({ children }) => <div>{children}</div>;
module.exports = rrd;

// @ts-ignore
global.fetch = jest.fn(() => Promise.reject());
console.error = jest.fn();

describe("App Component", () => {
  describe("default configuration", () => {
    let wrapper: any;

    beforeEach(() => {
      wrapper = shallow(<App />);
    });

    it("should render header", () => {
      expect(wrapper.find("Header")).toHaveLength(1);
    });

    it("should render newsletter band", () => {
      expect(wrapper.find("NewsLetter")).toHaveLength(1);
    });

    it("should render footer", () => {
      expect(wrapper.find("Footer")).toHaveLength(1);
    });
  });

  describe("routing", () => {
    it("should render home page on nonexistent pages", () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={["/random"]}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find(Home)).toHaveLength(1);
    });

    it("should render universities page", () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={["/universities"]}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(Universities)).toHaveLength(1);
    });

    it("should render countries page", () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={["/countries"]}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(CountryUniversity)).toHaveLength(0);
      expect(wrapper.find(Countries)).toHaveLength(1);
    });

    it("should render country university page", () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={["/countries/PH"]}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(CountryUniversity)).toHaveLength(1);
      expect(wrapper.find(Countries)).toHaveLength(0);
    });
  });
});
