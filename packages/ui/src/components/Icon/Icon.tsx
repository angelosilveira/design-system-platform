import { type SVGAttributes } from "react";
import { cn } from "../../lib/cn";

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  /** Tamanho em pixels (largura e altura). Padrão 20. */
  size?: number;
}

function createIcon(displayName: string, path: JSX.Element) {
  function Icon({ size = 20, className, ...props }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        className={cn("shrink-0", className)}
        aria-hidden={props["aria-label"] ? undefined : "true"}
        {...props}
      >
        {path}
      </svg>
    );
  }
  Icon.displayName = displayName;
  return Icon;
}

/** Ícone de confirmação / check mark. */
export const CheckIcon = createIcon(
  "CheckIcon",
  <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
);

/** Ícone de fechar / X. */
export const XIcon = createIcon(
  "XIcon",
  <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
);

/** Ícone de chevron apontando para baixo. */
export const ChevronDownIcon = createIcon(
  "ChevronDownIcon",
  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
);

/** Ícone de chevron apontando para cima. */
export const ChevronUpIcon = createIcon(
  "ChevronUpIcon",
  <path d="M5 12.5L10 7.5L15 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
);

/** Ícone de chevron apontando para a esquerda. */
export const ChevronLeftIcon = createIcon(
  "ChevronLeftIcon",
  <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
);

/** Ícone de chevron apontando para a direita. */
export const ChevronRightIcon = createIcon(
  "ChevronRightIcon",
  <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
);

/** Ícone de alerta / círculo com exclamação. */
export const AlertCircleIcon = createIcon(
  "AlertCircleIcon",
  <>
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 7v4M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>,
);

/** Ícone de informação. */
export const InfoIcon = createIcon(
  "InfoIcon",
  <>
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 9v5M10 6.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>,
);

/** Ícone de sucesso / círculo com check. */
export const CheckCircleIcon = createIcon(
  "CheckCircleIcon",
  <>
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.5 10L9 12.5L13.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </>,
);

/** Ícone de busca. */
export const SearchIcon = createIcon(
  "SearchIcon",
  <>
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>,
);

/** Ícone de link externo. */
export const ExternalLinkIcon = createIcon(
  "ExternalLinkIcon",
  <>
    <path d="M11 4H16V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 4L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 5H5C4.44772 5 4 5.44772 4 6V15C4 15.5523 4.44772 16 5 16H14C14.5523 16 15 15.5523 15 15V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>,
);

/** Ícone de mais / adicionar. */
export const PlusIcon = createIcon(
  "PlusIcon",
  <>
    <path d="M10 4V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>,
);

/** Ícone de menu hamburguer. */
export const MenuIcon = createIcon(
  "MenuIcon",
  <>
    <path d="M3 5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>,
);

/** Ícone de usuário. */
export const UserIcon = createIcon(
  "UserIcon",
  <>
    <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 18C3 14.6863 6.13401 12 10 12C13.866 12 17 14.6863 17 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>,
);

/** Ícone de engrenagem / configurações. */
export const SettingsIcon = createIcon(
  "SettingsIcon",
  <>
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 3.5V5M10 15V16.5M3.5 10H5M15 10H16.5M5.575 5.575L6.636 6.636M13.364 13.364L14.425 14.425M5.575 14.425L6.636 13.364M13.364 6.636L14.425 5.575" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>,
);

/** Ícone de casa / home. */
export const HomeIcon = createIcon(
  "HomeIcon",
  <>
    <path d="M3 9.5L10 3L17 9.5V17H13V13H7V17H3V9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </>,
);

/** Ícone de aviso / triângulo com exclamação. */
export const WarningIcon = createIcon(
  "WarningIcon",
  <>
    <path d="M10 3L18 17H2L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 9v3M10 14.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>,
);
