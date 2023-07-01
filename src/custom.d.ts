/**
 * declare a module which is having path till *.svg
 * recongnising : any path we are importing which is having *.svg, so that TS is able to import appropriate module.
 * we are importing any module that ends with *.svg file according to the following rules.
 * ! if this is declared at the global level then error for conflict will come with react-app.d.ts
 * this tells that src is some value that will be initialised and exported as some value inorder for us
 * to declare and register that as registrable typescript modules.
 * we ar exporting ReactComponent which is a Functional component with SVG props having SVG element as the prop 
 * proptypes are based of SVG Elements 
 */
declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string; // first we need src attribute for this
  export default src;
}
