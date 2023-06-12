export type RecorderReturn = {
  mediaRecorder: MediaRecorder | null;
  start: () => void;
  end: () => void;
};

export const recorder = async (
  selectedDevice: string,
  cb: (blob: Blob) => void
): Promise<RecorderReturn | null> => {
  let stream: MediaStream | null = null;

  let mediaRecorder: MediaRecorder;
  let audioChunks: Blob[] = [];
  let audioBlob: Blob = new Blob();

  function startRecording() {
    if (!mediaRecorder) return;
    try {
      mediaRecorder.start();
    } catch (error) {
      console.log(error);
    }
  }

  function stopRecording() {
    if (!mediaRecorder) return;
    try {
      mediaRecorder.stop();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRecorderStop() {
    const clipContainer = document.createElement("article");
    const clipLabel = document.createElement("p");
    const audio = document.createElement("audio");
    const deleteButton = document.createElement("button");

    const soundClips = document.querySelector(".sound-clips");

    clipContainer.classList.add("clip");
    audio.setAttribute("controls", "");
    deleteButton.innerHTML = "Delete";

    clipContainer.appendChild(audio);
    clipContainer.appendChild(clipLabel);
    clipContainer.appendChild(deleteButton);
    soundClips?.replaceChildren(clipContainer);

    audioBlob = new Blob(audioChunks, { type: "audio/webm;codecs=opus" });

    audioChunks = [];

    const audioURL = window.URL.createObjectURL(audioBlob);
    audio.src = audioURL;

    // TODO: fix type
    deleteButton.onclick = (e: any) => {
      const evtTgt = e.target;
      evtTgt?.parentNode?.parentNode.removeChild(evtTgt.parentNode);
    };

    cb(audioBlob);
  }

  try {
    if (typeof window === "undefined") return null;

    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: {
          exact: selectedDevice,
        },
      },
    });

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.onstop = handleRecorderStop;
    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
    };

    return { mediaRecorder, start: startRecording, end: stopRecording };
  } catch (error) {
    console.error(`The following getUserMedia error occurred: ${error}`);
    return null;
  }
};
