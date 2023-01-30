import type { ReactNode } from "react";

import useDelayUnmount from "../hooks/useDelayUnmount";

type Props = {
  show: boolean;
  children: ReactNode;
  duration?: number;
  className?: string;
};

const Scale: React.FC<Props> = ({
  show,
  children,
  duration = 500,
  className,
}): JSX.Element | null => {
  const shouldRenderChild = useDelayUnmount(show, duration);
  const mountedStyle = { animation: `scaleIn ${duration}ms ease-in-out` };
  const unmountedStyle = {
    animation: `scaleOut ${duration + 10}ms ease-in-out`,
  };

  return shouldRenderChild ? (
    <div className={className} style={show ? mountedStyle : unmountedStyle}>
      {children}
    </div>
  ) : null;
};

export default Scale;
