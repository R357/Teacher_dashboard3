declare module 'react-vertical-timeline-component' {
  import { Component, ReactNode } from 'react';

  export interface VerticalTimelineProps {
    children?: ReactNode;
    className?: string;
    animate?: boolean;
    layout?: '1-column' | '2-columns';
    lineColor?: string;
  }

  export interface VerticalTimelineElementProps {
    children?: ReactNode;
    className?: string;
    contentStyle?: React.CSSProperties;
    contentArrowStyle?: React.CSSProperties;
    date?: string | ReactNode;
    dateClassName?: string;
    icon?: ReactNode;
    iconClassName?: string;
    iconStyle?: React.CSSProperties;
    position?: 'left' | 'right';
    textClassName?: string;
    visible?: boolean;
    animate?: boolean;
  }

  export class VerticalTimeline extends Component<VerticalTimelineProps> {}
  export class VerticalTimelineElement extends Component<VerticalTimelineElementProps> {}
}

