import dotenv from 'dotenv';
dotenv.config();

import fetch from 'node-fetch';

export async function createWorkflow({
  workflow_json
}: {
  workflow_json: Record<string, unknown>;
}) {
  const apiKey = process.env.N8N_API_KEY;
  let baseUrl = process.env.N8N_BASE_URL;

  if (!apiKey || !baseUrl) {
    throw new Error("Missing N8N_API_KEY or N8N_BASE_URL in environment variables.");
  }

  // Ensure trailing slash
  baseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";

  const response = await fetch(`${baseUrl}api/v1/workflows`, {
    method: "POST",
    headers: {
      "X-N8N-API-KEY": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(workflow_json)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create workflow: ${response.status} ${errorText}`);
  }

  interface WorkflowResponse {
    id: string;
    name: string;
    [key: string]: unknown;
  }

  const data = (await response.json()) as WorkflowResponse;

  return {
    status: "success",
    workflowId: data.id,
    workflowName: data.name,
    url: `${baseUrl}workflow/${data.id}`
  };
}