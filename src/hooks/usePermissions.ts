export function usePermissions() {
  // Temporarily grant all permissions so we can see the UI buttons
  return { can: (_permission: string) => true };
}