import DashboardPatchNotesToggle from "./DashboardPatchNotesToggle";

type DashboardPatchNotesHeaderProps = {
  version: string;
  showPatchNotes: boolean;
  setShowPatchNotes: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DashboardPatchNotesHeader({
  version,
  showPatchNotes,
  setShowPatchNotes,
}: DashboardPatchNotesHeaderProps) {
  return (
    <div className="patch-notes-header">
      <h1>
        Patch Notizen <span>{version}</span>
      </h1>
      <DashboardPatchNotesToggle
        showPatchNotes={showPatchNotes}
        setShowPatchNotes={setShowPatchNotes}
      />
    </div>
  );
}
