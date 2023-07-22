class Project:
    """
    A class representing a project to run inference with inputs visa API.
    """

    def __init__(self, id: str):
        """
        Initialize a project with a given project id.

        Args:
            id (str): The id of the project.

        """

        self.id = id

    def run_inference(self, input: str):
        """
        Run inference on a given input.

        Args:
            input (str): The input to run inference on.

        Returns:
            str: The output of the inference.

        """
        return "Hello World!"

    def get_project_data(self):
        """
        Get the project data.

        Returns:
            dict: The project data.

        """
        return {"id": self.id}
