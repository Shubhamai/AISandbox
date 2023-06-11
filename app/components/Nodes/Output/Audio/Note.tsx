import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import React, { memo, useEffect, useRef, useState } from "react";
import { Handle, NodeProps, NodeToolbarProps, Position } from "reactflow";

const AudioOutputNode = memo(({ data, isConnectable }: NodeProps) => {
  const outputAudioFile = data.input.audio;
  const audioRef = useRef<null | HTMLAudioElement>(null); // useRef hook

  const [hover, setHover] = useState(false);

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
    <div>
      <div
        className={`flex-col ml-2 mb-1 transition-opacity ${
          hover ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <h1 className="text-md font-semibold text-foreground">Audio Output</h1>
      </div>

      <div
        className="bg-background flex flex-col items-center justify-center rounded-md drop-shadow-lg border-[1px] border-solid border-foreground/10 relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Handle
          className="!bg-foreground/50 !border-none"
          type="target"
          id="audio"
          position={Position.Left}
          isConnectable={isConnectable}
        />
        {outputAudioFile ? (
          <Button
            className="bg-background text-foreground hover:bg-background"
            onClick={handlePlay}
          >
            {buttonIcon}
          </Button>
        ) : (
          <div>No audio file</div>
        )}
        <Handle
          className="!bg-foreground/50 !border-none"
          type="source"
          id="audio"
          position={Position.Right}
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
});

AudioOutputNode.displayName = "AudioOutputNode";

export default AudioOutputNode;
