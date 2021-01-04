import { Component } from "react";
import { COUNTRIES_API_BASE } from "../../data/constants";
import { CountryResponseModel } from "../../models/countries";
import { StateUI } from "../../models/ui";
import { ReactTitle } from "react-meta-tags";

import Loading from "../../components/loading/loading";
import Error from "../../components/error/error";
import CountryItem from "../../components/country-item/country-item";
import Search from "../../components/search/search";

import "./countries.scss";

class Countries extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      stateUI: StateUI.Loading,
      countries: [],
      searchCountry: "",
    };
  }

  componentDidMount(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.setState({ stateUI: StateUI.Loading });

    fetch(COUNTRIES_API_BASE + "/all")
      .then((response) => response.json())
      .then((response: CountryResponseModel[]) => {
        this.setState({ countries: response, stateUI: StateUI.Success });
      })
      .catch((error) => {
        this.setState({ stateUI: StateUI.Error });
        console.error(error);
      });
  }

  renderSearch() {
    return (
      <Search
        label="Country Search"
        placeholder="Search country..."
        value={this.state.searchCountry}
        onValueChanged={this.handleChange}
      />
    );
  }

  renderCountryList() {
    return (
      <div className="country-list">
        {this.state.countries.map((country: CountryResponseModel) => {
          if (this.state.searchCountry) {
            const countryNameArray = country.altSpellings.concat([
              country.name,
            ]);
            const searchCountry = this.state.searchCountry.toLocaleLowerCase();
            if (
              countryNameArray.every(
                (countryName) =>
                  countryName.toLocaleLowerCase().indexOf(searchCountry) === -1
              )
            ) {
              return "";
            }
          }

          return <CountryItem key={country.alpha2Code} country={country} />;
        })}
      </div>
    );
  }

  getView() {
    switch (this.state.stateUI) {
      case StateUI.Success:
        return (
          <div>
            {this.renderSearch()}
            {this.renderCountryList()}
          </div>
        );

      case StateUI.Loading:
        return <Loading content="countries" />;

      case StateUI.Error:
        return (
          <Error content="countries" onClick={() => this.fetchCountries()} />
        );
    }
  }

  handleChange(value: string): void {
    this.setState({ searchCountry: value });
  }

  render() {
    const view = this.getView();
    return (
      <div
        className={
          "countries-component _padding " +
          (this.state.stateUI !== StateUI.Loading ? "-grow" : "")
        }
      >
        <ReactTitle title="Countries | University List App"></ReactTitle>
        {view}
      </div>
    );
  }
}

interface Props {}
interface State {
  stateUI: StateUI;
  countries: CountryResponseModel[];
  searchCountry: string;
}
export default Countries;
