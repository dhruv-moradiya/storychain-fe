const PageLoader = ({ text = 'Loading...' }: { text?: string }) => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-center">
      <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      <p className="text-muted-foreground text-sm">{text}</p>
    </div>
  </div>
);

export { PageLoader };
