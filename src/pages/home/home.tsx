import { Component } from "react";
import { ReactTitle } from "react-meta-tags";
import { countriesList } from "../../data/countries";

import "./home.scss";

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      countries: countriesList,
    };
  }
  render() {
    return (
      <div className="home-component">
        <ReactTitle title="University List App"></ReactTitle>

        <div className="home-band -one _padding-x">
          <p className="title">Complete list of unversities worldwide.</p>
          <a href="/universities" tabIndex={-1}>
            <button className="button">View Universities</button>
          </a>
        </div>

        <div className="home-band -two _padding-x">
          <p className="title">
            Too many? Select a country first to view universities.
          </p>
          <a href="/countries" tabIndex={-1}>
            <button className="button -dark">View Countries</button>
          </a>
        </div>

        <div className="home-band -three _padding-x">
          <p className="title">View universities in</p>
          <div className="countries-band">
            {this.state.countries.map((country, index) => {
              return (
                <div className="band-item" key={index}>
                  <a className="link" href={country.url}>
                    {country.name}
                  </a>
                  <a className="link" href={country.url}>
                    <img
                      className="flag"
                      src={country.flag}
                      alt={country.name + " flag"}
                    ></img>
                  </a>
                </div>
              );
            })}
          </div>
          <a href="/countries" className="button-container" tabIndex={-1}>
            <button className="button">or View All Countries</button>
          </a>
        </div>
      </div>
    );
  }
}

export interface Props {}
export interface State {
  countries: {
    name: string;
    flag: string;
    url: string;
  }[];
}
export default Home;
