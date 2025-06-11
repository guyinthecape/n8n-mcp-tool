# n8n MCP Tool

[![npm version](https://badge.fury.io/js/n8n-mcp-tool.svg)](https://www.npmjs.com/package/n8n-mcp-tool)

A tool to create new workflows in a self-hosted n8n instance from a JSON definition using the Model Context Protocol.

## Overview

This package provides a command-line interface (CLI) tool that allows you to programmatically create workflows in your self-hosted n8n instance. It leverages the Model Context Protocol (MCP) to expose a `create_workflow` tool, making it suitable for integration with AI assistants (like Claude) that support MCP.

## Features

* **Create n8n Workflows**: Easily create new workflows in your n8n instance by providing a JSON definition.
* **MCP Integration**: Exposes a tool for Model Context Protocol compatible agents.
* **CLI Usage**: Can be used directly from the command line.

## Installation

To install this tool globally (recommended for CLI tools):

```bash
npm install -g n8n-mcp-tool