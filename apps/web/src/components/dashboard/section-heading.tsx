import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeading({
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="font-heading text-base font-semibold tracking-tight text-white">
          {title}
        </h2>
        {description ? (
          <p className="mt-0.5 text-xs text-text-tertiary">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
