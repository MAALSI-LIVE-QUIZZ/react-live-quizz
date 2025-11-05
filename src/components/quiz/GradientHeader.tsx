import { ProgressBar } from "./ProgressBar";

interface GradientHeaderProps {
  title: string;
  subtitle?: string;
  progress?: number;
  showProgress?: boolean;
}

export const GradientHeader = ({
  title,
  subtitle,
  progress,
  showProgress = false,
}: GradientHeaderProps) => (
  <div className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 px-8 py-16">
    <div className="mx-auto max-w-4xl">
      <h1 className="text-4xl font-bold text-white md:text-5xl">{title}</h1>
      {subtitle && <p className="mt-4 text-lg text-white/90">{subtitle}</p>}
      {showProgress && progress !== undefined && (
        <div className="mt-6">
          <ProgressBar progress={progress} />
        </div>
      )}
    </div>
  </div>
);
