import "./error.scss";

function Error(props: Props) {
  return (
    <div className="error-component">
      <div className="error-content">
        <span>Failed to fetch {props.content}.</span>
        <button className="button" onClick={() => props.onClick()}>
          Try again
        </button>
      </div>
    </div>
  );
}

interface Props {
  content: string;
  onClick: () => void;
}
export default Error;
