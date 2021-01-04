import { ChangeEvent, Component } from "react";
import { DebounceInput } from "react-debounce-input";

import "./search.scss";

class Search extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.props.onValueChanged(event?.target?.value);
  }

  render() {
    return (
      <div className="search-input">
        <label className="label">{this.props.label}</label>
        <DebounceInput
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.handleChange}
          debounceTimeout={200}
        />
      </div>
    );
  }
}

export interface Props {
  placeholder: string;
  label: string;
  value: string;
  onValueChanged: (value: string) => void;
}
export default Search;
