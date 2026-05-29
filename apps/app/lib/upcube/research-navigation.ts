export interface ResearchNavItem {
  href: string;
  icon: string;
  id: string;
  label: string;
}

export interface ResearchNavGroup {
  items: ResearchNavItem[];
  label: string;
}

export const researchNavGroups: ResearchNavGroup[] = [
  {
    label: "API Playground",
    items: [
      {
        id: "research-search",
        label: "Search",
        href: "/research/search",
        icon: "Search",
      },
      {
        id: "research-contents",
        label: "Contents",
        href: "/research/contents",
        icon: "FileText",
      },
      {
        id: "research-answer",
        label: "Answer",
        href: "/research/answer",
        icon: "MessageSquare",
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        id: "research-home",
        label: "Research Home",
        href: "/research",
        icon: "Radar",
      },
      {
        id: "research-sources",
        label: "Sources",
        href: "/research/sources",
        icon: "BookOpen",
      },
      {
        id: "research-watchlists",
        label: "Watchlists",
        href: "/research/watchlists",
        icon: "Bell",
      },
      {
        id: "research-history",
        label: "History",
        href: "/research/history",
        icon: "History",
      },
    ],
  },
  {
    label: "Learn",
    items: [
      {
        id: "docs",
        label: "Docs",
        href: "/research/docs",
        icon: "BookText",
      },
      {
        id: "templates",
        label: "Templates",
        href: "/research/templates",
        icon: "Layout",
      },
    ],
  },
  {
    label: "Platform",
    items: [
      {
        id: "settings",
        label: "Settings",
        href: "/settings",
        icon: "Settings",
      },
    ],
  },
];

export const researchPrimaryNav: ResearchNavItem[] = researchNavGroups.flatMap(
  (group) => group.items
);
