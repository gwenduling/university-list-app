import { UniversityModel } from "../../models/universities";

import "./university.scss";

function University(props: Props) {
  return (
    <div className="university-component">
      <p className="name">{props.university.name}</p>
      <a
        className="link"
        href={props.university.web_pages[0]}
        target="_blank"
        rel="noreferrer"
        title={props.university.name}
      >
        {props.university.domains[0]}
      </a>
    </div>
  );
}

interface Props {
  university: UniversityModel;
}
export default University;
