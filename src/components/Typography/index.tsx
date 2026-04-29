import { CustomText } from "./styled";

interface ITextProps {
  text?: string;
  bold?: boolean;
  title?: boolean;
  style?: "primary" | "secondary" | "danger" | "accent" | "success";
}

const Typography = (props: ITextProps) => {
  const { text, bold, title, style = "primary" } = props;

  return (
    <CustomText
      $title={title}
      $bold={bold}
      $style={!text ? "secondary" : style}
    >
      {text ? text : "Unknown"}
    </CustomText>
  );
};

export default Typography;
