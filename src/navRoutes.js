import Index from "views/Index.js";
import Maps from "views/examples/Maps.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

var navroutes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Chat",
    icon: "ni ni-bulb-61 text-orange",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
  },
];
export default navroutes;
