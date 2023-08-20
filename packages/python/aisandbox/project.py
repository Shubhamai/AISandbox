import json
from typing import List
import requests


NODE_TYPE_TO_INPUT_MAPPIN = {
    # Inputs
    "TextInputNode": "text",
    "ImageInputNode": "image",
    "AudioInputNode": "audio",
    # Models
    "OpenAIChatGPTNode": "text",
    "StableDiffusionNode": "text",
    "WhisperNode": "text",
    "YoloXNode": "text",
    "TortoiseTTSNode": "text",
    "Vicuna13B": "text",
    "StableLM": "text",
    "DollyV2": "text",
    "OpenAssistant": "text",
    "mpt7b": "text",
    # Outputs
    "TextOutputNode": "text",
    "ImageOutputNode": "image",
    "AudioOutputNode": "audio",
}


def execute_project(project_id: str, api_key: str, inputs: List[dict]):
    """
    Executes the project graph with corresponding inputs and returns the data from output nodes

    Args:
        project_id (str): The project_id of the project.
        api_key (str) : The API Key.
        inputs (list) : The inputs for the project graph. Example format :
            [{
                "id": "TextInputNode-dU-gccjt6igEbAVFnYs4x",
                "data": {"text": "Hello!"}
            }]

    """

    # TODO : Process inputs to base64 if necessary

    response = requests.request(
        "POST",
        # TODO : Might update to api/v2 in future, need backward compatability
        "https://aisandbox.app/api/v1/execute/",
        headers={
            "Content-Type": "application/json",
            "Authorization": api_key,
            "Project": project_id,
        },
        data=json.dumps({"data": inputs}),
    )

    return response
