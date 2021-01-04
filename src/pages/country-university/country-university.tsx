import { Component } from "react";
import { COUNTRIES_API_BASE, UNIVERSITY_API_BASE } from "../../data/constants";
import { CountryModel, CountryResponseModel } from "../../models/countries";
import { StateUI } from "../../models/ui";
import { UniversityModel } from "../../models/universities";
import { ReactTitle } from "react-meta-tags";

import Loading from "../../components/loading/loading";
import Error from "../../components/error/error";
import Country from "../../components/country/country";
import Search from "../../components/search/search";

class CountryUniversity extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      stateUI: StateUI.Loading,
      universities: [],
      universitiesList: [],
      country: undefined,
      searchUniversity: "",
    };
  }

  componentDidMount(): void {
    this.fetchCountry();
  }

  fetchCountry(): void {
    this.setState({ stateUI: StateUI.Loading });

    fetch(COUNTRIES_API_BASE + "/alpha?codes=" + this.props.match.params.code)
      .then((response) => response.json())
      .then((response: CountryResponseModel[]) => {
        this.fetchUniversities(response[0]);
      })
      .catch((error) => {
        this.setState({ stateUI: StateUI.Error });
        console.error(error);
      });
  }

  fetchUniversities(countryResponse: CountryResponseModel): void {
    /** TODO: search by country alpha 2 code (currently not available) */
    fetch(UNIVERSITY_API_BASE + "/search")
      .then((response) => response.json())
      .then((response: UniversityModel[]) => {
        const universities = response.filter(
          (university: UniversityModel) =>
            university.alpha_two_code === countryResponse.alpha2Code
        );

        const country = {
          ...countryResponse,
          count: universities.length,
          total: universities.length,
        };

        this.setState({
          country,
          universities,
          universitiesList: universities,
          stateUI: StateUI.Success,
        });
      })
      .catch((error) => {
        this.setState({ stateUI: StateUI.Error });
        console.error(error);
      });
  }

  handleChange(value: string): void {
    const universities = this.state.universitiesList
      .slice()
      .filter(
        (university: UniversityModel) =>
          university.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );

    const country = this.state.country;
    country!.count = universities.length;
    country!.total = universities.length;

    this.setState({ searchUniversity: value, universities, country });
  }

  renderSearch() {
    return (
      <Search
        label="University Search"
        placeholder="Search university..."
        value={this.state.searchUniversity}
        onValueChanged={this.handleChange}
      />
    );
  }

  renderCountry() {
    return (
      <Country
        country={this.state.country as CountryModel}
        universities={this.state.universities}
      />
    );
  }

  getView() {
    switch (this.state.stateUI) {
      case StateUI.Success:
        return (
          <div>
            {this.renderSearch()}
            {this.renderCountry()}
          </div>
        );

      case StateUI.Loading:
        return <Loading content="universities" />;

      case StateUI.Error:
        return (
          <Error content="universities" onClick={() => this.fetchCountry()} />
        );
    }
  }

  render() {
    const view = this.getView();
    return (
      <div
        className={
          "country-university _padding " +
          (this.state.stateUI !== StateUI.Loading ? "-grow" : "")
        }
      >
        <ReactTitle
          title={this.props.match.params.code + " | University List App"}
        ></ReactTitle>
        {view}
      </div>
    );
  }
}

interface Props {
  match: {
    params: {
      code: string;
    };
  };
}

interface State {
  stateUI: StateUI;
  universities: UniversityModel[];
  universitiesList: UniversityModel[];
  country: CountryModel | undefined;
  searchUniversity: string;
}
export default CountryUniversity;
