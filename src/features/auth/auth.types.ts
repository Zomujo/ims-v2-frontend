export type AuthFormHeadingProps = {
  title: string;
  description: string;
  className?: string;
};

export type AuthHeaderProps = {
  btnLabel: string;
  btnHrf: string;
} & React.HTMLAttributes<HTMLDivElement>;
