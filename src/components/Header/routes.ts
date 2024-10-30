export interface IRoute {
  id: number;
  name: string;
  route: string;
  icon: string;
  protected?: boolean;
}

export const routes: IRoute[] = [
  { id: 1, name: "Home", route: "/", icon: "home", protected: false },
  {
    id: 2,
    name: "Blissbells",
    route: "/blissbells",
    icon: "bell",
    protected: true,
  },
];
