from packages.python.aisandbox import execute_project

project_id: str = "91392237-fc87-48b4-b83c-59c6ce0aad9d"

api_key: str = "ais-4ad62b20-74ab-4f55-a5df-856007db6261"


inputs = [{"id": "TextInputNode-dU-gccjt6igEbAVFnYs4x", "data": {"text": "Hello!"}}]

output = execute_project(project_id, api_key, inputs)

print(output.json())
