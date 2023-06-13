type NodeExecutionTimeProps = {
  showStats: boolean;
  data: any;
};

const NodeExecutionTime = (props: NodeExecutionTimeProps) => {
  const executionTime = props.data.output.executionTime;

  return (
    <div
      className={`text-center ${props.showStats ? "" : "invisible opacity-0"}`}
    >
      {executionTime ? `${executionTime}ms` : ""}
    </div>
  );
};

export default NodeExecutionTime;
