import NewsLetter from "./newsletter";

import { shallow } from "enzyme";
import { DebounceInput } from "react-debounce-input";
import { NotificationManager } from "react-notifications";
import flushPromises from "flush-promises";

describe("Newsletter Component", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<NewsLetter />);
    wrapper.instance().textInput = {
      current: {
        focus: () => {},
      },
    };

    jest.spyOn(NotificationManager, "error");
    jest.spyOn(NotificationManager, "success");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should updates the state on input change", () => {
    const value = "email@email.com";

    wrapper.find(DebounceInput).simulate("change", { target: { value } });
    expect(wrapper.state("email")).toEqual(value);
  });

  it("should trigger button on click", () => {
    jest.spyOn(wrapper.instance(), "subscribeToNewsletter");
    wrapper.find("button").simulate("click");
    expect(wrapper.instance().subscribeToNewsletter).toHaveBeenCalledTimes(1);
  });

  it("should notify error when email is empty string", () => {
    wrapper.instance().subscribeToNewsletter();

    expect(NotificationManager.error).toHaveBeenCalledWith(
      "Please enter valid email address."
    );
    expect(NotificationManager.error).toHaveBeenCalledTimes(1);
    expect(NotificationManager.success).toHaveBeenCalledTimes(0);
  });

  it("should notify success on success", async () => {
    // @ts-ignore
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () => ({ status: 200 }),
      })
    );

    wrapper.setState({ email: "test@test.com" });
    wrapper.instance().subscribeToNewsletter();
    await flushPromises();

    expect(NotificationManager.success).toHaveBeenCalled();
    expect(NotificationManager.error).not.toHaveBeenCalled();
  });

  it("should notify on duplicate email", async () => {
    // @ts-ignore
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        json: () => {},
        status: 409,
      })
    );

    wrapper.setState({ email: "test@test.com" });
    wrapper.instance().subscribeToNewsletter();
    await flushPromises();

    expect(NotificationManager.success).not.toHaveBeenCalled();
    expect(NotificationManager.error).toHaveBeenCalledWith(
      "Email address already exists! Please use a different email address."
    );
  });

  it("should notify on error response from server", async () => {
    // @ts-ignore
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        json: () => {},
        status: 500,
      })
    );

    wrapper.setState({ email: "test@test.com" });
    wrapper.instance().subscribeToNewsletter();
    await flushPromises();

    expect(NotificationManager.success).not.toHaveBeenCalled();
    expect(NotificationManager.error).toHaveBeenCalledWith(
      "Something went wrong! Please try again in a few minutes."
    );
  });

  it("should notify on promise error", async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.reject({
        message: "Something went wrong! Please try again in a few minutes.",
      })
    );

    wrapper.setState({ email: "test@test.com" });
    wrapper.instance().subscribeToNewsletter();
    await flushPromises();

    expect(NotificationManager.success).not.toHaveBeenCalled();
    expect(NotificationManager.error).toHaveBeenCalledWith(
      "Something went wrong! Please try again in a few minutes."
    );
  });
});
