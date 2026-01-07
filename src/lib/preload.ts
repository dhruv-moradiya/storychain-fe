// eslint-disable-next-line
function preloadComponent(importFn: () => Promise<any>) {
  return () => {
    importFn(); // Triggers the import
  };
}

export { preloadComponent };
