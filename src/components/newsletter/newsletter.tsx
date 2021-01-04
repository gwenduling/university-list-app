import React, { ChangeEvent, Component } from "react";
import { NEWSLETTER_API_BASE } from "../../data/constants";
import { DebounceInput } from "react-debounce-input";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import "react-notifications/lib/notifications.css";
import "./newsletter.scss";

class NewsLetter extends Component<Props, State> {
  textInput: React.RefObject<any>;

  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.textInput = React.createRef();
    this.state = {
      email: "",
    };
  }

  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ email: event?.target?.value });
  }

  subscribeToNewsletter(): void {
    if (this.state.email === "") {
      this.setError("Please enter valid email address.");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: this.state.email }),
    };

    fetch(NEWSLETTER_API_BASE + "/saveUser", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 409) {
            throw new Error(
              "Email address already exists! Please use a different email address."
            );
          } else {
            throw new Error(
              "Something went wrong! Please try again in a few minutes."
            );
          }
        }
      })
      .then((data) => {
        NotificationManager.success(
          this.state.email + " successfully subscribed to our newsletter!"
        );

        this.setState({ email: "" });
      })
      .catch((err) => {
        this.setError(err.message);
      });
  }

  setError(errorMessage: string): void {
    NotificationManager.error(errorMessage);
    this.textInput.current.focus();
  }

  render() {
    return (
      <div className="newsletter-component _padding">
        <NotificationContainer />
        <p className="title">Don't miss an update!</p>
        <p className="content">Join our newsletter.</p>
        <div className="form-item">
          <DebounceInput
            inputRef={this.textInput}
            type="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleChange}
            debounceTimeout={200}
          />
          <button type="submit" onClick={() => this.subscribeToNewsletter()}>
            Subscribe
          </button>
        </div>
      </div>
    );
  }
}

interface Props {}
interface State {
  email: string;
}
export default NewsLetter;
