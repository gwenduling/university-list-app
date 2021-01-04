import { Component } from "react";
import { UNIVERSITY_API_BASE, COUNTRIES_API_BASE } from "../../data/constants";
import { UniversityModel } from "../../models/universities";
import { CountryModel, CountryResponseModel } from "../../models/countries";
import { StateUI } from "../../models/ui";
import { ReactTitle } from "react-meta-tags";

import Country from "../../components/country/country";
import Search from "../../components/search/search";
import Loading from "../../components/loading/loading";
import Error from "../../components/error/error";

import "./universities.scss";

class Universities extends Component<Props, State> {
  defaultCount = 9;
  universities: UniversityModel[] | undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      universities: [],
      stateUI: StateUI.Loading,
      countries: [],
      searchCountry: "",
      searchUniversity: "",
    };

    this.handleCountrySearchChange = this.handleCountrySearchChange.bind(this);
    this.handleUniversitySearchChange = this.handleUniversitySearchChange.bind(
      this
    );
  }

  componentDidMount(): void {
    this.fetchUniversities();
  }

  fetchUniversities(): void {
    this.setState({ stateUI: StateUI.Loading });
    fetch(UNIVERSITY_API_BASE + "/search")
      .then((response) => response.json())
      .then((response: UniversityModel[]) => {
        this.universities = response;
        this.setState({
          universities: response,
        });
        this.fetchCountries();
      })
      .catch((error) => {
        this.setState({ stateUI: StateUI.Error });
        console.error(error);
      });
  }

  searchUniversities(): void {
    fetch(UNIVERSITY_API_BASE + "/search?name=" + this.state.searchUniversity)
      .then((response) => response.json())
      .then((response: UniversityModel[]) => {
        const countries = this.getCountries(
          this.state.countries.slice(),
          response
        );
        this.setState({
          countries,
          universities: response,
          stateUI: StateUI.Success,
        });
      })
      .catch((error) => {
        this.setState({ stateUI: StateUI.Error });
        console.error(error);
      });
  }

  fetchCountries(): void {
    fetch(COUNTRIES_API_BASE + "/all")
      .then((response) => response.json())
      .then((response: CountryResponseModel[]) => {
        const countries = this.getCountries(
          response,
          this.state.universities.slice()
        );
        this.setState({ countries, stateUI: StateUI.Success });
      })
      .catch((error) => {
        this.setState({ stateUI: StateUI.Error });
        console.error(error);
      });
  }

  getCountries(
    countries: CountryResponseModel[] | CountryModel[],
    universities: UniversityModel[]
  ): CountryModel[] {
    const sortedCountres = countries.sort(
      (
        a: CountryResponseModel | CountryModel,
        b: CountryResponseModel | CountryModel
      ) => (a.name > b.name ? 1 : -1)
    );
    return (sortedCountres as CountryModel[]).map<CountryModel>(
      (country: CountryResponseModel | CountryModel) => {
        const { alpha2Code, altSpellings, flag, name, nativeName } = country;

        const countryUniversities = universities.filter(
          (university: UniversityModel) =>
            university.alpha_two_code === country.alpha2Code
        );

        return {
          alpha2Code,
          altSpellings,
          flag,
          name,
          nativeName,
          total: countryUniversities.length,
          count:
            countryUniversities.length < this.defaultCount
              ? countryUniversities.length
              : this.defaultCount,
        };
      }
    );
  }

  showMore(code: string): void {
    const countries = this.state.countries.slice();
    const countryIndex = countries.findIndex(
      (country) => country.alpha2Code === code
    );
    const country = countries[countryIndex];

    country.count =
      country.count + this.defaultCount < country.total
        ? country.count + this.defaultCount
        : country.total;
    this.setState({ countries });
  }

  renderCountry(country: CountryModel) {
    return (
      <Country
        universities={this.state.universities}
        country={country}
        onClick={(i) => this.showMore(i)}
        key={country.alpha2Code}
      />
    );
  }

  renderSearchForm() {
    return (
      <div className="search-form">
        <Search
          label="Country Search"
          placeholder="Search country..."
          value={this.state.searchCountry}
          onValueChanged={this.handleCountrySearchChange}
        />
        <Search
          label="University Search"
          placeholder="Search university..."
          value={this.state.searchUniversity}
          onValueChanged={this.handleUniversitySearchChange}
        />
      </div>
    );
  }

  renderUniversities() {
    return this.state.countries.map((country: CountryModel) => {
      if (country.count === 0) return "";
      if (this.state.searchCountry) {
        const countryNameArray = country.altSpellings.concat([country.name]);
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

      return this.renderCountry(country);
    });
  }

  getView() {
    switch (this.state.stateUI) {
      case StateUI.Success:
        return (
          <div>
            {this.renderSearchForm()}
            {this.renderUniversities()}
          </div>
        );

      case StateUI.Loading:
        return <Loading content="universities" />;

      case StateUI.Error:
        return (
          <Error
            content="universities"
            onClick={() => this.fetchUniversities()}
          />
        );
    }
  }

  handleCountrySearchChange(value: string): void {
    this.setState({ searchCountry: value });
  }

  handleUniversitySearchChange(value: string): void {
    this.setState({ searchUniversity: value, stateUI: StateUI.Loading });
    this.searchUniversities();
  }

  render() {
    const view = this.getView();
    return (
      <div
        className={
          "universities _padding " +
          (this.state.stateUI !== StateUI.Loading ? "-grow" : "")
        }
      >
        <ReactTitle title="Universities | University List App"></ReactTitle>
        {view}
      </div>
    );
  }
}

interface Props {}
interface State {
  universities: UniversityModel[];
  stateUI: StateUI;
  countries: CountryModel[];
  searchCountry: string;
  searchUniversity: string;
}

export default Universities;
