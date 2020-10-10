import { styled } from "@material-ui/core/styles";

/**
 * Use `error` palette to create a "danger" component
 * @param  {elementType} Component Input component
 * @return {elementType}           Danger component
 */
export default Component =>
  styled(Component)(
    ({
      theme: {
        palette: {
          error: { contrastText, main, dark }
        }
      }
    }) => ({
      color: contrastText,
      backgroundColor: main,
      "&:hover": {
        backgroundColor: dark
      }
    })
  );
