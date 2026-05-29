import { Badge } from "@repo/design-system/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/design-system/components/ui/table";
import type { Deployment } from "./sample-data";
import { StatusDot } from "./status-dot";

interface DeploymentsTableProps {
  deployments: Deployment[];
}

const environmentVariant: Record<string, "default" | "secondary" | "outline"> =
  {
    Production: "default",
    Preview: "secondary",
    Staging: "outline",
  };

export const DeploymentsTable = ({ deployments }: DeploymentsTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-4" />
        <TableHead>Project</TableHead>
        <TableHead className="hidden sm:table-cell">Environment</TableHead>
        <TableHead className="hidden md:table-cell">Branch</TableHead>
        <TableHead className="hidden lg:table-cell">Commit</TableHead>
        <TableHead className="hidden lg:table-cell">Duration</TableHead>
        <TableHead className="text-right">Created</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {deployments.map((dep) => (
        <TableRow
          className="group transition-colors duration-100 hover:bg-accent/30"
          key={dep.id}
        >
          <TableCell>
            <StatusDot status={dep.status} />
          </TableCell>
          <TableCell className="font-medium">{dep.project}</TableCell>
          <TableCell className="hidden sm:table-cell">
            <Badge
              className="font-normal text-[11px] leading-none"
              variant={environmentVariant[dep.environment] ?? "outline"}
            >
              {dep.environment}
            </Badge>
          </TableCell>
          <TableCell className="hidden font-mono text-xs md:table-cell">
            {dep.branch}
          </TableCell>
          <TableCell className="hidden font-mono text-xs lg:table-cell">
            {dep.commit}
          </TableCell>
          <TableCell className="hidden text-muted-foreground lg:table-cell">
            {dep.duration}
          </TableCell>
          <TableCell className="text-right text-muted-foreground text-xs tabular-nums">
            {dep.createdAt}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
