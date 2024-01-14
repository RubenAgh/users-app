export const getStyleFromProps = (props: any, key: string) => {
  return props.theme[props.theme.selectedTheme][key];
};