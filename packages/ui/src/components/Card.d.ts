import { HTMLAttributes } from 'react';
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the card */
  variant?: 'default' | 'outlined' | 'elevated';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Make card interactive (adds hover effect) */
  interactive?: boolean;
}
declare const Card: import('react').ForwardRefExoticComponent<
  CardProps & import('react').RefAttributes<HTMLDivElement>
>;
export default Card;
export declare const CardHeader: import('react').ForwardRefExoticComponent<
  HTMLAttributes<HTMLDivElement> & import('react').RefAttributes<HTMLDivElement>
>;
export declare const CardTitle: import('react').ForwardRefExoticComponent<
  HTMLAttributes<HTMLHeadingElement> & import('react').RefAttributes<HTMLHeadingElement>
>;
export declare const CardDescription: import('react').ForwardRefExoticComponent<
  HTMLAttributes<HTMLParagraphElement> & import('react').RefAttributes<HTMLParagraphElement>
>;
export declare const CardContent: import('react').ForwardRefExoticComponent<
  HTMLAttributes<HTMLDivElement> & import('react').RefAttributes<HTMLDivElement>
>;
export declare const CardFooter: import('react').ForwardRefExoticComponent<
  HTMLAttributes<HTMLDivElement> & import('react').RefAttributes<HTMLDivElement>
>;
//# sourceMappingURL=Card.d.ts.map
