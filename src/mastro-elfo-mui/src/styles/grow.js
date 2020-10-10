import { styled } from "@material-ui/core/styles";

/**
 * Applies `flexGrow: 1` to `Component`
 * @param  {elementType} Component Input component
 * @return {elementType}           Grown component
 */
export default Component => styled(Component)({ flexGrow: 1 });
