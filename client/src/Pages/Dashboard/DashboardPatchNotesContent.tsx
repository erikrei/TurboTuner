import { TPatchNotesChanges } from "../../types";

import DashboardPatchNotesChanges from "./DashboardPatchNotesChanges";

type DashboardPatchNotesContentProps = {
  changes: TPatchNotesChanges[];
};

export default function DashboardPatchNotesContent({
  changes,
}: DashboardPatchNotesContentProps) {
  return (
    <div className="patch-notes-content">
      {changes.map((change) => (
        <DashboardPatchNotesChanges
          key={change.subject}
          singleChange={change}
        />
      ))}
    </div>
  );
}
