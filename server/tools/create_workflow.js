import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
export async function createWorkflow({ workflow_json }) {
    const apiKey = process.env.N8N_API_KEY;
    let baseUrl = process.env.N8N_BASE_URL;
    // ✅ Validate presence before proceeding
    if (!apiKey || !baseUrl) {
        console.error("❌ Missing required environment variables.");
        console.error("Ensure N8N_API_KEY and N8N_BASE_URL are set in your Claude config or .env file.");
        process.exit(1);
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
    const data = (await response.json());
    return {
        status: "success",
        workflowId: data.id,
        workflowName: data.name,
        url: `${baseUrl}workflow/${data.id}`
    };
}
