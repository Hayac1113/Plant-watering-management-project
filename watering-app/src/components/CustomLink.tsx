import Link from "next/link";

type CustomLinkVariant = "primary" | "secondary";

interface CustomLinkProps {
  href: string;
  text: string;
  variant: CustomLinkVariant;
}

const CustomLink = (props: CustomLinkProps) => {
  const { href, text, variant } = props;

  const styleOption: Record<CustomLinkVariant, string> = {
    primary: "custom-link-primary",
    secondary: "custom-link-secondary",
  };

  const className = styleOption[variant];

  return (
    <Link href={href}>
      <span className={className}>{text}</span>
    </Link>
  );
};

export default CustomLink;
