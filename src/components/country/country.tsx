import { Component } from "react";
import { CountryModel } from "../../models/countries";
import { UniversityModel } from "../../models/universities";

import University from "../university/university";
import CountryItem from "../country-item/country-item";

import "./country.scss";

class Country extends Component<Props> {
  renderUniversity(university: UniversityModel) {
    return (
      <University
        university={university}
        key={university.alpha_two_code + "" + university.name}
      />
    );
  }

  renderButton() {
    return (
      <button
        className="show-more"
        onClick={() => this.props.onClick?.(this.props.country.alpha2Code)}
      >
        show more
      </button>
    );
  }

  render() {
    const universities = this.props.universities
      .filter(
        (university: UniversityModel) =>
          university.alpha_two_code === this.props.country.alpha2Code
      )
      .slice(0, this.props.country.count);

    let button;
    if (this.props.country.count < this.props.country.total) {
      button = this.renderButton();
    } else {
      button = "";
    }

    return (
      <div className="country-component">
        <CountryItem country={this.props.country} />

        <div className="result-count">
          Showing {this.props.country.count} of {this.props.country.total}{" "}
          universities
        </div>

        <div className="universities-list">
          {universities.map((university: UniversityModel) => {
            return this.renderUniversity(university);
          })}
        </div>

        {button}
      </div>
    );
  }
}

interface Props {
  country: CountryModel;
  universities: UniversityModel[];
  onClick?: (code: string) => void;
}
export default Country;
