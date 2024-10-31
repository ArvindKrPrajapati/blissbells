export interface IRoute {
  id: number;
  name: string;
  route: string;
  icon: string;
  protected?: boolean;
  children?: IRoute[];
}

export const routes: IRoute[] = [
  { id: 1, name: "Home", route: "/", icon: "home", protected: false },
  {
    id: 2,
    name: "Blissbells",
    route: "/blissbells",
    icon: "bell",
    protected: true,
    children: [
      {
        id: 1,
        name: "Upcoming Blisbells",
        route: "/blissbells",
        icon: "fa-solid fa-bell",
      },
      {
        id: 2,
        name: "Past Blissbells",
        route: "/blissbells/past",
        icon: "fa-solid fa-history",
      },
      {
        id: 3,
        name: "Blissbell Cards",
        route: "/blissbells/cards",
        icon: "fa-solid fa-gift",
      },
    ],
  },
];
