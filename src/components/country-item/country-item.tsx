import { CountryModel, CountryResponseModel } from "../../models/countries";
import "./country-item.scss";

function CountryItem(props: Props) {
  return (
    <div className="country-item">
      <img
        className="flag"
        src={props.country.flag}
        alt={props.country.name + " flag"}
      ></img>
      <div className="country-name">
        <a className="name" href={"/countries/" + props.country.alpha2Code}>
          {props.country.name}
        </a>
        <p className="native">({props.country.nativeName})</p>
      </div>
    </div>
  );
}

interface Props {
  country: CountryModel | CountryResponseModel;
}
export default CountryItem;
