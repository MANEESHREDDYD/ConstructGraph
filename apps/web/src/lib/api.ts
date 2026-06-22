import { CommandCenterPayload } from '../types/domain';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export async function fetchCommandCenterData(): Promise<CommandCenterPayload> {
  const response = await fetch(`${API_URL}/api/demo/command-center`);
  const data = await response.json();
  
  if (!response.ok || data.error) {
    throw new Error(data.message || data.detail || 'Failed to connect to ConstructGraph API.');
  }
  
  return data as CommandCenterPayload;
}
