// types.ts

/**
 * Defines the input expected by the `create_workflow` tool.
 * Claude will send an object with this shape via stdin.
 */
export type ToolInput = {
    workflow_json: Record<string, any>;
  };