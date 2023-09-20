import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ToolTip = ({
  children,
  triggerContent,
  side,
  sideOffset,
}: {
  children: React.ReactNode;
  triggerContent: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{triggerContent}</TooltipTrigger>
        <TooltipContent side={side || 'top'} sideOffset={sideOffset || 8}>
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
