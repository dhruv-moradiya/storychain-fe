// Story Editor hooks (new modular structure)
export {
  // Mutation hooks
  useEnableEditorAutoSave,
  useSaveEditorContent,
  useDisableEditorAutoSave,
  // Query hooks
  useGetEditorDrafts,
  // Editor hooks
  useStoryEditorAutoSave,
  useEditorSetup,
  useEditorContext,
  DEFAULT_CONTENT,
  // Draft recovery hooks
  useDraftRecovery,
  // Action hooks
  useDraftActions,
  usePRActions,
  // Utility hooks
  useKeyboardShortcuts,
} from './storyEditor';

// Re-export types
export type {
  UseDraftRecoveryOptions,
  UseDraftRecoveryReturn,
  KeyboardShortcut,
  UseKeyboardShortcutsOptions,
} from './storyEditor';
