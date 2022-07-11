/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "md5" {
  import VueSignaturePad from "md5";
  export default VueSignaturePad;
}
declare module "@meforma/vue-toaster" {
  import VueSignaturePad from "@meforma/vue-toasterp";
  export default VueSignaturePad;
}
