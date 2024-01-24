import { TPatchNotesChanges } from "../../../types";

import DashboardPatchNotesSingleChange from "./DashboardPatchNotesSingleChange";

type DashboardPatchNotesChangesProps = {
  singleChange: TPatchNotesChanges;
};

export default function DashboardPatchNotesChanges({
  singleChange,
}: DashboardPatchNotesChangesProps) {
  return (
    <div className="patch-notes-subject-container">
      <p>{singleChange.subject}</p>
      <ul>
        {singleChange.subject_changes.map((change) => (
          <DashboardPatchNotesSingleChange key={change} change={change} />
        ))}
      </ul>
    </div>
  );
}
