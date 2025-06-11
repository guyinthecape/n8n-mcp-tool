# n8n MCP Tool

[![npm version](https://badge.fury.io/js/n8n-mcp-tool.svg)](https://www.npmjs.com/package/n8n-mcp-tool)

A tool to create new workflows in a self-hosted n8n instance from a JSON definition using the Model Context Protocol.

## Overview

This package provides a command-line interface (CLI) tool that allows you to programmatically create workflows in your self-hosted n8n instance. It leverages the Model Context Protocol (MCP) to expose a `create_workflow` tool, making it suitable for integration with AI assistants (like Claude) that support MCP.

## Features

* **Create n8n Workflows**: Easily create new workflows in your n8n instance by providing a JSON definition.
* **MCP Integration**: Exposes a tool for Model Context Protocol compatible agents.
* **CLI Usage**: Can be used directly from the command line for testing and development.

## Installation

To install this tool globally (recommended for CLI tools):

```bash
npm install -g n8n-mcp-tool
````

Or, if you prefer to use it as a project dependency:

```bash
npm install n8n-mcp-tool
```

## Usage

### Environment Variables

Before using the tool, you **must** set the following environment variables:

  * `N8N_API_KEY`: Your n8n API key. You can generate one in your n8n instance under "Settings" \> "User Management" \> "API Keys".
  * `N8N_BASE_URL`: The base URL of your self-hosted n8n instance (e.g., `https://your-n8n-instance.com/`). Ensure it ends with a trailing slash if necessary for your n8n setup.

You can set these in your shell or use a `.env` file in the directory where you run the tool locally.

### As an MCP Tool (e.g., with Claude)

This tool is primarily designed to be invoked by an MCP-compatible agent. When used with an agent like Claude, you will configure the server to use this tool. The agent will then call the `create_workflow` tool with a JSON payload defining the n8n workflow.

**Example Claude `config.json` entry:**

```json
"n8n": {
  "command": "npx",
  "args": [
    "-y",
    "cross-env",
    "N8N_API_KEY=YOUR_N8N_API_KEY",
    "N8N_BASE_URL=[https://your-n8n-instance.com/](https://your-n8n-instance.com/)",
    "mcp-n8n-create-workflow"
  ]
}
```

Replace `YOUR_N8N_API_KEY` and `https://your-n8n-instance.com/` with your actual values.

### Direct CLI Usage (for testing/development)

While primarily designed for MCP integration, you can technically test it directly by piping a JSON input to it if you need to.

First, ensure the tool is built (if running from source):

```bash
npm run build
```

Then, you can pipe a JSON string to the globally installed command:

```bash
echo '{"workflow_json": {"name": "Test Workflow from CLI", "nodes": [{"parameters": {}, "name": "Start", "type": "n8n-nodes-base.start", "typeVersion": 1, "id": "node1"}]}}' | mcp-n8n-create-workflow
```

*(Note: Ensure your `N8N_API_KEY` and `N8N_BASE_URL` environment variables are set in your shell when running direct CLI commands.)*

## Development

To set up the project for local development:

1.  Clone the repository:
    ```bash
    git clone [https://github.com/YourUsername/n8n-mcp-tool.git](https://github.com/YourUsername/n8n-mcp-tool.git) # Replace YourUsername
    cd n8n-mcp-tool
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Build the project:
    ```bash
    npm run build
    ```

## Contributing

Contributions are welcome\! If you find a bug or have an idea for an improvement, please:

1.  Open an issue to discuss the proposed change.
2.  Fork the repository and create a new branch for your feature or fix.
3.  Submit a pull request with your changes.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

-----

**🚨 Note**: A much more comprehensive n8n MCP server tool already exists here: [https://github.com/leonardsellem/n8n-mcp-server](https://github.com/leonardsellem/n8n-mcp-server). I built this project primarily as a personal learning exercise.
