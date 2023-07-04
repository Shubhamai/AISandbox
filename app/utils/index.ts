import { type ClassValue, clsx } from "clsx";
import { toPng } from "html-to-image";
import { Edge, Node, getRectOfNodes, getTransformForBounds } from "reactflow";
import { twMerge } from "tailwind-merge";
import { debounce, isEqual, sortBy } from "lodash";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};


const nodeMapFn = (nodes: Node[]) => {
  return sortBy(
    nodes.map((node) => {
      const {
        position,
        positionAbsolute,
        selected,
        height,
        width,
        dragging,
        ...otherProps
      } = node;
      return otherProps;
    }),
    ["id"]
  );
};

const edgeMapFn = (nodes: Edge[]) => {
  return sortBy(
    nodes.map((node) => {
      const { ...otherProps } = node;
      return otherProps;
    }),
    ["id"]
  );
};

export const compareNodes = (nodes1: Node[], nodes2: Node[]) => {
  const filterdNodes1 = nodeMapFn(nodes1);
  const filterdNodes2 = nodeMapFn(nodes2);

  return isEqual(filterdNodes1, filterdNodes2);
};

export const compareEdges = (edges1: Edge[], edges2: Edge[]) => {
  const filterdEdges1 = edgeMapFn(edges1);
  const filterdEdges2 = edgeMapFn(edges2);

  return isEqual(filterdEdges1, filterdEdges2);
};
