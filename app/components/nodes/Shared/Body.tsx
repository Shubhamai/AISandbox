type NodeBodyProps = {
  children: React.ReactNode;
  setHover: (hover: boolean) => void;
  className?: string;
};

const NodeBody = ({ children, ...props }: NodeBodyProps) => {

  return (
    <div
      className={`bg-background flex flex-col rounded-md drop-shadow-lg border-[1px] border-solid border-foreground/10 relative ${props.className}`}
      onMouseEnter={() => props.setHover(true)}
      onMouseLeave={() => props.setHover(false)}
    >
      {children}
    </div>
  );
};

export default NodeBody;
