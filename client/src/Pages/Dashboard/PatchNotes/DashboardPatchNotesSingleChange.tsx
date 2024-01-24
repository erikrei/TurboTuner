type DashboardPatchNotesSingleChangeProps = {
  change: string;
};

export default function DashboardPatchNotesSingleChange({
  change,
}: DashboardPatchNotesSingleChangeProps) {
  return <li>{change}</li>;
}
