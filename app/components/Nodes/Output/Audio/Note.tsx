import useAppState from "@/app/state/appState";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import React, { memo, useEffect, useRef, useState } from "react";
import {
  Handle,
  NodeProps,
  NodeToolbarProps,
  Position,
  useNodeId,
} from "reactflow";
import NodeTitle from "../../Shared/Title";
import NodeBody from "../../Shared/Body";
import NodeHandle from "../../Shared/Handle";

const AudioOutputNode = ({ data, isConnectable }: NodeProps) => {
  const outputAudioFile = data.input.audio;
  const audioRef = useRef<null | HTMLAudioElement>(null); // useRef hook

  const [hover, setHover] = useState(false);
  const { zenMode } = useAppState();
  const nodeId = useNodeId() || ""; // TODO : Fix this

  useEffect(() => {
    if (outputAudioFile) {
      audioRef.current = new Audio(URL.createObjectURL(outputAudioFile));
    }
  }, [outputAudioFile]);

  const [buttonText, setButtonText] = useState("Play");
  const [buttonIcon, setButtonIcon] = useState(<Play />);

  const handlePlay = () => {
    if (buttonText === "Play" && audioRef.current) {
      console.log("Playing");
      setButtonText("Pause");
      setButtonIcon(<Pause />);
      // audio.play();
      audioRef.current.play();
    } else if (buttonText === "Pause" && audioRef.current) {
      setButtonText("Play");
      console.log("Paused");
      setButtonIcon(<Play />);
      // audio.pause();
      audioRef.current.pause();
    } else {
      console.log("No audio file");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <NodeTitle hover={hover} zenMode={zenMode} title="Audio Output" />

      <NodeBody setHover={setHover} className="py-3 px-10">
        <NodeHandle
          type="target"
          id="audio"
          position={Position.Left}
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
        {outputAudioFile ? (
          <Button
            className="bg-background text-foreground hover:bg-background"
            onClick={handlePlay}
          >
            {buttonIcon}
          </Button>
        ) : (
          <div>No audio Output</div>
        )}

        <NodeHandle
          type="source"
          id="audio"
          position={Position.Right}
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
      </NodeBody>
    </div>
  );
};

export default memo(AudioOutputNode);
