type NodeTitleProps = {
  hover: boolean;
  zenMode: boolean;
  title: string;
};

const NodeTitle = (props: NodeTitleProps) => {
  return (
    <div
      className={`flex-col ml-2 mb-1 transition-opacity ${
        props.hover || !props.zenMode
          ? "visible opacity-100"
          : "invisible opacity-0"
      }`}
    >
      <h1 className="text-md font-semibold text-foreground">{props.title}</h1>
    </div>
  );
};

export default NodeTitle;