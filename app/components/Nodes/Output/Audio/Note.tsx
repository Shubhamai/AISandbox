import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import React, { memo, useEffect, useRef, useState } from "react";
import { Handle, NodeProps, NodeToolbarProps, Position } from "reactflow";

const AudioOutputNode = memo(({ data, isConnectable }: NodeProps) => {
  const outputAudioFile = data.input.audio;
  const audioRef = useRef<null | HTMLAudioElement>(null); // useRef hook

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
    <div className="bg-white rounded-md p-2">
      <Handle
        className="!bg-slate-400 !scale-[1.4] !w-1.5 !h-1.5 rotate-45 !border-none"
        type="target"
        id="audio"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      {outputAudioFile ? (
        <Button onClick={handlePlay}>{buttonIcon}</Button>
      ) : (
        <div>No audio file</div>
      )}
      <Handle
        className="!bg-slate-400 !scale-[1.4] !w-1.5 !h-1.5 rotate-45 !border-none"
        type="source"
        id="audio"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
});

AudioOutputNode.displayName = "AudioOutputNode";

export default AudioOutputNode;
