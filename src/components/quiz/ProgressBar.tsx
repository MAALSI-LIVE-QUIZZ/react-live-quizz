interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => (
  <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
    <div
      className="h-full bg-white transition-all duration-500 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);
