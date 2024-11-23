import { lazy } from "react";

export const Index: Record<string, unknown> = {
  "react-table-demo": {
      name: "react-table-demo",
      description: "",
      type: "registry:example",
      registryDependencies: ["accordion"],
      files: [{
        path: "registry/new-york/example/react-table-demo.tsx",
        type: "registry:example",
        target: ""
      }],
      component: lazy(() =>  import("~/components/examples/react-table.tsx")),
      source: "",
      category: "",
      subcategory: "",
      chunks: []
    },
}
