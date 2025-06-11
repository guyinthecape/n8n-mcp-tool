#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { createWorkflow } from "./tools/create_workflow.js";

// 🧼 Clean only allowed fields before passing to n8n
function sanitizeWorkflowJson(input: Record<string, unknown>) {
  console.error("Ran this function:", JSON.stringify(input, null, 2));
  const allowedTopLevelKeys = new Set(["name", "nodes", "connections", "settings"]);
  const sanitized: Record<string, unknown> = {};

  for (const key in input) {
    if (allowedTopLevelKeys.has(key)) {
      sanitized[key] = input[key];
    }
  }

  // Ensure required `settings` key exists (even if empty)
  if (!("settings" in sanitized)) {
    sanitized["settings"] = {};
  }

  return sanitized;
}

const CreateWorkflowArgsSchema = z.object({
  workflow_json: z.record(z.unknown())
});

const server = new Server(
  {
    name: "n8n-workflow-creator",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "create_workflow",
        description: "Creates a new workflow in a self-hosted n8n instance from a JSON definition.",
        inputSchema: zodToJsonSchema(CreateWorkflowArgsSchema),
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  console.error("🟡 Payload received from Claude:", JSON.stringify(args, null, 2));

  if (name !== "create_workflow") {
    throw new Error(`Unknown tool: ${name}`);
  }

  const parsed = CreateWorkflowArgsSchema.parse(args);
  const cleanedJson = sanitizeWorkflowJson(parsed.workflow_json); // ✅ Call the sanitizer here

  const result = await createWorkflow({
    workflow_json: cleanedJson,
  });

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
});

const run = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

run().catch((err) => {
  console.error("❌ MCP fatal error:", err);
  process.exit(1);
});