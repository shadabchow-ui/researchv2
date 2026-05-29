export type DeploymentStatus =
  | "ready"
  | "building"
  | "failed"
  | "canceled"
  | "queued";

export interface Deployment {
  author: string;
  branch: string;
  commit: string;
  commitMessage: string;
  createdAt: string;
  duration: string;
  environment: "Production" | "Preview" | "Staging";
  id: string;
  project: string;
  status: DeploymentStatus;
}

export interface Activity {
  id: string;
  message: string;
  project?: string;
  timestamp: string;
  type: "deployment" | "project" | "domain" | "member" | "config";
}

export interface StatItem {
  label: string;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  value: string;
}

export const sampleDeployments: Deployment[] = [
  {
    id: "dpl-1",
    project: "api-gateway",
    status: "ready",
    environment: "Production",
    branch: "main",
    commit: "a3f8c2d",
    commitMessage: "fix: handle rate limit edge case",
    author: "sha",
    duration: "1m 42s",
    createdAt: "2 minutes ago",
  },
  {
    id: "dpl-2",
    project: "web-app",
    status: "building",
    environment: "Preview",
    branch: "feat/dark-mode",
    commit: "b7e1f4a",
    commitMessage: "feat: add dark mode toggle",
    author: "alex",
    duration: "—",
    createdAt: "Just now",
  },
  {
    id: "dpl-3",
    project: "cloud-worker",
    status: "ready",
    environment: "Production",
    branch: "main",
    commit: "d4c9b0e",
    commitMessage: "perf: reduce cold start latency",
    author: "jordan",
    duration: "48s",
    createdAt: "12 minutes ago",
  },
  {
    id: "dpl-4",
    project: "identity-service",
    status: "failed",
    environment: "Preview",
    branch: "feat/sso-saml",
    commit: "f2a6e3c",
    commitMessage: "feat: add SAML SSO support",
    author: "sha",
    duration: "2m 13s",
    createdAt: "34 minutes ago",
  },
  {
    id: "dpl-5",
    project: "docs-site",
    status: "ready",
    environment: "Production",
    branch: "main",
    commit: "9e1d7f8",
    commitMessage: "docs: update API reference",
    author: "taylor",
    duration: "55s",
    createdAt: "1 hour ago",
  },
];

export const sampleActivity: Activity[] = [
  {
    id: "act-1",
    type: "deployment",
    message: "api-gateway deployed to Production",
    project: "api-gateway",
    timestamp: "2 minutes ago",
  },
  {
    id: "act-2",
    type: "deployment",
    message: "web-app preview deploy started",
    project: "web-app",
    timestamp: "Just now",
  },
  {
    id: "act-3",
    type: "domain",
    message: "Custom domain app.upcube.dev verified",
    timestamp: "15 minutes ago",
  },
  {
    id: "act-4",
    type: "member",
    message: "alex joined the workspace",
    timestamp: "28 minutes ago",
  },
  {
    id: "act-5",
    type: "config",
    message: "Rate limit updated for api-gateway",
    project: "api-gateway",
    timestamp: "1 hour ago",
  },
  {
    id: "act-6",
    type: "deployment",
    message: "identity-service preview deploy failed",
    project: "identity-service",
    timestamp: "34 minutes ago",
  },
];

export const sampleStats: StatItem[] = [
  {
    label: "Active Deployments",
    value: "12",
    trend: "up",
    trendLabel: "+3 today",
  },
  {
    label: "Projects",
    value: "8",
    trend: "neutral",
    trendLabel: "Across 3 environments",
  },
  {
    label: "Team Members",
    value: "6",
    trend: "up",
    trendLabel: "+1 this week",
  },
  {
    label: "Avg Build Time",
    value: "1m 12s",
    trend: "down",
    trendLabel: "-8s from last week",
  },
];
