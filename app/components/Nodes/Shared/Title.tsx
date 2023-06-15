type NodeTitleProps = {
  hover: boolean;
  zenMode: boolean;
  title: string;
};

const NodeTitle = (props: NodeTitleProps) => {
  return (
    <div
      className={`flex-col mb-1 transition-opacity ${
        props.hover || !props.zenMode
          ? "visible opacity-100"
          : "invisible opacity-0"
      }`}
    >
      <h1 className="text-[15px] font-medium text-foreground/80">{props.title}</h1>
    </div>
  );
};

export default NodeTitle;