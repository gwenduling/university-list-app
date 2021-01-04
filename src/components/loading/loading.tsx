import "./loading.scss";

function Loading(props: Props) {
  return (
    <div className="loading-component">
      <span className="content">Fetching {props.content}, please wait...</span>
    </div>
  );
}

interface Props {
  content: string;
}
export default Loading;
