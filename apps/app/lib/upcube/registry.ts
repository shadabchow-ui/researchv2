export type UpcubeStatus = "Foundation" | "Planned" | "Scaffold";

export interface UpcubeModule {
  description: string;
  href: string;
  icon: string;
  id: string;
  label: string;
  status: UpcubeStatus;
}

export interface UpcubeProduct {
  description: string;
  href: string;
  icon: string;
  id: string;
  modules: UpcubeModule[];
  name: string;
  status: UpcubeStatus;
}

export const upcubeProducts: UpcubeProduct[] = [
  {
    id: "ai",
    name: "AI Console",
    description:
      "Configure, deploy, and monitor AI models and inference pipelines.",
    href: "/ai",
    icon: "Bot",
    status: "Foundation",
    modules: [
      {
        id: "ai-models",
        label: "Models",
        description: "Model registry and configuration",
        href: "/ai/models",
        icon: "Network",
        status: "Foundation",
      },
      {
        id: "ai-prompts",
        label: "Prompts",
        description: "Prompt templates and versioning",
        href: "/ai/prompts",
        icon: "FileText",
        status: "Foundation",
      },
      {
        id: "ai-runs",
        label: "Runs",
        description: "Inference run history and logs",
        href: "/ai/runs",
        icon: "Play",
        status: "Foundation",
      },
      {
        id: "ai-vectors",
        label: "Vector Stores",
        description: "Embedding index management",
        href: "/ai/vectors",
        icon: "Database",
        status: "Planned",
      },
    ],
  },
  {
    id: "cloud",
    name: "Cloud",
    description: "Deploy, manage, and observe serverless infrastructure.",
    href: "/cloud",
    icon: "Cloud",
    status: "Foundation",
    modules: [
      {
        id: "cloud-deployments",
        label: "Deployments",
        description: "Deployment pipelines and history",
        href: "/cloud/deployments",
        icon: "Rocket",
        status: "Foundation",
      },
      {
        id: "cloud-domains",
        label: "Domains",
        description: "Custom domain and DNS management",
        href: "/cloud/domains",
        icon: "Globe",
        status: "Foundation",
      },
      {
        id: "cloud-logs",
        label: "Logs",
        description: "Real-time and historical log streams",
        href: "/cloud/logs",
        icon: "ScrollText",
        status: "Foundation",
      },
      {
        id: "cloud-storage",
        label: "Storage",
        description: "Object and file storage",
        href: "/cloud/storage",
        icon: "HardDrive",
        status: "Planned",
      },
      {
        id: "cloud-runtime",
        label: "Runtime Config",
        description: "Environment variables and secrets",
        href: "/cloud/runtime",
        icon: "Settings",
        status: "Foundation",
      },
    ],
  },
  {
    id: "identity",
    name: "Identity",
    description:
      "User authentication, authorization, and organization management.",
    href: "/identity",
    icon: "UserCheck",
    status: "Foundation",
    modules: [
      {
        id: "identity-users",
        label: "Users",
        description: "User directory and profiles",
        href: "/identity/users",
        icon: "Users",
        status: "Foundation",
      },
      {
        id: "identity-organizations",
        label: "Organizations",
        description: "Workspace and team management",
        href: "/identity/organizations",
        icon: "Building",
        status: "Foundation",
      },
      {
        id: "identity-roles",
        label: "Roles & Permissions",
        description: "RBAC and policy management",
        href: "/identity/roles",
        icon: "Shield",
        status: "Foundation",
      },
      {
        id: "identity-sso",
        label: "SSO",
        description: "Single sign-on configuration",
        href: "/identity/sso",
        icon: "Key",
        status: "Planned",
      },
    ],
  },
  {
    id: "workflow",
    name: "Workflow",
    description: "Design, deploy, and monitor automated workflows.",
    href: "/workflow",
    icon: "Workflow",
    status: "Foundation",
    modules: [
      {
        id: "workflow-runs",
        label: "Runs",
        description: "Workflow execution history",
        href: "/workflow/runs",
        icon: "Play",
        status: "Foundation",
      },
      {
        id: "workflow-triggers",
        label: "Triggers",
        description: "Event and schedule triggers",
        href: "/workflow/triggers",
        icon: "Zap",
        status: "Foundation",
      },
      {
        id: "workflow-logs",
        label: "Logs",
        description: "Execution logs and debugging",
        href: "/workflow/logs",
        icon: "ScrollText",
        status: "Foundation",
      },
    ],
  },
  {
    id: "data",
    name: "Data",
    description: "Databases, queries, data pipelines, and analytics.",
    href: "/data",
    icon: "Database",
    status: "Foundation",
    modules: [
      {
        id: "data-databases",
        label: "Databases",
        description: "Database provisioning and management",
        href: "/data/databases",
        icon: "Database",
        status: "Foundation",
      },
      {
        id: "data-queries",
        label: "Queries",
        description: "Query editor and history",
        href: "/data/queries",
        icon: "Terminal",
        status: "Foundation",
      },
      {
        id: "data-pipelines",
        label: "Pipelines",
        description: "ETL and data pipeline orchestration",
        href: "/data/pipelines",
        icon: "GitBranch",
        status: "Planned",
      },
      {
        id: "data-analytics",
        label: "Analytics",
        description: "Dashboards and reporting",
        href: "/data/analytics",
        icon: "BarChart",
        status: "Planned",
      },
    ],
  },
  {
    id: "research",
    name: "Research",
    description: "Search the web with AI-powered depth and context.",
    href: "/research",
    icon: "Radar",
    status: "Foundation",
    modules: [
      {
        id: "research-deep",
        label: "Deep Research",
        description: "Comprehensive multi-source analysis",
        href: "/research/deep",
        icon: "Search",
        status: "Scaffold",
      },
      {
        id: "research-fast",
        label: "Fast Search",
        description: "Quick web and news results",
        href: "/research/fast",
        icon: "Zap",
        status: "Scaffold",
      },
      {
        id: "research-company",
        label: "Company Research",
        description: "Business, financial, and competitive data",
        href: "/research/company",
        icon: "Building",
        status: "Scaffold",
      },
      {
        id: "research-market",
        label: "Market Research",
        description: "Market sizing, trends, and forecasts",
        href: "/research/market",
        icon: "BarChart",
        status: "Scaffold",
      },
      {
        id: "research-sources",
        label: "Sources",
        description: "Saved sources and citations",
        href: "/research/sources",
        icon: "BookOpen",
        status: "Scaffold",
      },
      {
        id: "research-watchlists",
        label: "Watchlists",
        description: "Monitor topics and track changes",
        href: "/research/watchlists",
        icon: "Bell",
        status: "Scaffold",
      },
    ],
  },
  {
    id: "academy",
    name: "Academy",
    description: "Learning management, courses, and knowledge base.",
    href: "/academy",
    icon: "GraduationCap",
    status: "Foundation",
    modules: [
      {
        id: "academy-courses",
        label: "Courses",
        description: "Course catalog and management",
        href: "/academy/courses",
        icon: "BookOpen",
        status: "Foundation",
      },
      {
        id: "academy-content",
        label: "Content",
        description: "Lessons and learning materials",
        href: "/academy/content",
        icon: "FileText",
        status: "Foundation",
      },
      {
        id: "academy-enrollment",
        label: "Enrollment",
        description: "Student enrollment and progress",
        href: "/academy/enrollment",
        icon: "Users",
        status: "Planned",
      },
    ],
  },
  {
    id: "commerce",
    name: "Commerce",
    description: "Product catalog, orders, subscriptions, and billing.",
    href: "/commerce",
    icon: "ShoppingCart",
    status: "Foundation",
    modules: [
      {
        id: "commerce-products",
        label: "Products",
        description: "Product catalog and inventory",
        href: "/commerce/products",
        icon: "Package",
        status: "Foundation",
      },
      {
        id: "commerce-orders",
        label: "Orders",
        description: "Order management and fulfillment",
        href: "/commerce/orders",
        icon: "ClipboardList",
        status: "Foundation",
      },
      {
        id: "commerce-subscriptions",
        label: "Subscriptions",
        description: "Recurring billing and plans",
        href: "/commerce/subscriptions",
        icon: "Repeat",
        status: "Planned",
      },
      {
        id: "commerce-payouts",
        label: "Payouts",
        description: "Seller payouts and reconciliation",
        href: "/commerce/payouts",
        icon: "CreditCard",
        status: "Planned",
      },
    ],
  },
  {
    id: "marketplace",
    name: "Marketplace",
    description: "Connector marketplace, integrations, and partner ecosystem.",
    href: "/marketplace",
    icon: "Store",
    status: "Foundation",
    modules: [
      {
        id: "marketplace-listing",
        label: "Listings",
        description: "Connector and integration listings",
        href: "/marketplace/listings",
        icon: "FileBadge",
        status: "Foundation",
      },
      {
        id: "marketplace-publishers",
        label: "Publishers",
        description: "Publisher and partner management",
        href: "/marketplace/publishers",
        icon: "Building",
        status: "Planned",
      },
      {
        id: "marketplace-installations",
        label: "Installations",
        description: "Installed connectors and versions",
        href: "/marketplace/installations",
        icon: "Plug",
        status: "Foundation",
      },
    ],
  },
  {
    id: "jobs",
    name: "Jobs",
    description:
      "Job listings, applications, candidate matching, and hiring workflows.",
    href: "/jobs",
    icon: "Briefcase",
    status: "Foundation",
    modules: [
      {
        id: "jobs-listings",
        label: "Listings",
        description: "Job posting and management",
        href: "/jobs/listings",
        icon: "FileBadge",
        status: "Foundation",
      },
      {
        id: "jobs-applications",
        label: "Applications",
        description: "Candidate applications and tracking",
        href: "/jobs/applications",
        icon: "ClipboardList",
        status: "Foundation",
      },
      {
        id: "jobs-matching",
        label: "Matching",
        description: "AI-powered candidate matching",
        href: "/jobs/matching",
        icon: "Sparkles",
        status: "Planned",
      },
    ],
  },
];

export const platformPages = [
  {
    id: "overview",
    label: "Overview",
    description: "Console home and cross-product status",
    href: "/",
    icon: "LayoutDashboard",
    status: "Foundation" as UpcubeStatus,
  },
  {
    id: "projects",
    label: "Projects",
    description: "Workspace projects and collections",
    href: "/projects",
    icon: "FolderKanban",
    status: "Foundation" as UpcubeStatus,
  },
  {
    id: "artifacts",
    label: "Artifacts",
    description: "Files, assets, and build outputs",
    href: "/artifacts",
    icon: "Archive",
    status: "Foundation" as UpcubeStatus,
  },
  {
    id: "search",
    label: "Search",
    description: "Cross-product global search",
    href: "/search",
    icon: "Search",
    status: "Foundation" as UpcubeStatus,
  },
  {
    id: "settings",
    label: "Settings",
    description: "Account, workspace, and billing settings",
    href: "/settings",
    icon: "Settings",
    status: "Foundation" as UpcubeStatus,
  },
];

export function getProduct(id: string): UpcubeProduct | undefined {
  return upcubeProducts.find((p) => p.id === id);
}
