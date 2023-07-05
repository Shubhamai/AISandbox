import graphState from "@/app/state/graphState";
import React, { memo, useEffect, useState } from "react";
import {
  Handle,
  NodeProps,
  NodeResizeControl,
  NodeResizer,
  Position,
} from "reactflow";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useNodeId } from "reactflow";
import { Input } from "@/app/components/ui/input";
import NodeTitle from "../../Shared/Title";
import useAppState from "@/app/state/appState";
import NodeBody from "../../Shared/Body";
import NodeHandle from "../../Shared/Handle";
import { Mic, Square, StopCircle } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";
import { recorder, type RecorderReturn } from "./recorder";
import { Button } from "@/app/components/ui/button";

const AudioInputNode = ({ data, isConnectable, selected }: NodeProps) => {
  const { zenMode } = useAppState();
  const [hover, setHover] = useState(false);
  const nodeId = useNodeId() || ""; // TODO : Fix this
  const updateNodeData = graphState((s) => s.updateNodeData);
  const [Devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [recorderData, setRecorderData] = useState<RecorderReturn | null>(null);

  const startRecording = async () => {
    if (selectedDevice) {
      const data = await recorder(selectedDevice, (audioBlob) => {
        updateNodeData(nodeId, {
          output: { audio: audioBlob },
        });
      });

      if (data) {
        setRecorderData(data);
      }
    }
  };

  useEffect(() => {
    requestPermissionAndUpdateDevices();

    if (navigator.mediaDevices) {

      if (selectedDevice) {
        console.log("selectedDevice", selectedDevice);
        startRecording();
      }
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }, [selectedDevice]);

  const requestPermissionAndUpdateDevices = async () => {
    // Disable right click, TODO : Need in better place
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    try {
      const constraints = { audio: true };
      await navigator.mediaDevices.getUserMedia(constraints);
      navigator.mediaDevices.addEventListener(
        "devicechange",
        (selectedDevice) => {
          updateDevicesList();
        }
      );
      await updateDevicesList();
    } catch (err) {
      console.error("Error getting permission:", err);
    }
  };

  const updateDevicesList = async () => {
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();

      setDevices(allDevices.filter((device) => device.kind === "audioinput"));
    } catch (error) {
      console.error("Error fetching media devices:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const audioFile = e.target.files[0];

      updateNodeData(nodeId, {
        output: { audio: audioFile },
      });
    } else {
      console.log("no files");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <NodeTitle hover={hover} zenMode={zenMode} title="Audio Input" />
      <NodeBody setHover={setHover}>
        <div className="flex flex-col items-center py-5 px-3 gap-3">
          <Input
            className="text-foreground hidden"
            id="audio-uploader"
            type="file"
            accept=".webm, .mp3, .mp4, .m4a"
            onChange={handleChange}
          />
          <label htmlFor="audio-uploader" className="w-full h-full text-center">
            Upload Audio
          </label>

          <div className="flex flex-row items-center justify-between gap-5">
            <Separator orientation="horizontal" className="w-16" />
            Or
            <Separator orientation="horizontal" className="w-16" />
          </div>
          <div className="flex flex-row items-center gap-3 w-full">
            <Button
              size="sm"
              onClick={() => {
                if (recorderData) {
                  if (recording) {
                    recorderData.end();
                  } else {
                    recorderData.start();
                  }

                  setRecording(!recording);
                }
              }}
            >
              {recording ? (
                <Square className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
            {/* onClick={recorderData?.start()}  */}
            <Select
              onValueChange={(e) => {
                setSelectedDevice(
                  // Devices.find((device) => device.deviceId === e)
                  e
                );
              }}
            >
              <SelectTrigger className="flex-1">
                <SelectValue
                  // defaultValue={selectedDevice}
                  placeholder="Choose Device"
                />
              </SelectTrigger>

              <SelectContent>
                {Devices.map((device) => (
                  <SelectItem value={device.deviceId} key={device.deviceId}>
                    {device.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <NodeHandle
          type="source"
          position={Position.Right}
          id="audio"
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
      </NodeBody>
    </div>
  );
};

export default memo(AudioInputNode);
